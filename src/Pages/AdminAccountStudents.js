import React from 'react'
import {Link} from 'react-router-dom'
import './css/container.css'
import './css/table.css'
import './css/icons.css'
import AdminSidebar from '../Components/Admin_Sidebar'
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';


function AdminAccountStudents() {
  return (
    <>
    <AdminSidebar/>
    <div className='container'>
    <div className='row'>
      <h1>
         Students Accounts 
        </h1>
      </div>
        <table>
            <thead>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Password</th>
                <th>Edit / Delete</th>
            </thead>

            <tbody>
              <tr>
                <td data-label="Student ID">1122334455</td>
                <td data-label="Student Name">Lola Flora</td>
                <td data-label="Password">I_Love_My_Apo_Cardo</td>
                <td data-label="Edit / Delete">

                <Link to='/admin/account-choice/student-accounts/edit'>
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

export default AdminAccountStudents