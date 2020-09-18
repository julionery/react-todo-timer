import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 0px 40px;

  @media (max-width: 500px) {
    padding: 0px 16px;
  }
`;

export const List = styled.ul`
  list-style: none;
  width: 100%;
  min-width: 30%;
  padding-top: 10px;
  padding-bottom: 20px;

  h3 {
    padding-top: 20px;
  }
`;
