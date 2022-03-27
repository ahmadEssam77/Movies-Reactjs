import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Tv from './components/Tv/Tv';
import People from './components/People/People';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import NotFound from './components/NotFound/NotFound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Test from './components/Test/Test';
import axios from 'axios';
import ItemDetails from './components/ItemDetails/ItemDetails';
import ItemDetailsTv from './components/ItemDetails/ItemDetailsTv';
import ItemDetailsPerson from './components/ItemDetails/ItemDetailsPerson';


function App() {

  // For Authenticatio and Token
  let [userInfo, setUserInfo] = useState('');
  let navigate = useNavigate();

  // Receiving all data from API and add them in this array (one array for all)
  const [dataFromAPIInMyArr, setDataFromAPIInMyArr] = useState([]);
  const [checkWhichOne, setCheckWhichOne] = useState([]);  // To show which option the user select, popular movie or top reated movie ...

  let imagePrefix = 'https://image.tmdb.org/t/p/w500'; // Movie original DB website to show images.

  let [movieDetails, setMovieDetails] = useState({}); // To receive the details of a movie.
  let [tvDetails, setTvDetails] = useState({}); // To receive the details of a tv show.
  let [personDetails, setPersonDetails] = useState({}); // To receive the details of a movie.

  // Get token
  function getKharaTokenInfo() {
    if (localStorage.getItem('userToken')) {
      console.log(`fi token yasta`);
      let decodeToken = jwtDecode(localStorage.getItem('userToken'));
      setUserInfo(decodeToken);
    }
    else {
      console.log('mfesh token yasta');
    }
  }

  // Get API Data
  async function getAPIData(type, whichOne, checkWhichOne) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${whichOne}?api_key=5779ac683b951c80ce4de563099a2934&language=en-US&page=1`);
    setDataFromAPIInMyArr(data.results);
    setCheckWhichOne(checkWhichOne);
  }

  // Get movie details
  async function getDetails(type, id, callback) {
    let {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=5779ac683b951c80ce4de563099a2934&language=en-US`);
    callback(data);
  }

  useEffect(()=> {
    getKharaTokenInfo();
    getAPIData('movie', 'now_playing', 'Now Playing');
  }, []);

  // logout
  function logout() {
    localStorage.removeItem('userToken');
    setUserInfo('');
    navigate('/login');
  }

  return (
    <>
      <Navbar khara={userInfo} logout={logout} getAPIData={getAPIData} />
      <Routes>
        <Route path='/' element={<ProtectedRoutes />} >
          <Route path='/' element={<Home dataFromAPIInMyArr={dataFromAPIInMyArr} checkWhichOne={checkWhichOne}  imagePrefix={imagePrefix} getDetails={getDetails} setMovieDetails={setMovieDetails} />} />
        </Route>
        <Route path='/tvs' element={<ProtectedRoutes />} >
          <Route path='/tvs' element={<Tv dataFromAPIInMyArr={dataFromAPIInMyArr} checkWhichOne={checkWhichOne} imagePrefix={imagePrefix} getDetails={getDetails} setTvDetails={setTvDetails} />} />
        </Route>
        <Route path='/people' element={<ProtectedRoutes />} >
          <Route path='/people' element={<People dataFromAPIInMyArr={dataFromAPIInMyArr} imagePrefix={imagePrefix} getDetails={getDetails} setPersonDetails={setPersonDetails} />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login getKharaTokenInfo={getKharaTokenInfo} />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/test' element={<Test />} />
        <Route path='/details' element={<ItemDetails getDetails={getDetails} movieDetails={movieDetails} imagePrefix={imagePrefix} />} />
        <Route path='/detailsTv' element={<ItemDetailsTv getDetails={getDetails} tvDetails={tvDetails} imagePrefix={imagePrefix} />} />
        <Route path='/detailsPerson' element={<ItemDetailsPerson getDetails={getDetails} personDetails={personDetails} imagePrefix={imagePrefix} />} />
        {/* <Route path='/details/:movieId' element={<ItemDetails getDetails={getDetails} movieDetails={movieDetails} imagePrefix={imagePrefix} />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );

}

export default App;
