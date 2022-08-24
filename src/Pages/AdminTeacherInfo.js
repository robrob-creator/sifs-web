import React from 'react'
import './css/container.css'
import './css/table.css'
import './css/icons.css'
import AdminSidebar from '../Components/Admin_Sidebar'
import subjects from './data/subjects'
import * as MdIcons from 'react-icons/md';
import {Link} from 'react-router-dom'

function AdminTeacherInfo() {
  return (
    <>
    <AdminSidebar/>
    <div className='container'>   
    <h2>Teacher Info</h2> 
    <div className='con'>
    <h2 className='t-name'>Belderol, John Dale </h2>
    <div className='con-tab'>
    <h3 className='t-sub'>Subjects</h3>
    <table className='tbl-tch'>
            <thead>
            <th>Subject Name</th>
            <th className='del-col'>Delete</th>
            </thead>

            <tbody>
            {subjects.map((sub, index) =>{
              return( 
            <tr>
                 <td data-label="Subject">
                    {sub.subname}
                </td>
                <td data-label="Delete">
                <MdIcons.MdDelete className='icons-red'/>
                </td>
            </tr>
            );
        })}
            </tbody>
    </table>
    </div>
      <div className='row2'>
        <div className='column'>
          <select className='sel'>
            <option value='IPT2'>IPT2</option>
            <option value='IPT2'>IPT2</option>
            <option value='IPT2'>IPT2</option>
          </select>
            <Link to='/admin/teacher-info'>
            <input type='button' className='add-btn'  value='Add Subject' />
            </Link>
        </div>
        <div className='column mar'>
        <Link to='/admin/teacher-info'>
            <input type='button' className='add-btn grn'  value='Submit' />
            </Link>
            <Link to='/admin/teacher-info'>
            <input type='button' className='add-btn red'  value='Cancel' />
            </Link>
        </div>
      </div>
    
    </div>

    </div>

    </>
  )
}

export default AdminTeacherInfo