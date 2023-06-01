import { FC } from 'react';
import { IInputWrapperProps } from './InputWrapper.props';
import { InputWrapper as Wrapper } from './InputWrapper.presets';

export const InputWrapper: FC<IInputWrapperProps> = ({ error, children }) => {
  return (
    <Wrapper>
      {children}
      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
};
