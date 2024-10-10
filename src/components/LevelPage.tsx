import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ApiError,
  characterButtonsData,
  checkImageClick,
  getCircleSize,
  getCoordinates,
  getImageCentrePos,
  getSelectorPosition,
} from '../helpers';
import type { Level } from '../loaders';
import { StyledLevelPage } from '../styles/LevelPage.styled';
import CharacterMarker from './CharacterMarker';
import GameOverModal from './GameOverModal';
import HintMarker from './HintMarker';
import Selector from './Selector';
import Zoomer from './Zoomer';

type LevelState = { state: Level | undefined };

export type SelectorPos = {
  x: number;
  y: number;
};

export type ZoomPos = { percentX: number; percentY: number };

export default function LevelPage() {
  // Get level from Link prop
  const { state } = useLocation() as LevelState;
  // Handle empty state error
  if (!state) {
    throw new ApiError('Access level through the Levels page!', 400);
  }
  const { _id, url_parameter, image_url, characters } = state;

  const imageRef = useRef<HTMLImageElement>(null);
  const startDateRef = useRef(0);

  // Selector states
  const [selectorSize, setSelectorSize] = useState(0);
  const [selectorPos, setSelectorPos] = useState<SelectorPos>({ x: 0, y: 0 });
  const [showSelector, setShowSelector] = useState(false);

  // Magnifying glass states
  const [showZoomer, setShowZoomer] = useState(false);
  const [zoomPos, setZoomPos] = useState<ZoomPos>({ percentX: 0, percentY: 0 });

  // Game flow states
  const [charactersToFind, setCharactersToFind] = useState<string[]>([
    'wally',
    'wenda',
    'wizard',
    'odlaw',
  ]);
  const [currentClick, setCurrentClick] = useState('');
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

  // Place the selector circle right in the centre of the image upon component render and imageRef availability
  useEffect(() => {
    const centreCoords = getImageCentrePos(imageRef);
    setSelectorPos(centreCoords);
  }, []);

  // Update timer every 10 ms as long as there are characters to find
  // Set start date
  useEffect(() => {
    if (charactersToFind.length) {
      setTimeout(() => {
        setTimer(timer + 0.01);
        if (!startDateRef.current) {
          startDateRef.current = Date.now();
        }
      }, 10);
    }
  }, [charactersToFind, timer]);

  function handleImageClick(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) {
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

  function handleImageHover(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) {
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

  function handleImageEnter(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) {
    // Hide selector only when img is entered from the "outside", i.e. not when you enter img from selector buttons
    if (
      event.relatedTarget instanceof Element &&
      (event.relatedTarget instanceof Window ||
        event.relatedTarget?.className === 'game-info' ||
        event.relatedTarget?.localName === 'main')
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
      <Selector
        coordinates={selectorPos}
        size={selectorSize}
        currentClick={currentClick}
        charactersToFind={charactersToFind}
        showSelector={showSelector}
        setCharactersToFind={setCharactersToFind}
        setShowSelector={setShowSelector}
        setShowZoomer={setShowZoomer}
      />
      {showZoomer && (
        <Zoomer
          imageURL={image_url}
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
            hintColour={characterButtonsData[index].hintColour}
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
