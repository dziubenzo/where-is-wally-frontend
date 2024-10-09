import { Link } from 'react-router-dom';
import type { Level } from '../loaders';
import { StyledLevelCard } from '../styles/LevelsPage.styled';

type LevelCardProps = {
  level: Level;
};

export default function LevelCard({ level }: LevelCardProps) {
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
