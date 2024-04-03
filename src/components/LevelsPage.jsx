import PropTypes from 'prop-types';
import LevelCard from './LevelCard';
import { StyledLevelsPage } from '../styles/LevelsPage.styled';

function LevelsPage() {
  return (
    <StyledLevelsPage>
      <LevelCard />
      <LevelCard />
      <LevelCard />
    </StyledLevelsPage>
  );
}

LevelsPage.propTypes = {};
export default LevelsPage;
