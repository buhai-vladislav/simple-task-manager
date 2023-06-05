import { object, ref, string } from 'yup';
import { PASS_REGEX } from '../Sigup/Signup.helper';

export const validationSchema = object({
  password: string()
    .required('Password is required!')
    .matches(PASS_REGEX, 'At least 6 symbols,number lower and upper case.'),
  confirmPassword: string()
    .required('Confirm password is required!')
    .matches(PASS_REGEX, 'At least 6 symbols,number lower and upper case.')
    .oneOf([ref('password')], 'Password must match.'),
});
