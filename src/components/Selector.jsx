import PropTypes from 'prop-types';
import { StyledSelector } from '../styles/LevelPage.styled';

function Selector({ coordinates, size }) {
  return (
    <>
      <StyledSelector coordinates={coordinates} size={size}></StyledSelector>
    </>
  );
}

Selector.propTypes = {
  coordinates: PropTypes.object,
  size: PropTypes.number,
};

export default Selector;
