import PropTypes from 'prop-types';
import { StyledLevelCard } from '../styles/LevelsPage.styled';
import { Link } from 'react-router-dom';

function LevelCard(props) {
  return (
    <StyledLevelCard>
      <h2>1</h2>
      <p>Level Name</p>
      <div>
        <Link to="/levels/1">
          <img src="/wally-test.jpg" alt="Wally Level 1" />
        </Link>
      </div>
    </StyledLevelCard>
  );
}

LevelCard.propTypes = {};

export default LevelCard;
