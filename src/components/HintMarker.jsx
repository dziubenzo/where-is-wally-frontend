import PropTypes from 'prop-types';
import { StyledHintMarker } from '../styles/LevelPage.styled';
import { useState, useEffect } from 'react';
import { getHintSize, getHintMarkerPos } from '../helpers';

function HintMarker({ character, imageRef, showHints }) {
  const { x, y } = character;

  // States for pixel coordinates and size of character marker
  const [pixelCoordinates, setPixelCoordinates] = useState({
    pixelX: 0,
    pixelY: 0,
  });
  const [markerSize, setMarkerSize] = useState({ sizeX: 0, sizeY: 0 });

  useEffect(() => {
    function handleResize() {
      setPixelCoordinates(getHintMarkerPos(x, y, imageRef));
      setMarkerSize(getHintSize(imageRef));
    }
    setTimeout(() => {
      setPixelCoordinates(getHintMarkerPos(x, y, imageRef));
    }, 0);
    setMarkerSize(getHintSize(imageRef, 10));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [x, y, imageRef]);

  return (
    <>
      {showHints && (
        <StyledHintMarker
          position={pixelCoordinates}
          size={markerSize}
        ></StyledHintMarker>
      )}
    </>
  );
}

HintMarker.propTypes = {
  character: PropTypes.object,
  imageRef: PropTypes.object,
  showHints: PropTypes.bool,
};

export default HintMarker;
