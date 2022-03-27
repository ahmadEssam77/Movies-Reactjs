import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Tv(props) {

  // useEffect(()=>{
  //   props.getTvs();
  //   props.getAPIData('tv', 'popular', propssetTvPopular);
  // }, []);

  return (
    <>
      <div className="container">
        <div className="wrapper pt-5 d-flex">
          <div className="left col-md-3">
          <h2>{props.checkWhichOne} Tvs</h2>
          </div>
          <div className="right">
            <div className="row">
              {props.dataFromAPIInMyArr.map((tv, index)=> 
              <div key={index} className='col-md-3'>
                <Link to='/detailsTv' onClick={()=> props.getDetails('tv', tv.id, props.setTvDetails)}>
                  <img className='w-100' role='button' src={props.imagePrefix+tv.poster_path} alt="" />
                </Link>
                <h5>{tv.name}</h5> 
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
