import { object, string } from 'yup';

const validationSchema = object({
  email: string()
    .email('It`s not an email format!')
    .required('Email is required!'),
  password: string()
    .required('Password is required!'),
});

export { validationSchema }