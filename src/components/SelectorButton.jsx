import PropTypes from 'prop-types';
import { StyledSelectorButton } from '../styles/LevelPage.styled';
import { useState } from 'react';
StyledSelectorButton;

function SelectorButton({ characterImageUrl, alt, checkGuess }) {
  // State for giving user feedback on button click
  const [goodGuess, setGoodGuess] = useState(false);
  const [badGuess, setBadGuess] = useState(false);

  // Check the guess
  // Change background for a short while if guess incorrect
  // Change background permanently if guess correct
  function handleButtonClick() {
    const isBadGuess = checkGuess(alt.split(' ')[0].toLowerCase());
    if (isBadGuess) {
      setBadGuess(true);
      setTimeout(() => {
        setBadGuess(false);
      }, 500);
    } else {
      setGoodGuess(true);
    }
  }

  // Manipulate background colour of button depending on guess
  const changeBackground = goodGuess
    ? { backgroundColor: '#22e215' }
    : badGuess
      ? { backgroundColor: '#FF0000' }
      : undefined;

  return (
    <StyledSelectorButton style={changeBackground} onClick={handleButtonClick}>
      <img src={characterImageUrl} alt={alt} />
    </StyledSelectorButton>
  );
}

SelectorButton.propTypes = {
  characterImageUrl: PropTypes.string,
  alt: PropTypes.string,
  checkGuess: PropTypes.func,
};

export default SelectorButton;
