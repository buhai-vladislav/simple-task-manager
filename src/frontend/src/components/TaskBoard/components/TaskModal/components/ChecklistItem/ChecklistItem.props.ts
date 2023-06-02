import { OperationType } from '../../../../../../types/Task';
import { ModalType } from '../../TaskModal.props';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface IChecklistItemProps {
  id?: string;
  type: ModalType;
  changeCompleted: (
    id?: string,
    type?: OperationType,
  ) => (event: CheckboxChangeEvent) => void;
  title?: string;
  removeItem: (id: string) => () => void;
  completed?: boolean;
  titleChange: (id: string, title: string) => () => void;
}

export type { IChecklistItemProps };
