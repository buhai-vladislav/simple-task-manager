import styled from 'styled-components';

export const TaskBoardWrapper = styled.div`
  min-height: 60vh;
  .header {
    display: flex;
    gap: 60px;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 0rem 0.125rem 0.25rem rgba(31, 33, 36, 0.1),
      0rem 0.0625rem 0.375rem rgba(31, 33, 36, 0.05);
    border-radius: 0.5rem;
    width: calc(3 * 20vw + 2 * 20px);
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    .items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
  }
`;
