import { useState } from 'react';
import type { CharacterButton } from '../helpers';
import { StyledSelectorButton } from '../styles/LevelPage.styled';
import type { CharacterName, CharactersToFind } from './LevelPage';

type SelectorButtonProps = {
  charactersToFind: CharactersToFind;
  character: CharacterButton;
  checkGuess: (buttonCharacter: CharacterName) => boolean;
};

export default function SelectorButton({
  charactersToFind,
  character,
  checkGuess,
}: SelectorButtonProps) {
  const { imageURL, alt } = character;

  // State for giving user feedback on button click
  const [goodGuess, setGoodGuess] = useState(false);
  const [badGuess, setBadGuess] = useState(false);

  // Get character name from alt
  // Use type casting due to the way Array.prototype.includes works with TS
  const characterName = alt.split(' ')[0].toLowerCase() as CharacterName;

  // Manipulate background colour of button depending on guess
  const changeBackground = goodGuess
    ? { backgroundColor: '#22e215' }
    : badGuess
      ? { backgroundColor: '#FF0000' }
      : undefined;

  // Check the guess
  // Change background for a short while if guess incorrect
  // Change background permanently if guess correct
  function handleButtonClick() {
    const isBadGuess = checkGuess(characterName);
    if (isBadGuess) {
      setBadGuess(true);
      setTimeout(() => {
        setBadGuess(false);
      }, 500);
    } else {
      setGoodGuess(true);
    }
  }

  return (
    <>
      {charactersToFind.includes(characterName) && (
        <StyledSelectorButton
          style={changeBackground}
          onClick={handleButtonClick}
        >
          <img src={imageURL} alt={alt} />
        </StyledSelectorButton>
      )}
    </>
  );
}
