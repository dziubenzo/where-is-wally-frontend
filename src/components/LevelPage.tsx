import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ApiError,
  characterButtonsData,
  checkImageClick,
  getCircleSize,
  getCoordinates,
  getSelectorPosition,
  isSelector,
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

export type ZoomerPos = { percentX: number; percentY: number };

export type CharacterName = 'wally' | 'wenda' | 'wizard' | 'odlaw';

export type CharactersToFind = CharacterName[];

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
  const [showSelectorMenu, setShowSelectorMenu] = useState(false);
  const [showSelectorCircle, setShowSelectorCircle] = useState(false);

  // Zoomer states
  const [showZoomer, setShowZoomer] = useState(false);
  const [zoomerPos, setZoomerPos] = useState<ZoomerPos>({
    percentX: 0,
    percentY: 0,
  });

  // Game flow states
  const [charactersToFind, setCharactersToFind] = useState<CharactersToFind>([
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
      setShowSelectorMenu(false);
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
    let interval: NodeJS.Timeout;

    if (charactersToFind.length) {
      interval = setInterval(() => {
        setTimer(timer + 0.01);
        if (!startDateRef.current) {
          startDateRef.current = Date.now();
        }
      }, 10);
    }
    return () => clearInterval(interval);
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
    if (!showZoomer && showSelectorMenu) {
      setShowZoomer(true);
    }
    setShowSelectorMenu(!showSelectorMenu);
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
    setZoomerPos({ percentX, percentY });
  }

  // Hide zoomer on mouse image leave
  // Hide the entire selector if the cursor leaves the image, but keep showing it if the target is the Selector component
  function handleImageLeave(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) {
    setShowZoomer(false);

    if (isSelector(event)) return;

    setShowSelectorCircle(false);
    setShowSelectorMenu(false);
  }

  // Show zoomer and selector circle on mouse image enter
  // Do not show zoomer if the cursor enters the image from the Selector component
  function handleImageEnter(
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) {
    if (isSelector(event)) return;

    if (event.target === imageRef.current) {
      setShowZoomer(true);
      setShowSelectorCircle(true);
      setShowSelectorMenu(false);
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
        showSelectorMenu={showSelectorMenu}
        showSelectorCircle={showSelectorCircle}
        setCharactersToFind={setCharactersToFind}
        setShowSelectorMenu={setShowSelectorMenu}
        setShowSelectorCircle={setShowSelectorCircle}
        setShowZoomer={setShowZoomer}
      />
      <Zoomer
        imageURL={image_url}
        urlParameter={url_parameter}
        coordinates={selectorPos}
        zoomer={zoomerPos}
        showZoomer={showZoomer}
      />
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
