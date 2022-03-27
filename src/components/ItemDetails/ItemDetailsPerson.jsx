import React from 'react'

export default function ItemDetailsPerson(props) {

    let {personDetails, getDetails, imagePrefix} = props;


  return (
    <>
        <div className='w-25 m-5'>
            <img className='w-100' src={imagePrefix+personDetails.profile_path} alt="" />
            <h3 className='text-center pt-3'>{personDetails.name}</h3>
        </div>
    </>
  )
}
