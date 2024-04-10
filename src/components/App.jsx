import PropTypes from 'prop-types';
import {
  Outlet,
  useNavigation,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import LoadingPage from './LoadingPage';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';
import { useEffect } from 'react';

function App({ children }) {
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

App.propTypes = {
  children: PropTypes.node,
};

export default App;
