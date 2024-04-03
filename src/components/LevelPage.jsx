import PropTypes from 'prop-types';
import { StyledLevelPage } from '../styles/LevelPage.styled';
import { useRef } from 'react';
import { getCoordinates } from '../helpers';

function LevelPage(props) {
  const imageRef = useRef(null);

  function handleImageClick(event) {
    const coordinates = getCoordinates(imageRef, event);
    console.log(coordinates);
  }

  return (
    <StyledLevelPage>
      <div>
        <p>Level: TODO</p>
        <p>Time: TODO</p>
      </div>
      <img
        ref={imageRef}
        src="/wally-test.jpg"
        alt="Wally"
        onClick={handleImageClick}
      />
    </StyledLevelPage>
  );
}

LevelPage.propTypes = {};

export default LevelPage;
