import PropTypes from 'prop-types';
import { StyledGameOverModal } from '../styles/LevelPage.styled';
import { useRef, useEffect, useState } from 'react';
import API_URL from '../API';
import { Link } from 'react-router-dom';

function GameOverModal({ levelId, startDateRef, timer, hintsUsed }) {
  const modalRef = useRef(null);

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [endDate, setEndDate] = useState(null);

  // Submit record
  async function submitRecord(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    const newRecordData = {
      nickname: formData.get('nickname'),
      level: levelId,
      start: startDateRef.current,
      end: endDate,
      hints_used: hintsUsed,
    };
    const res = await fetch(`${API_URL}/players`, {
      method: 'POST',
      body: JSON.stringify(newRecordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      setIsSubmitting(false);
      setError(true);
      return;
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
    return;
  }

  // Show modal for the backdrop pseudo element to work
  // Set end date based on timer for ms accuracy
  useEffect(() => {
    modalRef.current.showModal();
    setEndDate(Number(startDateRef.current) + Math.round(timer * 1000));
  }, [startDateRef, timer]);

  return (
    <StyledGameOverModal ref={modalRef}>
      {isSubmitted ? (
        <>
          <h1>Success 🌟</h1>
          <h3>
            Your record has been <span>submitted</span>!
          </h3>
          <div className="navigation-btns">
            <Link to="/levels">
              <button>Play Another Level</button>
            </Link>
            <Link to="/leaderboard">
              <button>See Leaderboard</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1>You Made It!</h1>
          <p>Time:</p>
          <span className="result-span">{timer.toFixed(2)} s</span>
          <form id="modal-form" method="post" onSubmit={submitRecord}>
            <label htmlFor="nickname">Nickname:</label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              minLength={1}
              maxLength={16}
              required
            />
          </form>
          <button type="submit" form="modal-form">
            {isSubmitting ? 'Submitting...' : 'Submit Your Score'}
          </button>
        </>
      )}
      {error && (
        <div className="error-message">
          <p>Please try again</p>
          <p>
            Or <Link to="/">go back</Link> to Home page
          </p>
        </div>
      )}
    </StyledGameOverModal>
  );
}

GameOverModal.propTypes = {
  levelId: PropTypes.string,
  startDateRef: PropTypes.object,
  timer: PropTypes.number,
  hintsUsed: PropTypes.bool,
};

export default GameOverModal;
