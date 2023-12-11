import { FC } from 'react';
import { Button, Input } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { FormWrapper } from '../shared/FormWrapper';
import { InputWrapper } from '../shared/InputWrapper';
import { useSignUp } from './hooks/useSignUp';

export const Signup: FC = () => {
  const [isLoading, contextHolder, formik] = useSignUp();

  return (
    <FormWrapper title="Sign up">
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
        <InputWrapper error={formik.errors.fullname}>
          <Input
            name="fullname"
            placeholder="Type fullname"
            onChange={formik.handleChange}
            prefix={<UserOutlined />}
            status={!!formik.errors.fullname ? 'error' : undefined}
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
        <InputWrapper error={formik.errors.confirmPassword}>
          <Input.Password
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={formik.handleChange}
            status={!!formik.errors.confirmPassword ? 'error' : undefined}
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
          Signup
        </Button>
      </form>
    </FormWrapper>
  );
};
