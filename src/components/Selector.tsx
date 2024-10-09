import { characterButtonsData } from '../helpers';
import { StyledMenu, StyledSelector } from '../styles/LevelPage.styled';
import type { SelectorPos } from './LevelPage';
import SelectorButton from './SelectorButton';

type SelectorProps = {
  coordinates: SelectorPos;
  size: number;
  currentClick: string;
  charactersToFind: string[];
  setCharactersToFind: React.Dispatch<React.SetStateAction<string[]>>;
  setShowSelector: React.Dispatch<React.SetStateAction<boolean>>;
  setShowZoomer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Selector({
  coordinates,
  size,
  currentClick,
  charactersToFind,
  setCharactersToFind,
  setShowSelector,
  setShowZoomer,
}: SelectorProps) {
  function checkGuess(buttonCharacter: string) {
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
