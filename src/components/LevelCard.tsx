import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Level } from '../loaders';
import { StyledLevelCard } from '../styles/LevelsPage.styled';

type LevelCardProps = {
  level: Level;
};

export default function LevelCard({ level }: LevelCardProps) {
  const { url_parameter, name, image_url } = level;
  const [loaded, setLoaded] = useState(false);

  return (
    <StyledLevelCard>
      <h2>{url_parameter}</h2>
      <p>{name}</p>
      <div style={loaded ? undefined : { visibility: 'hidden' }}>
        <Link to={`/levels/${url_parameter}`}>
          <img
            src={image_url}
            alt={`Image Preview for Level ${url_parameter}`}
            onLoad={() => {
              setLoaded(true);
            }}
          />
        </Link>
      </div>
    </StyledLevelCard>
  );
}
