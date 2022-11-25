import React, {useState} from 'react'
// import axios from "axios";
import './Header.css';
import {BsSearch } from 'react-icons/bs';
function Header({handleSearch}) {
  const [search,setSearch]=useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
      // console.log('Submit method');
      // console.log(e.target.searchValue.value)
  }
  return (
    <div className='container'>
        <form onSubmit={handleSubmit} className=" Header_searchbar d-flex justify-content-evenly">
  
            <input type="text"  name = "searchValue" onChange={(e)=>{setSearch(e.target.value)}} className="search_control" placeholder="Search by name, email or role" aria-label="Username" aria-describedby="addon-wrapping"/>
            <button className='searchbtn' onClick={() =>  handleSearch(search)}>Search  <BsSearch /></button>
        </form>
    </div>
  )
}

export default Header