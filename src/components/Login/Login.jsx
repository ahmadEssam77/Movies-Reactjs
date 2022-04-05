import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authentication } from '../Firebase/Firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";


export default function Login(props) {

  const BASE_URL = `https://route-egypt-api.herokuapp.com/`;
  const [isLoading, setIsLoading] = useState(false);
  const [errorAPI, setErrorAPI] = useState('');
  const [validateError, setValidateError] = useState('');

  let navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });

  function getUserLoginData({target}) {
    let name = target.name;

    let myUserLogin = {...userLogin};
    myUserLogin[name] = target.value;
    setUserLogin(myUserLogin);
  }

  async function loginFun(e) {
    e.preventDefault();
    setIsLoading(true);

    let validateRes = validateLoginData();

    if (validateRes.error) {
      setIsLoading(false);
      setValidateError(validateRes.error.message);
      setTimeout(()=> {
        setValidateError('');
      }, 5000);
    }
    else {
      let {data} = await axios.post(`${BASE_URL}signin`, userLogin);

      if (data.message === 'success') {
        setIsLoading(false);
        localStorage.setItem('userToken', data.token);
        props.getKharaTokenInfo();
        navigate('/');  // Navigate to home
      }
      else {
        setIsLoading(false);
        setTimeout(() => {
          setErrorAPI('');
        }, 5000);
        setErrorAPI(data.message);
      }
    }
  }

  function validateLoginData() {
    let scheme = Joi.object({
      email: Joi.string().email({tlds: {allows: ['com', 'ok']}}).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    return scheme.validate(userLogin, {abortEarly: false});
  }

  // Google Sign-In
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
    .then(({_tokenResponse}) => {
      localStorage.setItem('userToken', _tokenResponse.idToken);
      props.getKharaTokenInfo();
      navigate('/');  // Navigate to home
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  function signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
    .then(({_tokenResponse}) => {
      localStorage.setItem('userToken', _tokenResponse.idToken);
      props.getKharaTokenInfo();
      navigate('/');  // Navigate to home
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  return (
    <>
      <form action="" className='w-50 mt-5 mx-auto' onSubmit={loginFun}>
          <input type="email" onChange={getUserLoginData} className='form-control mb-2' name="email" placeholder='Email' />
          <input type="password" onChange={getUserLoginData} className='form-control mb-2' name="password" placeholder='Password' />
          {isLoading ? <button className='btn btn-outline-warning form-control mt-3' type="submit"><i className="fa-solid fa-circle-notch fa-spin"></i></button> : <button className='btn btn-outline-warning form-control mt-3' type="submit">Log In</button> }
      </form>
      <div className='w-50 mx-auto'>
        <button className='btn btn-outline-danger form-control mt-3' onClick={signInWithGoogle} >Login with google</button>
      </div>
      <div className='w-50 mx-auto'>
        <button className='btn btn-outline-info form-control mt-3' onClick={signInWithFacebook} >Login with facebook</button>
      </div>

      {errorAPI? <div className='w-50 mt-5 m-auto p-2 alert alert-danger text-center'>{errorAPI}</div>: ''}
      {validateError? <div className='w-50 mt-5 m-auto p-2 alert alert-danger text-center'>{validateError}</div>: ''}
    </>
  )
}
