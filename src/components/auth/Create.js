import React from 'react'
import Navbar from './Navbar'
import './main.css'
const Create = () => {
  return (
    <div>
      <Navbar />
      <div className='container-create'>
        <p >Create class!</p>
        <input type='text' placeholder='Class name' className='input'></input>
        <input type='text' placeholder='Create by' className='input'></input>
        <input type='text' placeholder='Year' className='input'></input>       
        <input type='date' placeholder='Create date' className='input'></input>
        <input type='text' placeholder='Number group' className='input'></input>
        <input type='text' placeholder='Number person of group' className='input'></input>
        <select  className='input'>
                <option value='student'>Sinh viên tự chọn nhóm</option>
                <option value='teacher'>Giảng viên chọn nhóm</option>
                <option value='random'>Random nhóm</option>
            </select>
        <button className='button-create'>Create</button>
      </div>
    </div>
  )
}

export default Create
