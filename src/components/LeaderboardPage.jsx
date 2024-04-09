import {
  StyledLeaderboardPage,
  LevelButton,
  StyledLeaderboardTable,
} from '../styles/LeaderboardPage.styled';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

function LeaderboardPage() {
  const { levels, players } = useLoaderData();

  // State for changing heading
  const [heading, setHeading] = useState('All');
  // State for highlighting currently pressed filter button
  const [pressedButton, setPressedButton] = useState(
    new Array(levels.length + 1).fill(null),
  );
  // State for displaying table data
  const [tableData, setTableData] = useState(players);

  function handleLevelButtonClick(levelId) {
    const [currentLevel] = levels.filter((level) => level._id === levelId);
    setHeading(`Level ${currentLevel.url_parameter} - ${currentLevel.name}`);
    setPressedButton(
      pressedButton.map((button, index) => {
        if (index === currentLevel.url_parameter) {
          return (button = true);
        } else {
          return (button = null);
        }
      }),
    );
    setTableData(players.filter((player) => player.level._id === levelId));
  }

  function handleAllButtonClick() {
    setHeading('All');
    setPressedButton(
      pressedButton.map((button, index) => {
        if (index === 0) {
          return (button = true);
        } else {
          return (button = null);
        }
      }),
    );
    setTableData(players);
  }

  // Mark the All button as pressed upon component render
  useEffect(() => {
    setPressedButton(
      pressedButton.map((button, index) => {
        if (index === 0) {
          return (button = true);
        } else {
          return (button = null);
        }
      }),
    );
  }, []);

  return (
    <StyledLeaderboardPage>
      <div className="level-buttons">
        <>
          <LevelButton
            selected={pressedButton[0]}
            onClick={handleAllButtonClick}
          >
            All
          </LevelButton>
          {levels.map((level) => {
            return (
              <LevelButton
                key={level.url_parameter}
                selected={pressedButton[level.url_parameter]}
                onClick={() => handleLevelButtonClick(level._id)}
              >
                Level {level.url_parameter}
              </LevelButton>
            );
          })}
        </>
      </div>
      <h2>{heading}</h2>
      <StyledLeaderboardTable>
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Nickname</th>
            <th>Level</th>
            <th>Time</th>
            <th>Date</th>
            <th>Hints?</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((player, index) => {
            return (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td className="nickname-column">{player.nickname}</td>
                <td className="level-column">{player.level.name}</td>
                <td className="time-column">{player.duration.toFixed(2)} s</td>
                <td>{format(player.end_date, 'dd/MM/yy')}</td>
                <td
                  className={player.hints_used ? 'yes-hints-column' : undefined}
                >
                  {player.hints_used ? 'Yes' : 'No'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledLeaderboardTable>
    </StyledLeaderboardPage>
  );
}

export default LeaderboardPage;
