import { Button, Input } from 'antd';

import { FormWrapper } from '../shared/FormWrapper';
import { ProfileWrapper } from './Profile.presets';
import { InputWrapper } from '../shared/InputWrapper';
import { useProfile } from './hooks/useProfile';

export const Profile = () => {
  const [
    contextHolder,
    isLoading,
    isLogouting,
    disabled,
    disableToggle,
    formik,
  ] = useProfile();

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
