import type { ReactNode } from 'react';
import { useEffect } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from './Footer';
import Header from './Header';
import LoadingPage from './LoadingPage';
import Theme from './Theme';

type AppProps = {
  children?: ReactNode;
};

export default function App({ children }: AppProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  // Redirect to '/home' when at '/' to avoid the white screen of death witnessed when a loader was used at '/'
  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    }
  }, []);

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Outlet />
          {children}
        </>
      )}
      <Footer />
    </Theme>
  );
}
