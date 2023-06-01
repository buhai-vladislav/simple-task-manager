import { ClbType } from '../../../../hooks/useToast';
import { ICheckListItem } from '../../../../types/Task';

interface ITaskModalProps extends Partial<ITaskFormProps> {
  id?: string;
  createdAt?: Date;
  checklistItems?: Array<ICheckListItem>;
  type: ModalType;
  onOk: () => void;
  onCancel: () => void;
  open: boolean;
  openNotification: ClbType;
}

interface ITaskFormProps {
  title: string;
  description: string;
}

enum ModalType {
  VIEW,
  EDIT,
  CREATE,
}

export type { ITaskModalProps, ITaskFormProps };
export { ModalType };
