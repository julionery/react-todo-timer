import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .completed {
    text-decoration: line-through;
    opacity: 0.5;
  }
`;
