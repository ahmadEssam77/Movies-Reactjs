import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function People(props) {

  useEffect(()=>{
    // props.getPopularPeople();
  }, []);

  return (
    <>
      <div className="container">
        <div className="wrapper pt-5 d-flex">
          <div className="left col-md-3">
            <h2>People</h2>
          </div>
          <div className="right">
            <div className="row">
              {props.dataFromAPIInMyArr.map((pel, index)=> 
              <div key={index} className='col-md-3'>
                <Link to='/detailsPerson' onClick={()=> props.getDetails('person', pel.id, props.setPersonDetails)}>
                  <img className='w-100' role='button' src={props.imagePrefix+pel.profile_path} alt="" />
                </Link>
                <h5>{pel.name}</h5> 
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
