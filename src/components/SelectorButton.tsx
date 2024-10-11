import { useState } from 'react';
import { StyledSelectorButton } from '../styles/LevelPage.styled';
import { CharacterButton } from '../helpers';

type SelectorButtonProps = {
  charactersToFind: string[];
  character: CharacterButton;
  checkGuess: (buttonCharacter: string) => boolean;
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
  const characterName = alt.split(' ')[0].toLowerCase();

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
