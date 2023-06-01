import { object, string } from 'yup';
import { ITaskFormProps } from './TaskModal.props';

export const validationSchema = object<ITaskFormProps>({
  title: string().required('Title is required!'),
  description: string().optional(),
});
