import PropTypes from 'prop-types';
import LevelCard from './LevelCard';
import { StyledLevelsPage } from '../styles/LevelsPage.styled';
import { useLoaderData } from 'react-router-dom';

function LevelsPage() {
  const levels = useLoaderData();
  
  return (
    <StyledLevelsPage>
      {levels.map((level) => {
        return <LevelCard key={level.url_parameter} level={level} />;
      })}
    </StyledLevelsPage>
  );
}

LevelsPage.propTypes = {};
export default LevelsPage;
