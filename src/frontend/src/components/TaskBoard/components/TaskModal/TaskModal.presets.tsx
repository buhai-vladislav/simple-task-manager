import styled from 'styled-components';

export const TaskModalWrapper = styled.div`
  .view,
  .edit,
  form {
    display: grid;
    gap: 10px;
  }

  .items {
    display: grid;
    gap: 5px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }

  .create-block {
    .input-block {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 5px;
    }
  }
`;
