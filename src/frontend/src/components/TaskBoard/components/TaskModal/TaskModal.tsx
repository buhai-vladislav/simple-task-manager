import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ModalType } from './TaskModal.props';
import { TaskModalWrapper } from './TaskModal.presets';
import { getFormattedTime } from '../TaskCard/TaskCard.helper';
import { Button, Checkbox, Input, InputRef, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import TextArea from 'antd/es/input/TextArea';
import { useFormik } from 'formik';
import { validationSchema } from './TaskModal.helper';
import { InputWrapper } from '../../../shared/InputWrapper';
import { useCreateTask, useUpdateTask } from '../../../../api/hooks';
import { ToastType } from '../../../../hooks/useToast';
import { useAppSelector } from '../../../../store';
import type { FC } from 'react';
import type { ITaskFormProps, ITaskModalProps } from './TaskModal.props';
import type { ICheckListItem } from '../../../../types/Task';
import { PlusSquareOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

export const TaskModal: FC<ITaskModalProps> = ({
  id,
  title,
  description,
  createdAt,
  checklistItems,
  type,
  onOk,
  onCancel,
  open,
  openNotification,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [items, setItems] = useState<Partial<ICheckListItem>[]>([]);
  const [value, setValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const { isLoading: isUpdating, mutateAsync: updateTask } = useUpdateTask();
  const { isLoading: isCreating, mutateAsync: createTask } = useCreateTask();

  const changeCompleted = useCallback(
    (id?: string) =>
      ({ target }: CheckboxChangeEvent) => {
        const changed: Partial<ICheckListItem>[] = items.map((item) =>
          item.id === id ? { ...item, completed: target.checked } : item,
        );
        setItems(changed);
      },
    [items],
  );
  const onSubmit = useCallback(
    async (values: ITaskFormProps) => {
      try {
        let message = '';
        if (type === ModalType.EDIT && id) {
          await updateTask({ id, ...values });
          message = 'Task successfully updated.';
        } else if (user?.id) {
          const checkListItems = items.map(({ title, completed }) => ({
            title,
            completed,
          }));
          await createTask({ authorId: user.id, ...values, checkListItems });
          message = 'Task successfully created.';
        }
        onOk();
        formik.resetForm();
        openNotification({ message }, ToastType.SUCCESS)();
      } catch (error) {
        openNotification({ message: JSON.stringify(error) }, ToastType.ERROR)();
      }
    },
    [id, user, items],
  );
  const formik = useFormik<ITaskFormProps>({
    initialValues: {
      description: '',
      title: '',
    },
    onSubmit,
    validationSchema,
  });

  const okTypeHandler = useCallback(() => {
    if (type === ModalType.EDIT || type === ModalType.CREATE) {
      formik.submitForm();
    } else {
      onOk();
    }
  }, [type]);

  const changeHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    [],
  );

  useEffect(() => {
    setItems(checklistItems ?? []);
    if (title || description) {
      formik.setFieldValue('title', title);
      formik.setFieldValue('description', description);
    }
  }, [checklistItems, description, title]);

  useEffect(() => {
    const input = inputRef?.current?.input;
    const keyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setItems((prev) => [
          ...prev,
          { id: uuidv4(), completed: false, title: value },
        ]);
        setValue('');
      }
    };
    input?.addEventListener('keyup', keyPress);
    return () => {
      input?.removeEventListener('keyup', keyPress);
    };
  }, [value]);

  return (
    <Modal
      open={open}
      onOk={okTypeHandler}
      onCancel={onCancel}
      afterClose={() => formik.resetForm()}
      confirmLoading={isUpdating || isCreating}
      centered
    >
      <TaskModalWrapper>
        {type === ModalType.VIEW && (
          <div className="view">
            <h2>{title}</h2>
            <p>{description}</p>
            {createdAt && <p>{getFormattedTime(createdAt)}</p>}
            <div className="items">
              {items?.map(({ id, title, completed }) => (
                <Checkbox checked={completed} onChange={changeCompleted(id)}>
                  {title}
                </Checkbox>
              ))}
            </div>
          </div>
        )}
        {(type === ModalType.EDIT || type === ModalType.CREATE) && (
          <div className="edit">
            <h2>{type === ModalType.EDIT ? 'Edit task' : 'New task'}</h2>
            <form onSubmit={formik.handleSubmit}>
              <InputWrapper error={formik.errors.title}>
                <Input
                  name="title"
                  placeholder="Type task name"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  status={formik.errors.title ? 'error' : undefined}
                />
              </InputWrapper>
              <TextArea
                rows={4}
                placeholder="Type task description"
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
              />
            </form>
            <div className="create-block">
              <div className="items">
                {items?.map(({ id, title, completed }) => (
                  <div className="item">
                    <Checkbox
                      checked={completed}
                      disabled={type !== ModalType.CREATE}
                      onChange={changeCompleted(id)}
                    >
                      {title}
                    </Checkbox>
                    <Button icon={<PlusSquareOutlined />} danger size="small" />
                  </div>
                ))}
              </div>
              <div className="input-block">
                <Checkbox checked={true} disabled />
                <Input
                  placeholder="Type your name"
                  value={value}
                  onChange={changeHandler}
                  ref={inputRef}
                />
              </div>
            </div>
          </div>
        )}
      </TaskModalWrapper>
    </Modal>
  );
};
