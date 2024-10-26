import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import LoginContext from '../store/login-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainNavigation = () => {
  const authCtx=useContext(LoginContext);
  const history=useHistory()
  const isLoggedIn=authCtx.isLoggedIn;

  const handleLogout=()=>{
    authCtx.logout();
    history.replace("./auth")
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn &&  <li>
            <Link to='/profile'>Profile</Link>
          </li>}
         {isLoggedIn &&  <li>
            <button onClick={handleLogout}>Logout</button>
          </li>}
         
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
