import React from 'react'
import './css/container.css'
import './css/table.css'
import './css/icons.css'
import AdminSidebar from '../Components/Admin_Sidebar'
import {Link} from 'react-router-dom'

function AdminTeacherAccountsEdit() {
  return (
    <>
    <AdminSidebar/>
    
    <div className='container'>  
    <h1>Edit Account</h1> 
    <div className='con'> 
    <h3 className='t-sub'>D. David Account</h3>

    <form >
      <div className="form-inline">
      <input type="text" id="idnum" value="1122334" name="idnum" disabled/>
      <input type="text" id="username" placeholder="Username" value="david" name="username" required="required"/>
      <input type="text" id="pswd" placeholder="Password" value="opaw" name="pswd" required="required"/>
      </div>
    
         <div className='row2'>
           <div className='column mar'>
           <Link to='#'>
               <button className='add-btn grn' type="submit">Submit</button>
               </Link>
               <Link to='/admin/teacher-info'>
               <input type='button' className='add-btn red'  value='Cancel' />
               </Link>
           </div>
         </div>
    </form>
    </div>

    </div>

    </>
  )
}

export default AdminTeacherAccountsEdit