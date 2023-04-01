import React from 'react'
import './css/signup.css'
import './css/container.css'
import {Link} from 'react-router-dom'
import AdminSidebar from '../Components/Admin_Sidebar'

function AdminDashboard() {
  return (
    <>
    <AdminSidebar/>
    <center>
      <div className='container'>
        <div className='dashboard'>
            <h1 className='txt2'>
               Welcome Admin
            </h1>

                <Link to='/admin/teachers-dashboard'>
                <input type='button' className='big-btn'  value='Teachers' />
                </Link>

                <Link to='/admin/students-dashboard'>
                <input type='button' className='big-btn' value='Students' />
                </Link>

                <Link to='/admin/subjects-dashboard'>
                <input type='button' className='big-btn' value='Subjects' />
                </Link>

        </div>
      </div>
    </center>
    </>
  )
}

export default AdminDashboard