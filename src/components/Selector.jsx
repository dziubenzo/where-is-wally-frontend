import PropTypes from 'prop-types';
import { StyledSelector, StyledMenu } from '../styles/LevelPage.styled';
import SelectorButton from './SelectorButton';
import { characterButtonsData } from '../helpers';

function Selector({
  coordinates,
  size,
  currentClick,
  charactersToFind,
  setCharactersToFind,
  setShowSelector,
  setShowZoomer,
}) {
  function checkGuess(buttonCharacter) {
    if (currentClick === buttonCharacter) {
      if (charactersToFind.includes(currentClick)) {
        // Change game state after delay to be able to show good guess button background
        // Hide selector and show zoomer
        setTimeout(() => {
          setCharactersToFind(
            charactersToFind.filter((character) => character !== currentClick),
          );
          setShowSelector(false);
          // Show zoomer as long as there are at least 2 characters to find
          if (charactersToFind.length !== 1) {
            setShowZoomer(true);
          }
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
        {characterButtonsData.map((character, index) => {
          return (
            <SelectorButton
              key={index}
              charactersToFind={charactersToFind}
              imageURL={character.imageURL}
              alt={character.alt}
              checkGuess={checkGuess}
            ></SelectorButton>
          );
        })}
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
  setShowSelector: PropTypes.func,
  setShowZoomer: PropTypes.func,
};

export default Selector;
