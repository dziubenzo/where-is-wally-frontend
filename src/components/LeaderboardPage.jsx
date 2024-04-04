import PropTypes from 'prop-types';
import {
  StyledLeaderboardPage,
  LevelButton,
  StyledLeaderboardTable,
} from '../styles/LeaderboardPage.styled';

function LeaderboardPage(props) {
  return (
    <StyledLeaderboardPage>
      <div className="level-buttons">
        <LevelButton>Level 1</LevelButton>
        <LevelButton>Level 2</LevelButton>
        <LevelButton>Level 3</LevelButton>
      </div>
      <h2>Level 1</h2>
      <StyledLeaderboardTable>
        <tr>
          <th>Position</th>
          <th>Nickname</th>
          <th>Time</th>
          <th>Date</th>
          <th>Hint Used?</th>
        </tr>
        <tr>
          <td>1</td>
          <td>ME</td>
          <td>3.33 s</td>
          <td>26/05/1945</td>
          <td>No</td>
        </tr>
        <tr>
          <td>2</td>
          <td>YOU</td>
          <td>35.33 s</td>
          <td>26/05/1945</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>3</td>
          <td>KHALEESI</td>
          <td>1823.33 s</td>
          <td>26/05/1945</td>
          <td>No</td>
        </tr>
      </StyledLeaderboardTable>
    </StyledLeaderboardPage>
  );
}

LeaderboardPage.propTypes = {};

export default LeaderboardPage;
