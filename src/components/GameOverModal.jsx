import PropTypes from 'prop-types';
import { StyledGameOverModal } from '../styles/LevelPage.styled';
import { useRef, useEffect } from 'react';

function GameOverModal(props) {
  const modalRef = useRef(null);

  // Show modal for the backdrop pseudo element to work
  useEffect(() => {
    modalRef.current.showModal();
  });

  return (
    <StyledGameOverModal ref={modalRef}>
      <h1>You Made It!</h1>
      <p>Your Time:</p>
      <span>123 s</span>
      <form id="modal-form" method="post">
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
        Submit Your Score
      </button>
    </StyledGameOverModal>
  );
}

GameOverModal.propTypes = {};

export default GameOverModal;
