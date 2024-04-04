import PropTypes from 'prop-types';
import { StyledLevelPage } from '../styles/LevelPage.styled';
import { useEffect, useRef, useState } from 'react';
import {
  getCoordinates,
  getSelectorPosition,
  getSelectorSize,
} from '../helpers';
import Selector from './Selector';
import Zoomer from './Zoomer';

function LevelPage(props) {
  const imageRef = useRef(null);

  const [selectorSize, setSelectorSize] = useState(null);
  const [selectorPos, setSelectorPos] = useState({ x: 0, y: 0 });
  const [showSelector, setShowSelector] = useState(false);

  const [showZoomer, setShowZoomer] = useState(false);
  const [zoomPos, setZoomPos] = useState({ percentX: '50%', percentY: '50%' });

  // Calculate selector size upon component render
  // Hide selector and calculate its size whenever browser is resized
  useEffect(() => {
    function handleResize() {
      setShowSelector(false);
      setSelectorSize(getSelectorSize(imageRef));
    }
    setSelectorSize(getSelectorSize(imageRef));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleImageClick(event) {
    // Hide zoomer
    setShowZoomer(false);
    const clickCoordinates = getCoordinates(imageRef, event);
    const newSelectorPos = getSelectorPosition(imageRef, event);
    // Show zoomer again if selector is to be hidden
    if (!showZoomer && showSelector) {
      setShowZoomer(true);
    }
    setShowSelector(!showSelector);
    setSelectorPos(newSelectorPos);
  }

  function handleImageHover(event) {
    // Update position of selector, menu and zoomer
    const newSelectorPos = getSelectorPosition(imageRef, event);
    setSelectorPos(newSelectorPos);
    // Get precise percent values of large image for smooth zooming
    const { percentX, percentY } = getCoordinates(imageRef, event, true);
    // Update zoom
    setZoomPos({ percentX, percentY });
  }

  function handleImageLeave() {
    setShowZoomer(false);
  }

  function handleImageEnter() {
    setShowZoomer(true);
    setShowSelector(false);
  }

  return (
    <StyledLevelPage>
      <div>
        <p>Level: TODO</p>
        <p>Characters Found: X/X</p>
        <p>Time: TODO</p>
      </div>
      <img
        ref={imageRef}
        src="/wally-test.jpg"
        alt="Wally"
        onClick={handleImageClick}
        onMouseLeave={handleImageLeave}
        onMouseEnter={handleImageEnter}
        onMouseMove={showZoomer ? handleImageHover : undefined}
      />
      {showSelector && (
        <Selector coordinates={selectorPos} size={selectorSize} />
      )}
      {showZoomer && <Zoomer coordinates={selectorPos} zoom={zoomPos} />}
    </StyledLevelPage>
  );
}

LevelPage.propTypes = {};

export default LevelPage;
