import { characterButtonsData } from '../helpers';
import { StyledSelector, StyledSelectorMenu } from '../styles/LevelPage.styled';
import type { CharacterName, CharactersToFind, SelectorPos } from './LevelPage';
import SelectorButton from './SelectorButton';

type SelectorProps = {
  coordinates: SelectorPos;
  size: number;
  currentClick: string;
  charactersToFind: CharactersToFind;
  showSelectorMenu: boolean;
  showSelectorCircle: boolean;
  setCharactersToFind: React.Dispatch<React.SetStateAction<CharactersToFind>>;
  setShowSelectorMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSelectorCircle: React.Dispatch<React.SetStateAction<boolean>>;
  setShowZoomer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Selector({
  coordinates,
  size,
  currentClick,
  charactersToFind,
  showSelectorMenu,
  showSelectorCircle,
  setCharactersToFind,
  setShowSelectorMenu,
  setShowSelectorCircle,
  setShowZoomer,
}: SelectorProps) {
  function checkGuess(buttonCharacter: CharacterName) {
    if (currentClick === buttonCharacter) {
      if (charactersToFind.includes(currentClick)) {
        // Change game state after delay to be able to show good guess button background
        // Hide selector and show zoomer
        setTimeout(() => {
          setCharactersToFind(() =>
            charactersToFind.filter((character) => character !== currentClick),
          );
          setShowSelectorMenu(false);
          // Show zoomer and selector circle as long as there are characters to find
          if (charactersToFind.length !== 0) {
            setShowZoomer(true);
            setShowSelectorCircle(true);
          }
        }, 500);
        return false;
      }
    }
    return true;
  }
  return (
    <>
      <StyledSelector
        className={showSelectorCircle ? 'show' : 'hide'}
        coordinates={coordinates}
        size={size}
      ></StyledSelector>
      <StyledSelectorMenu
        className={showSelectorMenu ? 'show' : 'hide'}
        coordinates={coordinates}
      >
        {characterButtonsData.map((character, index) => {
          return (
            <SelectorButton
              key={index}
              charactersToFind={charactersToFind}
              character={character}
              checkGuess={checkGuess}
            ></SelectorButton>
          );
        })}
      </StyledSelectorMenu>
    </>
  );
}
