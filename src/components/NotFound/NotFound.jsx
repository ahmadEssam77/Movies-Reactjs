import React from 'react';
import pic from './notFoundThinking.gif';

export default function NotFound() {
  return (
    <div className='w-50 mt-5 mx-auto text-center'>
        <p className='pb-4'>Page is not found</p>
        <img className='w-50' src={pic} alt="" />
    </div>
  )
}
