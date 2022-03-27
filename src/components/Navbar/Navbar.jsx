import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Navbar/Navbar.module.css';

export default function Navbar(props) {

  let token = props.khara;

  return (
    <>
      <nav>
        <div className="container d-flex justify-content-between pt-3 align-items-center">
          <ul className='d-flex list-unstyled align-items-center'>
            <li className='pe-3'><i className="fa-solid fa-film"></i></li>
            {token?   <>
                        <li className={style.main_select_tabs + ' ps-3 position-relative'}>
                          Movies
                          <ul className={style.select_popup_style + ' list-unstyled position-absolute '}>
                            <li>
                              <Link to='/' className={style.black} onClick={()=> props.getAPIData('movie', 'popular', 'Popular')} >Popular</Link>
                            </li>
                            <li>
                              <Link to='/' className={style.black} onClick={()=> props.getAPIData('movie', 'now_playing', 'Now Playing')} >Now Playing</Link>
                            </li>
                            <li>
                              <Link to='/' className={style.black} onClick={()=> props.getAPIData('movie', 'upcoming', 'Upcoming')} >Upcoming</Link>
                            </li>
                            <li>
                              <Link to='/' className={style.black} onClick={()=> props.getAPIData('movie', 'top_rated', 'Top Rated')} >Top Rated</Link>
                            </li>
                          </ul>
                        </li>
                        <li className={style.main_select_tabs + ' ps-3 position-relative'}>
                          Tv Shows
                          <ul className={style.select_popup_style + ' list-unstyled position-absolute '}>
                            <li>
                              <Link to='/tvs' className={style.black} onClick={()=> props.getAPIData('tv', 'popular', 'Popular')} >Popular</Link>
                            </li>
                            <li>
                              <Link to='/tvs' className={style.black} onClick={()=> props.getAPIData('tv', 'airing_today', 'Airing Today')} >Airing Today</Link>
                            </li>
                            <li>
                              <Link to='/tvs' className={style.black} onClick={()=> props.getAPIData('tv', 'on_the_air', 'On The Air')} >On TV</Link>
                            </li>
                            <li>
                              <Link to='/tvs' className={style.black} onClick={()=> props.getAPIData('tv', 'top_rated', 'Top Rated')} >Top Rated</Link>
                            </li>
                          </ul>
                        </li>
                        <li className={style.main_select_tabs + ' ps-3 position-relative'}>
                          People
                          <ul className={style.select_popup_style + ' list-unstyled position-absolute ' + style.select_popup_people}>
                            <li>
                              <Link to='/people' className={style.black} onClick={()=> props.getAPIData('person', 'popular')}>Popular People</Link>
                            </li>
                          </ul>
                        </li> 
                        {/* <li className='ps-3'><Link to='/test'>Test</Link></li>  */}
                      </> : ''
            }
          </ul>
          <ul className={style.social_icons + ' d-flex list-unstyled align-items-center social_icons'}>
            <li className='ps-3'><a href="https://www.facebook.com/themoviedb/" target='_blank' rel='noopener noreferrer'><i className='fab fa-facebook'></i></a></li>
            <li className='ps-3'><a href="https://www.themoviedb.org/movie/388757" target='_blank' rel='noopener noreferrer'><i className='fa-brands fa-tiktok'></i></a></li>
            <li className='ps-3'><a href="https://twitter.com/themoviedb?lang=en" target='_blank' rel='noopener noreferrer'><i className='fab fa-twitter'></i></a></li>
            <li className='ps-3 me-4'><a href="https://ca.linkedin.com/company/themoviedb.org" target='_blank' rel='noopener noreferrer'><i className='fab fa-linkedin-in'></i></a></li>
            {token? <li>Hello {token.first_name}</li> : ''}
            {token? '' : <li className='ps-3'><Link to='/register'>Signup</Link></li>}
            {token? '' : <li className='ps-3'><Link to='/login'>Login</Link></li>}
            {token? <li className='ps-3' onClick={props.logout}>Logout</li> : ''}
          </ul>
        </div>
      </nav>
    </>
  )
}
