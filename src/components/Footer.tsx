import { StyledFooter } from '../styles/Footer.styled';

export default function Footer() {
  return (
    <StyledFooter>
      <p>
        created by <span>dziubenzo</span>
      </p>
      <a
        href="https://github.com/dziubenzo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Developer's GitHub page, opens in new tab"
      >
        <img src="/github-logo.svg" alt="GitHub Logo" />
      </a>
    </StyledFooter>
  );
}
