import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import LoginContext from '../store/login-context';

const ProfileForm = () => {
  const newPasswordInputRef=useRef()
  const authCntx=useContext(LoginContext);

  const handleChangePassword=(e)=>{
    e.preventDefault();

    const enteredNewPassword=newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAc1hoElOXf55Mb8l-jZ0GVGHn5SWBcndc',{
      method:'POST',
      body: JSON.stringify({
        idToken:authCntx.token,
        password:enteredNewPassword,
        returnSecureToken:false,
      }),
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then((res)=>{

    })

  }


  return (
    <form className={classes.form} onSubmit={handleChangePassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input minLength="7" type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
