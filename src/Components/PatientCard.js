import React from 'react'

const DoctorCard = ({data , onEdit , onDelete}) => {
  return (
    <div className='patient-card'>

        <p>
            <span>Patient Name : </span>
            {data.Name}
        </p>

        <p>
            <span>Patient Age: </span>
            {data.Age}
        </p>

        <p>
            <span>Patient Gender: </span>
            {data.Gender}
        </p>


        <div className='btn-container'>
        <button onClick={()=>onEdit(data)}> Edit </button>
        <button onClick={()=>onDelete(data._id)}> Delete </button>

        </div>
    </div>
  )
}

export default DoctorCard