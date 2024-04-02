import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Router from './Router';
import Theme from './Theme';
import GlobalStyle from '../styles/GlobalStyle';

function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Header />
      <Router>
        <Outlet />
      </Router>
      <Footer />
    </Theme>
  );
}

export default App;
