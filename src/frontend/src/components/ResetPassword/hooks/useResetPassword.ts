import { AxiosResponse } from 'axios';
import { FormikValues, useFormik } from 'formik';
import { ReactNode, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { useToast, ToastType } from '../../../hooks/useToast';
import { getErrorMessage } from '../../../utils/error';
import { validationSchema } from '../ResetPassword.helper';
import { IResetPasswordValues } from '../ResetPassword.props';
import { useResetPassword as useResetPasswordMutation } from '../../../api/hooks';

const useResetPassword = (): [
  AxiosResponse<string, any> | undefined,
  ReactNode,
  boolean,
  () => void,
  FormikValues,
] => {
  const [params] = useSearchParams();
  const [contextHolder, openNotification] = useToast('bottom');
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    mutateAsync: resetPassword,
  } = useResetPasswordMutation();

  const onSubmit = useCallback(
    async ({ password }: IResetPasswordValues) => {
      try {
        const token = params.get('token');
        if (!token) throw new Error('Token is not provided!');

        await resetPassword({ password, token });
      } catch (error) {
        const message = getErrorMessage(error);
        openNotification({ message }, ToastType.ERROR)();
      }
    },
    [params],
  );
  const navigateHandler = useCallback(() => {
    navigate('/login');
  }, []);

  const formik = useFormik<IResetPasswordValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (data?.data) {
      openNotification(
        { message: data.data },
        ToastType.SUCCESS,
        navigateHandler,
      )();
    }
  }, [data]);

  return [data, contextHolder, isLoading, navigateHandler, formik];
};

export { useResetPassword };
