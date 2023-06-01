import { FC, useCallback, useEffect } from 'react';
import { FormWrapper } from '../shared/FormWrapper';
import { ISignupFormProps } from './Signup.props';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { InputWrapper } from '../shared/InputWrapper';
import { validationSchema } from './Signup.helper';
import { useSignup } from '../../api/hooks';
import { AxiosError } from 'axios';
import { ToastType, useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

export const Signup: FC = () => {
  const { data, mutateAsync: signUp, isLoading } = useSignup();
  const [contextHolder, openNotification] = useToast('bottom');
  const navigate = useNavigate();

  const onSubmit = useCallback(async (values: ISignupFormProps) => {
    try {
      const { email, fullname, password } = values;
      await signUp({ email, fullname, password });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data?.message);
        openNotification(
          { message: error?.response?.data?.message },
          ToastType.ERROR,
        )();
      }
    } finally {
      formik.setSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (data?.data) {
      openNotification({ message: data.data }, ToastType.SUCCESS, () => {
        navigate('/login');
      })();
    }
  }, [data]);

  const formik = useFormik<ISignupFormProps>({
    initialValues: {
      email: '',
      fullname: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit,
    validationSchema,
    validateOnChange: false,
  });

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
