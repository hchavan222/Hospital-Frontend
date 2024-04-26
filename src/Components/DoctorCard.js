import React from 'react'

const DoctorCard = ({data , onEdit , onDelete}) => {
  return (
    <div className='doctor-card'>

        <p>
            <span>Doctor Name : </span>
            {data.dName}
        </p>

        <p>
            <span>Doctor Specialty: </span>
            {data.specs}
        </p>


        <div className='btn-container'>
        <button onClick={()=>onEdit(data)}> Edit </button>
        <button onClick={()=>onDelete(data._id)}> Delete </button>

        </div>
    </div>
  )
}

export default DoctorCard