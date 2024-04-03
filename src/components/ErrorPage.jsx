import { useRouteError } from 'react-router-dom';
import { StyledErrorPage } from '../styles/ErrorPage.styled';

function ErrorPage() {
  const error = useRouteError();

  return (
    <StyledErrorPage>
      <img src="/sad-face.svg" alt="Sad Emoticon" />
      <h2>{error.status}</h2>
      <h1>{error.statusText}</h1>
      <h3>{error.data || error.message}</h3>
    </StyledErrorPage>
  );
}

export default ErrorPage;
