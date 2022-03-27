import React from 'react'

export default function itemDetailsTv(props) {

    let {tvDetails, getDetails, imagePrefix} = props;


  return (
    <>
        <div className='w-25 m-5'>
            <img className='w-100' src={imagePrefix+tvDetails.poster_path} alt="" />
            <h3 className='text-center pt-3'>{tvDetails.name}</h3>
        </div>
    </>
  )
}
