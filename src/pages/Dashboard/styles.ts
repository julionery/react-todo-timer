import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  max-width: 1120px;
  min-height: 100%;
  margin: 0 auto;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  padding: 40px 40px;
  border-left: 2px solid ${props => props.theme.colors.border};
  border-right: 2px solid ${props => props.theme.colors.border};

  @media (max-width: 500px) {
    padding: 16px 16px;
  }
`;

export const StatusCard = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  min-height: 150px;
  background: ${props => props.theme.colors.primary};
  overflow: hidden;
  border-radius: 1.5rem/2rem;
  box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.1);
  transform: translateZ(0);
  padding-top: 10px;
  margin-bottom: 30px;
`;

export const CalendarCard = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 300px;
  min-height: 320px;
  max-height: 320px;
  background: ${props => props.theme.colors.primary};
  overflow: hidden;
  border-radius: 1.5rem/2rem;
  box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.1);
  transform: translateZ(0);
  padding-top: 10px;
`;

export const TaskBoard = styled.div`
  flex: 2;
  padding: 70px 0px;

  border-right: 2px solid ${props => props.theme.colors.border};

  .react-tabs__tab-list {
    border-bottom: 2px solid ${props => props.theme.colors.border};
    letter-spacing: 1px;
  }

  .react-tabs__tab--selected {
    background: transparent;
    border: none;
    border-radius: 0;
    color: ${props => props.theme.colors.secundary};
    font-weight: 600;
    font-size: 17px;
    border-bottom: 2px solid ${props => props.theme.colors.secundary};
  }
`;

export const TaskBoardHeader = styled.div`
  position: absolute;
  margin-top: -80px;

  padding: 0px 40px 16px;

  h1 {
    font-size: 22px;
  }

  @media (max-width: 500px) {
    margin-top: -110px;
    padding: 0px 16px 16px;
  }
`;
