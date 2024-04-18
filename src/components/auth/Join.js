import React from 'react'
import main from './main.css'
import Navbar from './Navbar'
const join = () => {
  return (
    <div>
       <Navbar/>    
    <div className='container-join'>
        <p>Enter code class to Join !</p>
        <input type='text' placeholder='code class' className='input'></input>
        <button>Join</button>
    </div>
    </div>
  )
}

export default join
