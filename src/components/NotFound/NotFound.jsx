import React from 'react';
import { useNavigate } from 'react-router-dom';
import pic from './notFoundThinking.gif';


export default function NotFound() {

  const navigate = useNavigate();

  return (
    <div className='w-50 mt-5 mx-auto text-center'>
        <p>Page is not found</p>
        <img className='w-50' src={pic} alt="" />
        <button className='btn btn-primary d-block mt-3 mx-auto' onClick={()=> navigate('/')}>Home</button>
    </div>
  )
}
