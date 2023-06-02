import { FormikProps } from 'formik';

interface ITaskFormValues {
  title: string;
  description: string;
}

interface ITaskFormProps {
  formik: FormikProps<ITaskFormValues>;
}

export type { ITaskFormProps, ITaskFormValues };
