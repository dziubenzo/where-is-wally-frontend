import styled from 'styled-components';
import { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {opacity: 1;}
  100% {opacity: 0;}
`;

export const StyledLoadingPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  animation: ${pulse} 1.5s ease-in infinite alternate;

  img {
    width: 50%;
    border-radius: 50%;
  }

  @media (width <= ${(props) => props.theme.mobile}) {
    img {
      width: 75%;
    }
  }
`;
