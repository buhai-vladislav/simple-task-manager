import {
  CheckSquareOutlined,
  FormOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Input } from 'antd';
import { ChangeEvent, useCallback, useState } from 'react';
import type { FC } from 'react';
import { IChecklistItemProps } from './ChecklistItem.props';

export const ChecklistItem: FC<IChecklistItemProps> = ({
  id,
  type,
  changeCompleted,
  title,
  removeItem,
  completed,
  titleChange,
}) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(title);

  const editableHandler = useCallback(() => {
    if (editable) {
      titleChange(id!, value!)();
    }
    setEditable(!editable);
  }, [editable, value]);
  const onValueChangeHandler = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    [],
  );

  return (
    <div className="item">
      {!editable ? (
        <Checkbox checked={completed} onChange={changeCompleted(id)}>
          {title}
        </Checkbox>
      ) : (
        <>
          <Checkbox checked={completed} onChange={changeCompleted(id)} />
          <Input
            value={value}
            status={value?.length === 0 ? 'error' : undefined}
            onChange={onValueChangeHandler}
            size="small"
          />
        </>
      )}
      <div className="buttons">
        <Button
          size="small"
          icon={!editable ? <FormOutlined /> : <CheckSquareOutlined />}
          onClick={editableHandler}
          disabled={value?.trim().length === 0}
        />
        <Button
          icon={<PlusSquareOutlined />}
          danger
          size="small"
          onClick={removeItem(id!)}
        />
      </div>
    </div>
  );
};
