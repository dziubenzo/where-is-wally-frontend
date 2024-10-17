import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ApiError } from '../helpers';
import { StyledErrorPage } from '../styles/ErrorPage.styled';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <StyledErrorPage>
        <img src="/sad-face.svg" alt="Sad Emoticon" />
        <h2>{error.status}</h2>
        <h1>{error.statusText}</h1>
        <h3>{error.data}</h3>
      </StyledErrorPage>
    );
  } else if (error instanceof ApiError) {
    return (
      <StyledErrorPage>
        <img src="/sad-face.svg" alt="Sad Emoticon" />
        <h2>{error.status}</h2>
        <h1>{error.message}</h1>
      </StyledErrorPage>
    );
  } else if (error instanceof Error) {
    return (
      <StyledErrorPage>
        <img src="/sad-face.svg" alt="Sad Emoticon" />
        <h2>Something went wrong.</h2>
        <h3>{error.message}</h3>
      </StyledErrorPage>
    );
  } else {
    return (
      <StyledErrorPage>
        <img src="/sad-face.svg" alt="Sad Emoticon" />
        <h2>Something went wrong.</h2>
        <h3>Please try again.</h3>
      </StyledErrorPage>
    );
  }
}
