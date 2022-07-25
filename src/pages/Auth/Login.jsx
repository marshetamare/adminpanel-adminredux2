import React, { useState,useRef } from "react";
import ReactDOM from "react-dom";
import {useSelector, useDispatch} from 'react-redux'
import {loginActions} from '../../Store/Login-slice'
import "./Login.css";
import Axios from 'axios'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import HttpsIcon from '@mui/icons-material/Https';
function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const enteredEmail = emailInputRef.current.value;
    const enterPassword = passwordInputRef.current.value;
    // Find user login info
    //const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    //signin uri=https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcbVNigBQarSp8NzLwjlGLJYqc_RTvC00
    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcbVNigBQarSp8NzLwjlGLJYqc_RTvC00',
    {
      method:'POST',
      body:JSON.stringify(
        {
          email:enteredEmail,
          password:enterPassword,
          returnSecureToken:true,
        }
      ),
      headers:{
        'Content-Type':'application/json',
      }
    }).then((res)=>{
      if(true){
        localStorage.setItem("islog", true);
        dispatch(
            loginActions.loggedIn()
          )
         res.json().then((data)=>{
          console.log(data.refreshToken)
         } );
        alert('you logged in')
      }else{
        res.json().then((data)=>{
          
          console.log(data)
        })
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    })
  }
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    function isUpper(str) {
      return !/[a-z]/.test(str) && /[A-Z]/.test(str);
  }
  // JSX code for login form

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label><MarkEmailReadIcon/> Email </label>
          <input type="text" name="uname" ref={emailInputRef} required />
          
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label><HttpsIcon/> Password </label>
          <input type="password" name="pass" ref={passwordInputRef} required />
          {//isUpper(passwordInputRef.current.value) && <small>your password should include capital letter</small>
          }
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="LoginContainer">
      <div className="login-form">
        <div className="title"><h3>Sign In <ArrowForwardIcon/></h3> </div>
        {!isSubmitted && renderForm}
      </div>
    </div>
  );
}

export default Login;