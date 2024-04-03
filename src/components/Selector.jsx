import PropTypes from 'prop-types';
import {
  StyledSelector,
  StyledMenu,
  MenuButton,
} from '../styles/LevelPage.styled';

function Selector({ coordinates, size }) {
  return (
    <>
      <StyledSelector coordinates={coordinates} size={size}></StyledSelector>
      <StyledMenu coordinates={coordinates}>
        <MenuButton>Char 1</MenuButton>
        <MenuButton>Char 2</MenuButton>
        <MenuButton>Char 3</MenuButton>
      </StyledMenu>
    </>
  );
}

Selector.propTypes = {
  coordinates: PropTypes.object,
  size: PropTypes.number,
};

export default Selector;
