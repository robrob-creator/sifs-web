import React from 'react'
import './css/container.css'
import './css/table.css'
import './css/icons.css'
import AdminSidebar from '../Components/Admin_Sidebar'
import subjects from './data/subjects'
import * as MdIcons from 'react-icons/md';
import {Link} from 'react-router-dom'

function AdminTeacherAdd() {
  return (
    <>
    <AdminSidebar/>
    
    <div className='container'>  
    <h1>Add Teacher</h1> 
    <div className='con'> 
    <h3 className='t-sub'>Teachers Info</h3>

    <form >
      <div className="form-inline">
      <input type="text" id="fname" placeholder="First Name" name="fname" required="required"/>
      <input type="text" id="lname" placeholder="Last Name" name="lname" required="required"/>
      <input type="text" id="mname" placeholder="Middle Name" name="mname" required="required"/>
      <input type="text" id="suffix" placeholder="Suffix" name="suffix"/>
      <input type="text" id="username" placeholder="Username" name="username" required="required"/>
      <input type="password" id="pswd" placeholder="Password" name="pswd" required="required"/>
      </div>
    
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
                    <td className='.del-col' data-label="Subject">
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

export default AdminTeacherAdd