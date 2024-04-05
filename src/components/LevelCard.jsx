import PropTypes from 'prop-types';
import { StyledLevelCard } from '../styles/LevelsPage.styled';
import { Link } from 'react-router-dom';

function LevelCard({ level }) {
  const { url_parameter, name, image_url } = level;

  return (
    <StyledLevelCard>
      <h2>{url_parameter}</h2>
      <p>{name}</p>
      <div>
        <Link to={`/levels/${url_parameter}`} state={level}>
          <img
            src={image_url}
            alt={`Image Preview for Level ${url_parameter}`}
          />
        </Link>
      </div>
    </StyledLevelCard>
  );
}

LevelCard.propTypes = {
  level: PropTypes.object,
};

export default LevelCard;
