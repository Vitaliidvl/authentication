import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';
import { API_KEY } from '../../api-key';
import AuthContex from '../../store/auth-contex';

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContex);
  const newPasswordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
        API_KEY,
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      //assumption: Always succeds!
      history.replace('/');
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
