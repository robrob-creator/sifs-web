import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import * as CgIcons from 'react-icons/cg';
import profile from '../Pages/data/profile';
import logo from './images/logo.png';


function Sidebar() {
  return (
    <>
      <div class="sidebar">
      <header>
        <img src={logo} alt='cabulohan-paradise-logo' className='image'/>
      {profile.map((profiles, index) =>{
      return( 
        <p className='parag'>
        Student Name: {profiles.teacher}<br/>
        Grade: {profiles.grade}<br/>
        Strand: {profiles.strand}<br/>
        Section: {profiles.section}<br/>
        </p>
      );    
    })}

    </header>

      <Link to="/" >
         <CgIcons.CgLogOut className='icons'/>
        <span>Logout</span>
      </Link>
    </div>
    
    </>
  )
}

export default Sidebar