import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 120px;
  background: ${props => props.theme.colors.primary};
  overflow: hidden;
  border-radius: 1.5rem/2rem;
  box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.1);
  transform: translateZ(0);
  padding: 16px 0;
  margin-bottom: 30px;

  .completed {
    text-decoration: line-through;
    opacity: 0.5;
  }

  @media (max-width: 500px) {
    margin-bottom: 16px;
  }
`;

export const TodoHeader = styled.div`
  display: flex;
  padding: 0 26px;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;
    border: 1px solid ${props => props.theme.colors.secundary};
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.secundary};
    font-size: 20px;
  }

  button:disabled {
    color: gray;
    border-color: gray;
    opacity: 0.5;
  }

  li {
    flex: 1;
    padding: 0 16px;
    font-size: 18px;
  }

  .abaFinished {
    padding: 0px 0px 14px 0px;
  }

  .fa-play {
    margin-left: 4px;
  }

  .fa-check {
    margin-top: 2px;
  }

  @media (max-width: 850px) {
    li {
      font-size: 14px;
    }

    button {
      font-size: 15px;
      width: 30px;
      height: 30px;
    }

    p {
      font-size: 10px;

      i {
        display: none;
      }
    }
  }

  @media (max-width: 500px) {
    padding: 0 16px;
  }
`;

export const PainelDescription = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  p {
    padding-left: 16px;
    padding-bottom: 4px;

    @media (max-width: 500px) {
      .abaFinished {
        padding-left: 0px;
      }
    }
  }
`;

export const PainelWithLabel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    padding-bottom: 4px;
  }
`;

export const TodoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid ${props => props.theme.colors.borderCard};
  padding: 16px 26px 0px;

  button {
    border: none;
    margin-left: 12px;
    font-size: 14px;
    background: transparent;
    color: ${props => props.theme.colors.secundary};
  }
`;

export const ContainerTimer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;
  color: ${props => props.theme.colors.text};

  p {
    padding-top: 8px;

    i {
      margin-right: 4px;
    }
  }
`;

export const TodoFooterText = styled.div``;

export const TodoFooterButtons = styled.div``;
