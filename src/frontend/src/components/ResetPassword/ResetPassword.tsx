import { ResetPasswordWrapper } from './ResetPassword.presets';
import { useFormik } from 'formik';
import { validationSchema } from './ResetPassword.helper';
import type { IResetPasswordValues } from './ResetPassword.props';
import { FormWrapper } from '../shared/FormWrapper';
import { InputWrapper } from '../shared/InputWrapper';
import { Button, Input } from 'antd';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastType, useToast } from '../../hooks/useToast';
import { getErrorMessage } from '../../utils/error';
import { useResetPassword } from '../../api/hooks';

export const ResetPassword = () => {
  const [params] = useSearchParams();
  const [contextHolder, openNotification] = useToast('bottom');
  const navigate = useNavigate();
  const { data, isLoading, mutateAsync: resetPassword } = useResetPassword();

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

  return (
    <FormWrapper>
      <ResetPasswordWrapper>
        <form onSubmit={formik.handleSubmit}>
          <h2>Reset password</h2>
          <InputWrapper error={formik.errors.password}>
            <Input.Password
              name="password"
              onChange={formik.handleChange}
              status={formik.errors.password ? 'error' : undefined}
            />
          </InputWrapper>
          <InputWrapper error={formik.errors.confirmPassword}>
            <Input.Password
              name="confirmPassword"
              onChange={formik.handleChange}
              status={formik.errors.confirmPassword ? 'error' : undefined}
            />
          </InputWrapper>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!formik.isValid || !formik.dirty || !!data?.data}
          >
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={navigateHandler}>
            Already have an account?
          </Button>
        </form>
      </ResetPasswordWrapper>
      {contextHolder}
    </FormWrapper>
  );
};
