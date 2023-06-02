import { ClbType } from '../../../../hooks/useToast';
import { ICheckListItem } from '../../../../types/Task';
import { ITaskFormValues } from './components/TaskForm';

interface ITaskModalProps extends Partial<ITaskFormValues> {
  id?: string;
  createdAt?: Date;
  checklistItems?: Array<ICheckListItem>;
  modalType: ModalType;
  onOk: () => void;
  onCancel: () => void;
  open: boolean;
  openNotification: ClbType;
}

enum ModalType {
  VIEW,
  EDIT,
  CREATE,
}

export type { ITaskModalProps };
export { ModalType };
