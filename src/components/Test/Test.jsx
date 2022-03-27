import React, { useEffect, useState } from 'react'

export default function Test() {

    // const [o, setO] = useState('');

    // useEffect(()=> {
    //     setO({
    //         id: 5,
    //         name: 'ali'
    //     });
    // }, []);

    // const [arr, setArr] = useState([]);

    // function changeArrVal() {
    //   let newArr = ['a', 'b', 'c'];
    //   setArr(newArr);
    //   console.log(`Arr before update => ${arr}`);
    //   console.log(`Arr after update => ${arr}`);
    // }

    // useEffect(()=> {
    //   changeArrVal();
    // }, []);

  return (
    <div>
        <h2>Show result:</h2>
        {/* <h5>My array values are: {arr}</h5> */}
        {/* <h5>{o.name}</h5> */}
    </div>
  )
}
