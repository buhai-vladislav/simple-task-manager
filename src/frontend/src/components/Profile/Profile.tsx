import { useFormik } from 'formik';
import { validationSchema } from './Profile.helper';
import type { IProfileValues } from './Profile.props';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useLogout, useUpdateUser } from '../../api/hooks';
import { setUser } from '../../store/reducers/user';
import { getErrorMessage } from '../../utils/error';
import { ToastType, useToast } from '../../hooks/useToast';
import { FormWrapper } from '../shared/FormWrapper';
import { ProfileWrapper } from './Profile.presets';
import { InputWrapper } from '../shared/InputWrapper';
import { Button, Input } from 'antd';

export const Profile = () => {
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

  return (
    <FormWrapper>
      <ProfileWrapper>
        <h2>User profile</h2>
        <form onSubmit={formik.handleSubmit}>
          <InputWrapper error={formik.errors.email}>
            <Input
              name="email"
              placeholder="Type your email"
              onChange={formik.handleChange}
              value={formik.values.email}
              status={formik.errors.email ? 'error' : undefined}
              disabled={disabled || isLoading || isLogouting}
            />
          </InputWrapper>
          <InputWrapper error={formik.errors.fullname}>
            <Input
              name="fullname"
              placeholder="Type your fullname"
              onChange={formik.handleChange}
              value={formik.values.fullname}
              status={formik.errors.fullname ? 'error' : undefined}
              disabled={disabled || isLoading || isLogouting}
            />
          </InputWrapper>
          <Button
            loading={isLoading || isLogouting}
            htmlType="button"
            type="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={disableToggle}
          >
            {disabled ? 'Change' : 'Save'}
          </Button>
        </form>
      </ProfileWrapper>
      {contextHolder}
    </FormWrapper>
  );
};
