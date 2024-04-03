import styled from 'styled-components';

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 2em;

  img[alt='GitHub Logo'] {
    height: 32px;
  }

  @media (hover: hover) {
    img[alt='GitHub Logo'] {
      transition: transform 0.5s ease-in;

      &:hover {
        transform: rotate(360deg);
      }
    }
  }
`;
