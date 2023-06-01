import { object, string, ref } from 'yup';

const PASS_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/;

const validationSchema = object({
  email: string()
    .email('It`s not an email format!')
    .required('Email is required!'),
  fullname: string().required('Fullname is required!'),
  password: string()
    .required('Password is required!')
    .matches(PASS_REGEX, "At least 6 symbols,number lower and upper case."),
  confirmPassword: string()
    .required('Confirm password is required!')
    .matches(PASS_REGEX, "At least 6 symbols,number lower and upper case.")
    .oneOf([ref('password')], 'Password must match.'),
});

export { PASS_REGEX, validationSchema }