import React from 'react'
import './css/signup.css'
import './css/container.css'
import {Link} from 'react-router-dom'
import AdminSidebar from '../Components/Admin_Sidebar'

function AdminAccountChoice() {
  return (
    <>
    <AdminSidebar/>
    <center>
      <div className='container'>
        <div className='dashboard'>
        
        <h1 className='txt2'>
               Manage type of Accounts
            </h1>
                <Link to='/admin/account-choice/teacher-accounts'>
                <input type='button' className='big-btn'  value='Teachers' />
                </Link>

                <Link to='/admin/account-choice/student-accounts'>
                <input type='button' className='big-btn' value='Students' />
                </Link>

        </div>
      </div>
    </center>
    </>
  )
}

export default AdminAccountChoice