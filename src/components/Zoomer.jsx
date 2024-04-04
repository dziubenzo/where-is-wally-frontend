import PropTypes from 'prop-types';
import { StyledZoomer, MagnifiedImage } from '../styles/LevelPage.styled';

function Zoomer({ coordinates, zoom }) {
  return (
    <StyledZoomer coordinates={coordinates}>
      <MagnifiedImage src="/wally-test.jpg" alt="Wally Zoomer" zoom={zoom} />
    </StyledZoomer>
  );
}

Zoomer.propTypes = {
  coordinates: PropTypes.object,
  zoom: PropTypes.object,
};

export default Zoomer;
