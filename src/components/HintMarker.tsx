import { RefObject, useEffect, useState } from 'react';
import { CharacterButton, getHintMarkerPos, getHintSize } from '../helpers';
import { Character } from '../loaders';
import { StyledHintMarker } from '../styles/LevelPage.styled';
import type { PixelCoords } from './CharacterMarker';

type HintMarkerProps = {
  character:
    | Character<'wally'>
    | Character<'wenda'>
    | Character<'wizard'>
    | Character<'odlaw'>;
  imageRef: RefObject<HTMLImageElement>;
  showHints: boolean;
  hintColour: CharacterButton['hintColour'];
  charactersToFind: string[];
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
  const [pixelCoordinates, setPixelCoordinates] = useState<PixelCoords>({
    pixelX: 0,
    pixelY: 0,
  });
  const [markerSize, setMarkerSize] = useState<HintSize>({
    sizeX: 0,
    sizeY: 0,
  });

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

  return (
    <>
      {showHints && charactersToFind.includes(name) && (
        <StyledHintMarker
          position={pixelCoordinates}
          size={markerSize}
          hintcolour={hintColour}
        ></StyledHintMarker>
      )}
    </>
  );
}