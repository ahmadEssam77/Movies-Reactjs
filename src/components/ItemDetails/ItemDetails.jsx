import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

export default function ItemDetails(props) {

    // let {movieId} = useParams();
    let {movieDetails, getDetails, imagePrefix} = props;

    useEffect(()=> {
        // getDetails('movie', movieDetails.id, setMovieDetails);
    }, []);

  return (
    <>
        <div className='w-25 m-5'>
            <img className='w-100' src={imagePrefix+movieDetails.poster_path} alt="" />
            <h3 className='text-center pt-3'>{movieDetails.title}</h3>
        </div>
    </>
  )
}
