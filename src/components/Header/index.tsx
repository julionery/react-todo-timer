import React, { useContext } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';

import { Container, ThemeButton } from './styles';

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <Container>
      <h3>TASK-TIMER MANAGER</h3>
      <ThemeButton>
        <i className="fas fa-sun" />
        <Switch
          className="switch"
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={12}
          width={40}
          handleDiameter={20}
          offColor={shade(0.15, colors.primary)}
          offHandleColor={colors.secundary}
          onColor={colors.secundary}
        />
        <i className="fas fa-moon" />
      </ThemeButton>
    </Container>
  );
};

export default Header;
