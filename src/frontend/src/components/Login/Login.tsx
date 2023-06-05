import { FC, useCallback, useEffect } from 'react';
import { FormWrapper } from '../shared/FormWrapper';
import { ILoginFormProps } from './Login.props';
import { useFormik } from 'formik';
import { Button, Input } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
} from '@ant-design/icons';
import { InputWrapper } from '../shared/InputWrapper';
import { validationSchema } from './Login.helper';
import { useLogin } from '../../api/hooks';
import { ToastType, useToast } from '../../hooks/useToast';
import { useAppDispatch } from '../../store';
import { setUser } from '../../store/reducers/user';
import { useNavigate } from 'react-router-dom';
import { setLocation, setMenuKey } from '../../store/reducers/navigation';
import { getErrorMessage } from '../../utils/error';

export const Login: FC = () => {
  const { data, mutateAsync: login, isLoading } = useLogin();
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
