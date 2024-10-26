import { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './AuthForm.module.css';
import LoginContext from '../store/login-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {

  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const [isLoading,setIsLoading]=useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const history=useHistory();

  const authCtx=useContext(LoginContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    
    const enteredEmail=emailInputRef.current.value
    const enteredPassword=passwordInputRef.current.value

    setIsLoading(true)
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc1hoElOXf55Mb8l-jZ0GVGHn5SWBcndc'
    }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc1hoElOXf55Mb8l-jZ0GVGHn5SWBcndc'
    }
    fetch(url,{
      method:'POST',
      body: JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken: true,
      }),
      headers :{
        'Content-Type' : 'application/json'
      }
    }).then(res =>{
      setIsLoading(false)
      if(res.ok){
        return res.json();
      }
      else{
        return res.json().then(data=> {
          let errorMessage='Authetication Failed'
           throw new Error(errorMessage);
        });
      }
    }).then(data =>{
      authCtx.login(data.idToken)
      history.replace('./')
    })
    .catch((err)=>{
      alert(err.message)
    })


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type='submit'>
            {isLogin?'Log In':'Sign Up'}
          </button> }
          {isLoading && <p style={{color:'white'}}>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
