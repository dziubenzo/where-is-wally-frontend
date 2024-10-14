import { RefObject, useEffect, useState } from 'react';
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
    function handleResize() {
      setPixelCoordinates(getHintMarkerPos(x, y, imageRef));
      setMarkerSize(getHintSize(imageRef));
    }
    setTimeout(() => {
      setPixelCoordinates(getHintMarkerPos(x, y, imageRef));
    }, 0);
    setMarkerSize(getHintSize(imageRef));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [x, y, imageRef]);

  // Set position of the hint character image once markerSize values are calculated
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
