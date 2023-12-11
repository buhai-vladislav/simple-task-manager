import { FormWrapper } from '../shared/FormWrapper';
import { InputWrapper } from '../shared/InputWrapper';
import { Button, Input } from 'antd';
import { ForgotPasswordWrapper } from './ForgotPassword.presets';
import { useForgotPassword } from './hooks/useForgotPassword';

export const ForgotPassword = () => {
  const [data, isLoading, contextHolder, navigateHandler, formik] =
    useForgotPassword();

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
