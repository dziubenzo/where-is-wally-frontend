import PropTypes from 'prop-types';
import { StyledSelector, StyledMenu } from '../styles/LevelPage.styled';
import SelectorButton from './SelectorButton';
import { characterImages } from '../helpers';

function Selector({
  coordinates,
  size,
  currentClick,
  charactersToFind,
  setCharactersToFind,
}) {
  function checkGuess(buttonCharacter) {
    if (currentClick === buttonCharacter) {
      if (charactersToFind.includes(currentClick)) {
        // Change game state after delay to be able to show good guess button background
        setTimeout(() => {
          setCharactersToFind(
            charactersToFind.filter((character) => character !== currentClick),
          );
        }, 500);
        return false;
      }
    }
    return true;
  }
  return (
    <>
      <StyledSelector coordinates={coordinates} size={size}></StyledSelector>
      <StyledMenu coordinates={coordinates}>
        {charactersToFind.includes('wally') && (
          <SelectorButton
            characterImageUrl={characterImages.wally}
            alt="Wally"
            checkGuess={checkGuess}
          ></SelectorButton>
        )}
        {charactersToFind.includes('wenda') && (
          <SelectorButton
            characterImageUrl={characterImages.wenda}
            alt="Wenda"
            checkGuess={checkGuess}
          ></SelectorButton>
        )}
        {charactersToFind.includes('wizard') && (
          <SelectorButton
            characterImageUrl={characterImages.wizard}
            alt="Wizard Whitebeard"
            checkGuess={checkGuess}
          ></SelectorButton>
        )}
        {charactersToFind.includes('odlaw') && (
          <SelectorButton
            characterImageUrl={characterImages.odlaw}
            alt="Odlaw"
            checkGuess={checkGuess}
          ></SelectorButton>
        )}
      </StyledMenu>
    </>
  );
}

Selector.propTypes = {
  coordinates: PropTypes.object,
  size: PropTypes.number,
  currentClick: PropTypes.string,
  charactersToFind: PropTypes.array,
  setCharactersToFind: PropTypes.func,
};

export default Selector;
