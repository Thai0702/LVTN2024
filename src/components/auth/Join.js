import React from 'react'
import Navbar from './Navbar'
import './main.css'
const join = () => {
  return (
    <div>
       <Navbar/>    
    <div className='container-join'>
        <p>Enter code class to Join !</p>
        <input type='text' placeholder='code class' className='input'></input>
        <button className='button-join'>Join</button>
    </div>
    </div>
  )
}

export default join
