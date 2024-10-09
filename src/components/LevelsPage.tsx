import { useLoaderData } from 'react-router-dom';
import { LevelsPageLoader } from '../loaders';
import { StyledLevelsPage } from '../styles/LevelsPage.styled';
import LevelCard from './LevelCard';

export default function LevelsPage() {
  const levels = useLoaderData() as LevelsPageLoader;

  return (
    <StyledLevelsPage>
      {levels.map((level) => {
        return <LevelCard key={level.url_parameter} level={level} />;
      })}
    </StyledLevelsPage>
  );
}
