import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikValues, useFormik } from 'formik';
import { AxiosResponse } from 'axios';

import { useForgotPassword as useForgotPasswordMutation } from '../../../api/hooks';
import { ToastType, useToast } from '../../../hooks/useToast';
import { validationSchema } from '../ForgotPassword.helper';
import { getErrorMessage } from '../../../utils/error';

import type { IForgotPasswordValuesProps } from '../ForgotPassword.props';

const useForgotPassword = (): [
  AxiosResponse<string, any> | undefined,
  boolean,
  React.ReactNode,
  () => void,
  FormikValues,
] => {
  const {
    data,
    isLoading,
    mutateAsync: forgotPassword,
  } = useForgotPasswordMutation();
  const [contextHolder, openNotification] = useToast('bottom');
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async ({ email }: IForgotPasswordValuesProps) => {
      try {
        await forgotPassword(email);
      } catch (error) {
        const message = getErrorMessage(error);
        openNotification({ message }, ToastType.ERROR)();
      }
    },
    [],
  );
  const navigateHandler = useCallback(() => {
    navigate('/login');
  }, []);

  const formik = useFormik<IForgotPasswordValuesProps>({
    initialValues: {
      email: '',
    },
    onSubmit,
    validationSchema,
  });

  return [data, isLoading, contextHolder, navigateHandler, formik];
};

export { useForgotPassword };
