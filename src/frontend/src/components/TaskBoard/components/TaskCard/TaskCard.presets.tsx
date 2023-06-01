import styled from 'styled-components';

export const TaskCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0rem 0.125rem 0.25rem rgba(31, 33, 36, 0.1),
    0rem 0.0625rem 0.375rem rgba(31, 33, 36, 0.05);
  border-radius: 0.5rem;
  width: 20vw;
  gap: 15px;
  justify-content: space-between;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .body p {
    text-align: start;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .footer {
    text-align: end;
  }
  p {
    margin: 0;
  }
`;
