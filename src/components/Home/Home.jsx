import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {


  return (
    <>
      <div className="container">
        <div className="wrapper pt-5 d-flex">
          <div className="left col-md-3">
            <h2>{props.checkWhichOne} Movies</h2>
          </div>
          <div className="right">
            <div className="row">
              {props.dataFromAPIInMyArr.map((movie, index)=>
              <div key={index} className='col-md-3'>
                <Link to='/details' onClick={()=> props.getDetails('movie', movie.id, props.setMovieDetails)}>
                  <img className='w-100' role="button" src={props.imagePrefix+movie.poster_path} alt="" />  {/*role="button" it's a bootstrap attribute to implement cursor pointer effect*/}
                </Link>
                <h5>{movie.title}</h5> 
              </div>)}
            </div>
            <div>
              <button className='btn btn-primary form-control my-4'>Load More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
