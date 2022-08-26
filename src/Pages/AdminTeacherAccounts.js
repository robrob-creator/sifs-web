import React from 'react'
import './css/container.css'
import './css/table.css'
import './css/icons.css'
import AdminSidebar from '../Components/Admin_Sidebar'
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import { Link } from 'react-router-dom'


function AdminTeacherAccounts() {
  return (
    <>
    <AdminSidebar/>
    <div className='container'>
      <div className='row'>
        <div className='column'>
      <h1>
         Teachers Accounts
        </h1>
        </div>
      </div>
        
        <table>
            <thead className='thead'>
                <th>ID No.</th>
                <th>Teacher Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Edit / Delete</th>
            </thead>

            <tbody>
              <tr>
                <td data-label="ID No.">111222333</td>
                <td data-label="Teacher Name">David John David</td>
                <td data-label="Username">David</td>
                <td data-label="Password">Opaw</td>
                <td data-label="Edit / Delete">
                
                <Link to='/admin/account-choice/teacher-accounts/edit'>
                <button className='icons-grn'>
                <FaIcons.FaEdit/>
                </button>
                </Link>
                <Link to='#'>
                <button className='icons-red'>
                <MdIcons.MdDelete />
                </button>
                </Link>
                
                </td>
              </tr>
            </tbody>
        </table>

    </div>
    </>
  )
}

export default AdminTeacherAccounts