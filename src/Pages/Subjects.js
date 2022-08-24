import React from 'react'
import './css/table.css'
import {Link} from 'react-router-dom'
import subjects from './data/subjects'
import Sidebar from '../Components/Sidebar'
import './css/container.css'

function Subjects() {


  return (
    <>
    <Sidebar />
    <div className='container'>
    <h2>Subjects</h2>
    <table>
  <thead>
      <th >Subject Name</th>
      <th >Grade / Strand</th>
      <th >View</th>
  </thead>
  <tbody>
    {subjects.map((subject, index) =>{
      return( 
      <tr>
        <td data-label="Subject Name">{subject.subname}</td>
        <td data-label="Grade / Strand">{subject.gs}</td>
        <td data-label="View"><Link className='link' to={subject.path}>
        <input type='button' class="btn" value='View' />
        </Link></td>
      </tr>

      );
    })}
   
  </tbody>
</table>
</div>
    </>
  )
}

export default Subjects