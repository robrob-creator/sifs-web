import React from 'react'
import './css/container.css'
import './css/table.css'
import './css/icons.css'
import AdminSidebar from '../Components/Admin_Sidebar'
import subjects from './data/subjects'
import * as MdIcons from 'react-icons/md';
import {Link} from 'react-router-dom'

function AdminStudentInfo() {
  return (
    <>
    <AdminSidebar/>
    <div className='container'>   
    <div className='con'>
    <h2 className='t-name'>Camral, Charles Emanuel</h2>
    <div className='con-tab'>
    <h3 className='t-sub'>Subjects</h3>
    <table className='tbl-tch'>
            <thead>
            <th>Subject Name</th>
            <th>Units</th>
            <th>Quarter</th>
            <th className='del-col'>Delete</th>
            </thead>

            <tbody>
            {subjects.map((sub, index) =>{
              return( 
            <tr>
                 <td data-label="Subject Name">
                    {sub.subname}
                </td>
                <td data-label="Units">
                    24
                </td>
                <td data-label="Quarter">
                <select className='sel quart'>
                    <option value='First'>First</option>
                    <option value='Second'>Second</option>
                    <option value='Third'>Third</option>
                    <option value='Fourth'>Fourth</option>
                </select>
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

export default AdminStudentInfo