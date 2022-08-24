import React from 'react'
import './css/form.css'
import studentfeedbacks from './data/student-feedback'
import Sidebar from '../Components/Sidebar'
import './css/container.css'

function Student_Feedback() {


  return (
    <>
     <Sidebar />
    <div className='container'>
    <h2>Feedbacks</h2>
    <br/>
    {studentfeedbacks.map((studentfeedback, index) =>{
      return( 
    <h4 className='info'>Name: {studentfeedback.student_name}
    <br/> Subject:{studentfeedback.subname}
    <br/> Grade/Strand: {studentfeedback.gs}
    </h4> 
    );
    })}

  <form>
    <div class="row">
      <div class="col-75">
      {studentfeedbacks.map((studentfeedback, index) =>{
      return(
        <textarea className='txtarea' readOnly>{studentfeedback.feedback}</textarea>
        );
    })}
        <input type="submit" value="Resolve"/>
      </div>
    </div>
  </form>
  </div>
    </>
  )
}

export default Student_Feedback