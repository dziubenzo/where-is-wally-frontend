import PropTypes from 'prop-types';
import {
  StyledSelector,
  StyledMenu,
  MenuButton,
} from '../styles/LevelPage.styled';

function Selector({
  coordinates,
  size,
  currentClick,
  charactersToFind,
  setCharactersToFind,
}) {
  function handleClick(buttonCharacter) {
    if (currentClick === buttonCharacter) {
      if (charactersToFind.includes(currentClick)) {
        setCharactersToFind(
          charactersToFind.filter((character) => character !== currentClick),
        );
      }
    }
  }
  return (
    <>
      <StyledSelector coordinates={coordinates} size={size}></StyledSelector>
      <StyledMenu coordinates={coordinates}>
        {charactersToFind.includes('wally') && (
          <MenuButton onClick={() => handleClick('wally')}>
            <img
              src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/ic8mirwy2sevpresfwjf.png"
              alt="Wally"
            />
          </MenuButton>
        )}
        {charactersToFind.includes('wenda') && (
          <MenuButton onClick={() => handleClick('wenda')}>
            <img
              src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/xfa7vlvbt5yeaelsthvw.png"
              alt="Wenda"
            />
          </MenuButton>
        )}
        {charactersToFind.includes('wizard') && (
          <MenuButton onClick={() => handleClick('wizard')}>
            <img
              src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321422/where-is-wally/xaj4haqv5ffosok8yr7o.png"
              alt="Wizard Whitebeard"
            />
          </MenuButton>
        )}
        {charactersToFind.includes('odlaw') && (
          <MenuButton onClick={() => handleClick('odlaw')}>
            <img
              src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/jcrmujs7eunawcwcmuk4.png"
              alt="Odlaw"
            />
          </MenuButton>
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
