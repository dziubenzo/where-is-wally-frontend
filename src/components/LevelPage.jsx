import { StyledLevelPage } from '../styles/LevelPage.styled';
import { useEffect, useRef, useState } from 'react';
import {
  getCoordinates,
  getSelectorPosition,
  getCircleSize,
  checkImageClick,
  characterButtonsData,
} from '../helpers';
import Selector from './Selector';
import Zoomer from './Zoomer';
import { useLocation } from 'react-router-dom';
import CharacterMarker from './CharacterMarker';
import HintMarker from './HintMarker';
import GameOverModal from './GameOverModal';

function LevelPage() {
  // Get level from Link prop
  const { state } = useLocation();
  const { _id, url_parameter, image_url, characters } = state;

  const imageRef = useRef(null);
  const startDateRef = useRef(null);

  // Selector states
  const [selectorSize, setSelectorSize] = useState(null);
  const [selectorPos, setSelectorPos] = useState({ x: 0, y: 0 });
  const [showSelector, setShowSelector] = useState(false);

  // Magnifying glass states
  const [showZoomer, setShowZoomer] = useState(false);
  const [zoomPos, setZoomPos] = useState({ percentX: '50%', percentY: '50%' });

  // Game flow states
  const [charactersToFind, setCharactersToFind] = useState([
    'wally',
    'wenda',
    'wizard',
    'odlaw',
  ]);
  const [currentClick, setCurrentClick] = useState(false);
  const [timer, setTimer] = useState(0);

  // Hints states
  const [showHints, setShowHints] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(false);

  // Calculate selector size upon component render
  // Hide selector and calculate its size whenever browser is resized
  useEffect(() => {
    function handleResize() {
      setShowSelector(false);
      setSelectorSize(getCircleSize(imageRef));
    }
    setSelectorSize(getCircleSize(imageRef));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update timer every 10 ms as long as there are characters to find
  // Set start date
  useEffect(() => {
    if (charactersToFind.length) {
      setTimeout(() => {
        setTimer(timer + 0.01);
        if (startDateRef.current === null) {
          startDateRef.current = Date.now();
        }
      }, 10);
    }
  }, [charactersToFind, timer]);

  function handleImageClick(event) {
    // Hide zoomer
    setShowZoomer(false);
    // Set state according to the result of the click (character name or empty string)
    const { percentX, percentY } = getCoordinates(imageRef, event);
    setCurrentClick(checkImageClick(percentX, percentY, characters));
    // Calculate selector position
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

  function handleImageEnter(event) {
    // Hide selector only when img is entered from the "outside", i.e. not when you enter img from selector buttons
    if (
      event.relatedTarget instanceof Window ||
      event.relatedTarget.className === 'game-info' ||
      event.relatedTarget.localName === 'main'
    ) {
      setShowZoomer(true);
      setShowSelector(false);
    }
  }

  function handleHintButtonClick() {
    setShowHints(!showHints);
    setHintsUsed(true);
  }

  return (
    <StyledLevelPage>
      <div className="game-info">
        <div>
          <p>Characters Found:</p>
          <span>
            {characters.length - charactersToFind.length}/{characters.length}
          </span>
        </div>
        <button onClick={handleHintButtonClick}>
          {showHints ? 'Hide' : 'Show'} Hints
        </button>
        <div>
          <p>Time:</p>
          <span>{timer.toFixed(2)}</span>
        </div>
      </div>
      <img
        ref={imageRef}
        src={image_url}
        alt={`Where's Wally Image - Level ${url_parameter}`}
        onClick={handleImageClick}
        onMouseLeave={handleImageLeave}
        onMouseEnter={handleImageEnter}
        onMouseMove={showZoomer ? handleImageHover : undefined}
      />
      {showSelector && (
        <Selector
          coordinates={selectorPos}
          size={selectorSize}
          currentClick={currentClick}
          charactersToFind={charactersToFind}
          setCharactersToFind={setCharactersToFind}
          setShowSelector={setShowSelector}
          setShowZoomer={setShowZoomer}
        />
      )}
      {showZoomer && (
        <Zoomer
          imageUrl={image_url}
          urlParameter={url_parameter}
          coordinates={selectorPos}
          zoom={zoomPos}
        />
      )}
      {characters.map((character, index) => {
        return (
          <CharacterMarker
            key={index}
            charactersToFind={charactersToFind}
            character={character}
            imageRef={imageRef}
          />
        );
      })}
      {characters.map((character, index) => {
        return (
          <HintMarker
            key={index}
            character={character}
            imageRef={imageRef}
            showHints={showHints}
            hintcolour={characterButtonsData[index].hintColour}
            charactersToFind={charactersToFind}
          />
        );
      })}
      {!charactersToFind.length && (
        <GameOverModal
          levelId={_id}
          startDateRef={startDateRef}
          timer={timer}
          hintsUsed={hintsUsed}
        />
      )}
    </StyledLevelPage>
  );
}

export default LevelPage;
