import { object, string } from 'yup';
import { ModalType } from './TaskModal.props';
import { OperationType } from '../../../../types/Task';
import type { ICheckListItem } from '../../../../types/Task';
import type { ITaskFormValues } from './components/TaskForm';

export const validationSchema = object<ITaskFormValues>({
  title: string().required('Title is required!'),
  description: string().optional(),
});

export const editFilterClb = (
  item: Partial<ICheckListItem>,
  type: ModalType,
  id?: string,
) => {
  if (
    type === ModalType.EDIT &&
    item.id === id &&
    item.type === OperationType.ADD
  ) {
    return false;
  }
  if (type === ModalType.CREATE && item.id === id) {
    return false;
  }
  return true;
};
