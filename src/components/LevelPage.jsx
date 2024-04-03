import PropTypes from 'prop-types';
import { StyledLevelPage } from '../styles/LevelPage.styled';
import { useEffect, useRef, useState } from 'react';
import {
  getCoordinates,
  getSelectorPosition,
  getSelectorSize,
} from '../helpers';
import Selector from './Selector';

function LevelPage(props) {
  const imageRef = useRef(null);

  const [selectorSize, setSelectorSize] = useState(null);
  const [selectorPos, setSelectorPos] = useState(null);
  const [showSelector, setShowSelector] = useState(false);

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
    const clickCoordinates = getCoordinates(imageRef, event);
    const newSelectorPos = getSelectorPosition(imageRef, event);
    setShowSelector(!showSelector);
    setSelectorPos(newSelectorPos);
    return;
  }

  return (
    <StyledLevelPage>
      <div>
        <p>Level: TODO</p>
        <p>Time: TODO</p>
      </div>
      <img
        ref={imageRef}
        src="/wally-test.jpg"
        alt="Wally"
        onClick={handleImageClick}
      />
      {showSelector && (
        <Selector coordinates={selectorPos} size={selectorSize} />
      )}
    </StyledLevelPage>
  );
}

LevelPage.propTypes = {};

export default LevelPage;
