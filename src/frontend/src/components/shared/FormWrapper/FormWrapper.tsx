import type { FC } from 'react';
import type { IFormWrapperProps } from './FormWrapper.props';
import { Wrapper } from './FormWrapper.presets';

export const FormWrapper: FC<IFormWrapperProps> = ({ children, title }) => {
  return (
    <Wrapper>
      {title && <h3>{title}</h3>}
      {children}
    </Wrapper>
  );
};
