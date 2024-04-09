import PropTypes from 'prop-types';
import { Outlet, useNavigation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';

function App({ children }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <Theme>
      <GlobalStyle />
      <Header />
      {isLoading ? <h1>Loading...</h1> : <Outlet />}
      {children}
      <Footer />
    </Theme>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
