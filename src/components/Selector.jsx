import PropTypes from 'prop-types';
import {
  StyledSelector,
  StyledMenu,
  MenuButton,
} from '../styles/LevelPage.styled';

function Selector({ coordinates, size }) {
  return (
    <>
      <StyledSelector coordinates={coordinates} size={size}></StyledSelector>
      <StyledMenu coordinates={coordinates}>
        <MenuButton>
          <img
            src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/ic8mirwy2sevpresfwjf.png"
            alt="Wally"
          />
        </MenuButton>
        <MenuButton>
          <img
            src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/xfa7vlvbt5yeaelsthvw.png"
            alt="Wenda"
          />
        </MenuButton>
        <MenuButton>
          <img
            src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321422/where-is-wally/xaj4haqv5ffosok8yr7o.png"
            alt="Wizard Whitebeard"
          />
        </MenuButton>
        <MenuButton>
          <img
            src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1712321197/where-is-wally/jcrmujs7eunawcwcmuk4.png"
            alt="Odlaw"
          />
        </MenuButton>
      </StyledMenu>
    </>
  );
}

Selector.propTypes = {
  coordinates: PropTypes.object,
  size: PropTypes.number,
};

export default Selector;
