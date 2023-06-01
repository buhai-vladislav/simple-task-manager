import styled from 'styled-components';

export const InputWrapper = styled.div`
  .error {
    color: #ff4d4f;
  }

  &:has(.error) .ant-input-affix-wrapper {
    margin-bottom: 5px;
  }
`;
