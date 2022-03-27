import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const BASE_URL = `https://route-egypt-api.herokuapp.com/`;
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');  // API message
  const [error, setError] = useState('');      // API message
  const [validateMess, setValidateMess] = useState('');  // validate message

  let navigate = useNavigate(); // React router dom library, programmatic navigation

  const [user, setUser] = useState({ // create user
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    age:0
  });

  function getUserData({target}) {
    let name = target.name;

    let myUser = {...user};  // new copy (deep clone)
    myUser[name] = target.value;
    setUser(myUser);
  }

  async function sendUserDataToApi(e) {  // sending data to API, async and await because its takes time
    e.preventDefault();
    let validationRes = validateUser();

    if (validationRes.error) {
      setValidateMess(validationRes.error.message);
      setTimeout(() => {
        setValidateMess('');  // react router dom library
      }, 5000);
    }
    else {
      setIsLoading(true);
      let {data} = await axios.post(`${BASE_URL}signup` , user);
      if (data.message === 'success') {
        setIsLoading(false);
        setMessage('Registration process done');
        setTimeout(() => {
          navigate('/login');  // react router dom library
        }, 3000);
      }
      else {
        setIsLoading(false);
        setError(data.errors.email.message);  // get the message from API
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }    
  }

  function validateUser() {  // Validation with Joi library
      let scheme = Joi.object({
        first_name: Joi.string().regex(/^[a-zA-Z]{3,20}$/).min(2).max(30).required(),
        last_name: Joi.string().regex(/^[a-zA-Z]{3,20}$/).min(2).max(30).required(),
        age: Joi.number().min(16).max(90).required(),
        email: Joi.string().email({tlds: {allow: ['com', 'ok']}}).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,20}$')).required()
      });

      return scheme.validate(user, {abortEarly: false});
  }

  // 6. Protection or guard
  // 7. get movies
;
  return (
    <>
      <form onSubmit={sendUserDataToApi} className='w-50 mt-5 mx-auto'>
          <input type="text" onChange={getUserData} className='form-control mb-2' name="first_name" placeholder='FirstName' />
          <input type="text" onChange={getUserData} className='form-control mb-2' name="last_name" placeholder='LastName' />
          <input type="number" onChange={getUserData} className='form-control mb-2' name="age" placeholder='age' />
          <input type="email" onChange={getUserData} className='form-control mb-2' name="email" placeholder='Email' />
          <input type="password" onChange={getUserData} className='form-control mb-2' name="password" placeholder='Password' />
          {isLoading? <div className='btn btn-outline-info form-control mt-3'><i className="fa-solid fa-circle-notch fa-spin"></i></div> : <button className='btn btn-outline-info form-control mt-3' type="submit">Sign Up</button>}
      </form>

      { message ? <div className='w-50 mt-5 p-3 rounded mx-auto text-center alet alert-success'>{message}</div> : '' }

      { error ? <div className='w-50 mt-5 p-3 rounded mx-auto text-center alet alert-danger'>{error}</div> : '' }

      { validateMess ? <div className='w-50 mt-5 p-3 rounded mx-auto text-center alet alert-danger'>{validateMess}</div> : '' } 
      
    </>
  )
}
