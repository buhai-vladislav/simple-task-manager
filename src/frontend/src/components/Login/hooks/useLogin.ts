import { useCallback, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikValues, useFormik } from 'formik';

import { useLogin as useLoginMutation } from '../../../api/hooks';
import { useToast, ToastType } from '../../../hooks/useToast';
import { useAppDispatch } from '../../../store';
import { getErrorMessage } from '../../../utils/error';
import { setUser } from '../../../store/reducers/user';
import { setLocation, setMenuKey } from '../../../store/reducers/navigation';
import { validationSchema } from '../Login.helper';

import type { ILoginFormProps } from '../Login.props';

const useLogin = (): [boolean, ReactNode, () => void, FormikValues] => {
  const { data, mutateAsync: login, isLoading } = useLoginMutation();
  const [contextHolder, openNotification] = useToast('bottom');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (values: ILoginFormProps) => {
    try {
      const { email, password } = values;
      await login({ email, password });
    } catch (error) {
      const message = getErrorMessage(error);
      openNotification({ message }, ToastType.ERROR)();
    } finally {
      formik.setSubmitting(false);
    }
  }, []);

  const navigateHandler = useCallback(() => {
    navigate('/forgot-password');
  }, []);

  useEffect(() => {
    if (data?.data) {
      localStorage.setItem('access-token', data.data?.accessToken);
      localStorage.setItem('refresh-token', data.data?.refreshToken);
      dispatch(setUser(data.data?.user));
      dispatch(setMenuKey('loggedIn'));
      dispatch(setLocation('task-manager'));
      navigate('/task-manager');
    }
  }, [data]);

  const formik = useFormik<ILoginFormProps>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema,
    validateOnChange: false,
  });

  return [isLoading, contextHolder, navigateHandler, formik];
};

export { useLogin };
