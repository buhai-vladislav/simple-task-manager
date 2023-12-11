import { FC } from 'react';
import { Button, Input } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from '@ant-design/icons';

import { FormWrapper } from '../shared/FormWrapper';
import { InputWrapper } from '../shared/InputWrapper';
import { useLogin } from './hooks/useLogin';

export const Login: FC = () => {
  const [isLoading, contextHolder, navigateHandler, formik] = useLogin();

  return (
    <FormWrapper title="Login">
      {contextHolder}
      <form onSubmit={formik.handleSubmit}>
        <InputWrapper error={formik.errors.email}>
          <Input
            name="email"
            placeholder="Type email"
            onChange={formik.handleChange}
            prefix={<MailOutlined />}
            status={!!formik.errors.email ? 'error' : undefined}
            type="email"
          />
        </InputWrapper>
        <InputWrapper error={formik.errors.password}>
          <Input.Password
            name="password"
            placeholder="Type your password"
            onChange={formik.handleChange}
            status={!!formik.errors.password ? 'error' : undefined}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </InputWrapper>
        <Button
          loading={formik.isSubmitting || isLoading}
          disabled={!formik.dirty}
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
        <Button type="link" htmlType="button" onClick={navigateHandler}>
          Forgot password?
        </Button>
      </form>
    </FormWrapper>
  );
};
