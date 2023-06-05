import { object, string } from 'yup';

export const validationSchema = object({
  email: string()
    .required('Email is required!')
    .email('Is not an email format!'),
  fullname: string().required('Fullname is required!'),
});
