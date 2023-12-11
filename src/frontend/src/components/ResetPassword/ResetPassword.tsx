import { Button, Input } from 'antd';

import { ResetPasswordWrapper } from './ResetPassword.presets';
import { FormWrapper } from '../shared/FormWrapper';
import { InputWrapper } from '../shared/InputWrapper';
import { useResetPassword } from './hooks/useResetPassword';

export const ResetPassword = () => {
  const [data, contextHolder, isLoading, navigateHandler, formik] =
    useResetPassword();

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
