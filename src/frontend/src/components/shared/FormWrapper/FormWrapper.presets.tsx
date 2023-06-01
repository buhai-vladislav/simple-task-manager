import styled from 'styled-components';

export const Wrapper = styled.div`
  box-shadow: 0rem 0.125rem 0.25rem rgba(31, 33, 36, 0.1),
    0rem 0.0625rem 0.375rem rgba(31, 33, 36, 0.05);
  width: 400px;
  border-radius: 0.5rem;
  padding: 40px;

  form {
    display: flex;
    gap: 20px;
    flex-direction: column;
  }

  h3 {
    font-size: 1.25rem;
    text-align: center;
    margin-bottom: 20px;
  }
`;
