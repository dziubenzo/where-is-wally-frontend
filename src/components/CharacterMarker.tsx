import { RefObject, useEffect, useState } from 'react';
import { getCharacterMarkerPos, getCircleSize } from '../helpers';
import { Character } from '../loaders';
import { StyledCharacterMarker } from '../styles/LevelPage.styled';

type CharacterMarkerProps = {
  charactersToFind: string[];
  character:
    | Character<'wally'>
    | Character<'wenda'>
    | Character<'wizard'>
    | Character<'odlaw'>;
  imageRef: RefObject<HTMLImageElement>;
};

export default function CharacterMarker({
  charactersToFind,
  character,
  imageRef,
}: CharacterMarkerProps) {
  const { name, x, y } = character;

  // States for pixel coordinates and size of character marker
  const [pixelCoordinates, setPixelCoordinates] = useState({
    pixelX: 0,
    pixelY: 0,
  });
  const [markerSize, setMarkerSize] = useState(0);

  // Calculate character marker's pixel coordinates and size upon component render
  // Recalculate pixel coordinates and size whenever browser is resized
  useEffect(() => {
    function handleResize() {
      setPixelCoordinates(getCharacterMarkerPos(x, y, imageRef));
      setMarkerSize(getCircleSize(imageRef, 10));
    }
    // This ensures that the top value returned by getBoundingClientRect() is calculated AFTER the header logo loads
    // Before that, the top value was too fast for my logo (and for my eyes because the logo seemed to be always loaded on refresh), so it returned the wrong value in the function and thus character markers were too high unless I resized the window, which triggered the value to be updated to the correct one
    setTimeout(() => {
      setPixelCoordinates(getCharacterMarkerPos(x, y, imageRef));
    }, 0);
    setMarkerSize(getCircleSize(imageRef, 10));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [x, y, imageRef]);

  return (
    <>
      {!charactersToFind.includes(name) && (
        <StyledCharacterMarker position={pixelCoordinates} size={markerSize} />
      )}
    </>
  );
}
