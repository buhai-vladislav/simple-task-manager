import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from 'react';
import { ModalType } from './TaskModal.props';
import { TaskModalWrapper } from './TaskModal.presets';
import { getFormattedTime } from '../TaskCard/TaskCard.helper';
import { Checkbox, Input, InputRef, Modal } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useFormik } from 'formik';
import { editFilterClb, validationSchema } from './TaskModal.helper';
import {
  useCreateTask,
  useUpdateChecklistItem,
  useUpdateTask,
} from '../../../../api/hooks';
import { ToastType } from '../../../../hooks/useToast';
import { useAppSelector } from '../../../../store';
import type { FC } from 'react';
import type { ITaskModalProps } from './TaskModal.props';
import { ICheckListItem, OperationType } from '../../../../types/Task';
import { v4 as uuidv4 } from 'uuid';
import { ITaskFormValues, TaskForm } from './components/TaskForm';
import { ChecklistItem } from './components/ChecklistItem';
import { AxiosError } from 'axios';

export const TaskModal: FC<ITaskModalProps> = ({
  id,
  title,
  description,
  createdAt,
  checklistItems,
  modalType,
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
  const { isLoading: isChecking, mutateAsync: completeItem } =
    useUpdateChecklistItem(id!);

  const changeCompleted = useCallback(
    (id?: string, type?: OperationType) =>
      async ({ target }: CheckboxChangeEvent) => {
        try {
          if (modalType === ModalType.VIEW) {
            await completeItem({ id: id!, completed: target.checked });
          }

          const changed: Partial<ICheckListItem>[] = items.map((item) =>
            item.id === id
              ? { ...item, completed: target.checked, type: type ?? item.type }
              : item,
          );
          setItems(changed);
        } catch (error) {
          openNotification(
            { message: JSON.stringify(error) },
            ToastType.ERROR,
          )();
          console.error(error);
        }
      },
    [items],
  );

  const removeItem = useCallback(
    (id?: string) => () => {
      const filtered = items
        .filter((item) => editFilterClb(item, modalType, id))
        .map((item) =>
          item.id === id &&
          modalType === ModalType.EDIT &&
          item.type === undefined
            ? { ...item, type: OperationType.REMOVE }
            : item,
        );
      setItems(filtered);
    },
    [items, modalType],
  );

  const onSubmit = useCallback(
    async (values: ITaskFormValues) => {
      let message = '';
      let toastType = ToastType.SUCCESS;
      try {
        if (modalType === ModalType.EDIT && id) {
          await updateTask({ id, checkListItems: items, ...values });
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
      } catch (error) {
        if (error instanceof AxiosError) {
          message = Array.isArray(error?.response?.data?.message)
            ? error?.response?.data?.message[0]
            : error?.response?.data?.message;
        }
        toastType = ToastType.ERROR;
      } finally {
        openNotification({ message }, toastType)();
      }
    },
    [id, user, items, modalType],
  );
  const formik = useFormik<ITaskFormValues>({
    initialValues: {
      description: '',
      title: '',
    },
    onSubmit,
    validationSchema,
  });

  const okTypeHandler = useCallback(() => {
    if (modalType === ModalType.EDIT || modalType === ModalType.CREATE) {
      formik.submitForm();
    } else {
      onOk();
    }
  }, [modalType]);

  const changeHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    [],
  );

  const onPressEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && value) {
        setItems((prev) => [
          ...prev,
          {
            id: uuidv4(),
            completed: false,
            title: value,
            type: OperationType.ADD,
          },
        ]);
        setValue('');
      }
    },
    [value],
  );

  useEffect(() => {
    if (!open) {
      setItems([]);
    } else {
      setItems(checklistItems ?? []);
      if (title || description) {
        formik.setFieldValue('title', title);
        formik.setFieldValue('description', description);
      }
    }
  }, [open]);

  const titleChange = useCallback(
    (id: string, title: string) => () => {
      const mapped = items.map((item) =>
        item.id === id
          ? {
              ...item,
              title,
              type:
                item?.type === OperationType.ADD
                  ? item.type
                  : OperationType.UPDATE,
            }
          : item,
      );
      setItems(mapped);
    },
    [items],
  );

  return (
    <Modal
      open={open}
      onOk={okTypeHandler}
      onCancel={onCancel}
      afterClose={() => formik.resetForm()}
      confirmLoading={isUpdating || isCreating || isChecking}
      centered
    >
      <TaskModalWrapper>
        {modalType === ModalType.VIEW && (
          <div className="view">
            <h2>{title}</h2>
            <p>{description}</p>
            {createdAt && <p>{getFormattedTime(createdAt)}</p>}
            <div className="items">
              {items.map(({ id, title, completed }, index) => (
                <Checkbox
                  key={id ?? index}
                  checked={completed}
                  onChange={changeCompleted(id, OperationType.UPDATE)}
                >
                  {title}
                </Checkbox>
              ))}
            </div>
          </div>
        )}
        {(modalType === ModalType.EDIT || modalType === ModalType.CREATE) && (
          <div className="edit">
            <h2>{modalType === ModalType.EDIT ? 'Edit task' : 'New task'}</h2>
            <TaskForm formik={formik} />
            <div className="create-block">
              <div className="items">
                {items
                  ?.filter(({ type }) => type !== OperationType.REMOVE)
                  .map(({ id, title, completed }, index) => (
                    <ChecklistItem
                      key={id ?? index}
                      changeCompleted={changeCompleted}
                      removeItem={removeItem}
                      id={id}
                      completed={completed}
                      title={title}
                      type={modalType}
                      titleChange={titleChange}
                    />
                  ))}
              </div>
              <div className="input-block">
                <Checkbox checked={false} disabled />
                <Input
                  placeholder="Type your name"
                  value={value}
                  onChange={changeHandler}
                  ref={inputRef}
                  onPressEnter={onPressEnter}
                />
              </div>
            </div>
          </div>
        )}
      </TaskModalWrapper>
    </Modal>
  );
};
