import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 40px 10px;

  @media (max-width: 500px) {
    padding: 10px 16px 10px;
  }
`;

export const ContainerForm = styled.form`
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const InputBloc = styled.div`
  flex: 1;
  display: flex;

  input {
    border-radius: 1.5rem/2rem;
    font-size: 1.5em;
    width: 100%;
    min-height: 40px;
    border: none;
    padding: 0px 12px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};

    &::placeholder {
      font-size: 0.8em;
    }
  }
  .active {
    border: 2px solid ${props => props.theme.colors.secundary};
  }
`;

export const PainelInput = styled.div`
  flex: 1;
  p {
    margin-left: 2px;
    margin-bottom: 4px;
  }
`;

export const PainelSelect = styled.div`
  p {
    margin-left: 16px;
    margin-bottom: 4px;

    @media (max-width: 1000px) {
      margin-top: 8px;
      margin-left: 0px;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  border-radius: 1.5rem/2rem;
  margin-left: 8px;
  width: 60px;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    background: ${props => props.theme.colors.text};
    color: ${props => props.theme.colors.primary};
  }
`;

export const SelectBloc = styled.div`
  width: 170px;
  overflow: hidden;
  margin-left: 16px;

  @media (max-width: 1000px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const FilterTodo = styled.select`
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  background: ${props => props.theme.colors.primary};
  border: 1px solid #aaa;
  border-radius: 1.5rem/2rem;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(
      to bottom,
      ${props => props.theme.colors.primary} 0%,
      ${props => props.theme.colors.primary} 100%
    );
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  @media (max-width: 1000px) {
    margin-top: 4px;
  }
`;
