import { useFormik } from 'formik';
import type { IForgotPasswordValuesProps } from './ForgotPassword.props';
import { useCallback } from 'react';
import { FormWrapper } from '../shared/FormWrapper';
import { InputWrapper } from '../shared/InputWrapper';
import { Button, Input } from 'antd';
import { useForgotPassword } from '../../api/hooks';
import { ToastType, useToast } from '../../hooks/useToast';
import { getErrorMessage } from '../../utils/error';
import { validationSchema } from './ForgotPassword.helper';
import { ForgotPasswordWrapper } from './ForgotPassword.presets';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const { data, isLoading, mutateAsync: forgotPassword } = useForgotPassword();
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

  return (
    <FormWrapper>
      <ForgotPasswordWrapper>
        <h2>Forgot password</h2>
        {!data?.data ? (
          <form onSubmit={formik.handleSubmit}>
            <InputWrapper error={formik.errors.email}>
              <Input
                name="email"
                placeholder="Type your email"
                onChange={formik.handleChange}
                status={formik.errors.email ? 'error' : undefined}
              />
            </InputWrapper>
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading}
              disabled={isLoading || !formik.dirty || !!formik.errors.email}
            >
              Send
            </Button>
          </form>
        ) : (
          <h3>{data.data}</h3>
        )}
        {contextHolder}
        <Button htmlType="button" type="link" onClick={navigateHandler}>
          {data?.data ? 'Back to login' : 'Already have an account?'}
        </Button>
      </ForgotPasswordWrapper>
    </FormWrapper>
  );
};
