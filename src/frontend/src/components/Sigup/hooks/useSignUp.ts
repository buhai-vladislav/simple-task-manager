import { useNavigate } from 'react-router-dom';
import { ReactNode, useCallback, useEffect } from 'react';
import { FormikValues, useFormik } from 'formik';
import { AxiosError } from 'axios';

import { useSignup as useSignUpMutation } from '../../../api/hooks';
import { useToast, ToastType } from '../../../hooks/useToast';
import { validationSchema } from '../Signup.helper';

import type { ISignupFormProps } from '../Signup.props';

const useSignUp = (): [boolean, ReactNode, FormikValues] => {
  const { data, mutateAsync: signUp, isLoading } = useSignUpMutation();
  const [contextHolder, openNotification] = useToast('bottom');
  const navigate = useNavigate();

  const onSubmit = useCallback(async (values: ISignupFormProps) => {
    try {
      const { email, fullname, password } = values;
      await signUp({ email, fullname, password });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message);
        openNotification(
          { message: error?.response?.data?.message },
          ToastType.ERROR,
        )();
      }
    } finally {
      formik.setSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (data?.data) {
      openNotification({ message: data.data }, ToastType.SUCCESS, () => {
        navigate('/login');
      })();
    }
  }, [data]);

  const formik = useFormik<ISignupFormProps>({
    initialValues: {
      email: '',
      fullname: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit,
    validationSchema,
    validateOnChange: false,
  });

  return [isLoading, contextHolder, formik];
};

export { useSignUp };
