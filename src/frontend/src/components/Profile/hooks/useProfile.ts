import { FormikValues, useFormik } from 'formik';
import { useState, useCallback, useEffect, ReactNode } from 'react';

import { useUpdateUser, useLogout } from '../../../api/hooks';
import { useToast, ToastType } from '../../../hooks/useToast';
import { useAppSelector, useAppDispatch } from '../../../store';
import { setUser } from '../../../store/reducers/user';
import { getErrorMessage } from '../../../utils/error';
import { validationSchema } from '../Profile.helper';

import type { IProfileValues } from '../Profile.props';

const useProfile = (): [
  ReactNode,
  boolean,
  boolean,
  boolean,
  () => void,
  FormikValues,
] => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [contextHolder, openNotification] = useToast('bottom');
  const [disabled, setDisabled] = useState(true);
  const { data, isLoading, mutateAsync: updateUser } = useUpdateUser();
  const { isLoading: isLogouting, mutateAsync: logout } = useLogout();

  const onSubmit = useCallback(async ({ email, fullname }: IProfileValues) => {
    try {
      await updateUser({ email, fullname });

      if (email !== user?.email) {
        await logout();
      }
    } catch (error) {
      const message = getErrorMessage(error);
      openNotification({ message }, ToastType.ERROR)();
    }
  }, []);
  const disableToggle = useCallback(() => {
    setDisabled(!disabled);

    if (!disabled) {
      formik.submitForm();
    }
  }, [disabled]);

  const formik = useFormik<IProfileValues>({
    initialValues: {
      email: '',
      fullname: '',
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
      openNotification(
        { message: 'User profile updated.' },
        ToastType.SUCCESS,
      )();
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      formik.setFieldValue('email', user.email, false);
      formik.setFieldValue('fullname', user.fullname, false);
    }
  }, [user]);

  return [
    contextHolder,
    isLoading,
    isLogouting,
    disabled,
    disableToggle,
    formik,
  ];
};

export { useProfile };
