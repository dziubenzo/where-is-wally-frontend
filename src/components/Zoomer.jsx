import PropTypes from 'prop-types';
import { StyledZoomer, MagnifiedImage } from '../styles/LevelPage.styled';

function Zoomer({ imageUrl, url_parameter, coordinates, zoom }) {
  // console.log(Math.round(zoom.percentX), Math.round(zoom.percentY));
  return (
    <StyledZoomer coordinates={coordinates}>
      <MagnifiedImage
        src={imageUrl}
        alt={`Magnifying Glass for Where's Wally Image - Level ${url_parameter}`}
        zoom={zoom}
      />
    </StyledZoomer>
  );
}

Zoomer.propTypes = {
  imageUrl: PropTypes.string,
  url_parameter: PropTypes.number,
  coordinates: PropTypes.object,
  zoom: PropTypes.object,
};

export default Zoomer;
