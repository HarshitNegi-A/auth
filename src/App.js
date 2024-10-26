import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import LoginContext from './components/store/login-context';

function App() {
  const authcntx=useContext(LoginContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authcntx.isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
        <Route path='/profile'>
        {authcntx.isLoggedIn && <UserProfile />}
        {!authcntx.isLoggedIn && <Redirect to='./auth' />}
        </Route>
        <Route path="*">
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
