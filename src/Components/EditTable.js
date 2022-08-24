import React from 'react'
import * as GiIcons from 'react-icons/gi'
import * as FaIcons from 'react-icons/fa';


function EditTable({editFormData, EditFormChange, CancelClick}){
  return (
    <tr>
        <td>
          <input
          className='cursor inputTable'
          type="text"
          name="student_id"
          value={editFormData.student_id}
          onChange={EditFormChange}
          readOnly
        ></input>
        </td>

        <td>
          <input
          className='cursor inputTable'
          type="text"
          name="student_name"
          value={editFormData.student_name}
          onChange={EditFormChange}
          readOnly
        ></input>
        </td>

        <td>
        <input
          className='inputTable'
          type="number"
          required="required"
          placeholder="Input Grade..."
          name="first"
          max="100"
          value={editFormData.first}
          onChange={EditFormChange}
        ></input>
        </td>

        <td>
        <input
        className='inputTable'
          type="number"
          required="required"
          placeholder="Input Grade..."
          name="second"
          max="100"
          value={editFormData.second}
          onChange={EditFormChange}
        ></input>
        </td>

        <td>
          <input
          className='cursor inputTable'
          type="text"
          name="remarks"
          value={editFormData.remarks}
          onChange={EditFormChange}
          readOnly
        ></input></td>

        <td>
        <button className='icons-grn' type="submit"><FaIcons.FaSave/></button>
        <button className='icons-red'type="button" onClick={CancelClick}>
        <GiIcons.GiCancel/>
        </button>
      </td>
      </tr>
  )
}

export default EditTable