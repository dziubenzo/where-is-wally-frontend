import { RefObject, useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import {
  CharacterButton,
  getHintCharacterPos,
  getHintMarkerPos,
  getHintSize,
} from '../helpers';
import type { Character } from '../loaders';
import { StyledHintMarker } from '../styles/LevelPage.styled';
import type { MarkerPos } from './CharacterMarker';
import type { CharactersToFind } from './LevelPage';

type HintMarkerProps = {
  character:
    | Character<'wally'>
    | Character<'wenda'>
    | Character<'wizard'>
    | Character<'odlaw'>;
  imageRef: RefObject<HTMLImageElement>;
  showHints: boolean;
  hintColour: CharacterButton['hintColour'];
  charactersToFind: CharactersToFind;
};

export type HintSize = {
  sizeX: number;
  sizeY: number;
};

export default function HintMarker({
  character,
  imageRef,
  showHints,
  hintColour,
  charactersToFind,
}: HintMarkerProps) {
  const { x, y, name } = character;
  const theme = useTheme();

  // States for pixel coordinates and size of hint marker
  const [pixelCoordinates, setPixelCoordinates] = useState<MarkerPos>({
    pixelX: 0,
    pixelY: 0,
  });
  const [markerSize, setMarkerSize] = useState<HintSize>({
    sizeX: 0,
    sizeY: 0,
  });
  const [hintCharPos, setHintCharPos] = useState(0);

  useEffect(() => {
    function placeAndResizeHints() {
      setPixelCoordinates(getHintMarkerPos(x, y, imageRef));
      setMarkerSize(getHintSize(imageRef));
    }
    function handleResize() {
      if (window.innerWidth <= parseInt(theme.mobile)) return;
      placeAndResizeHints();
    }
    function handleOrientationChange() {
      if (window.innerWidth > parseInt(theme.mobile)) return;
      placeAndResizeHints();
    }
    setTimeout(() => {
      setPixelCoordinates(getHintMarkerPos(x, y, imageRef));
    }, 0);
    setMarkerSize(getHintSize(imageRef));
    window.addEventListener('resize', handleResize);
    screen.orientation.addEventListener('change', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      screen.orientation.removeEventListener('change', handleOrientationChange);
    };
  }, [x, y, theme.mobile, imageRef]);

  // Set position of the hint character image once markerSize values are calculated or change
  useEffect(() => {
    setHintCharPos(getHintCharacterPos(markerSize.sizeX));
  }, [markerSize]);

  return (
    <>
      {showHints && charactersToFind.includes(name) && (
        <StyledHintMarker
          position={pixelCoordinates}
          size={markerSize}
          hintcolour={hintColour}
          hintcharpos={hintCharPos}
        >
          <img
            src={`/${name}-hint.png`}
            alt={name[0].toUpperCase() + name.slice(1)}
          />
        </StyledHintMarker>
      )}
    </>
  );
}
