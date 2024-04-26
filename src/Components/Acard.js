import React from 'react'

const Acard = ({data , onEdit , onDelete}) => {
  return (
    <div className='appointment-card'>

        <p>
            <span>Patient : </span>
            {data.pName}
        </p>

        <p>
            <span>Doctor : </span>
            {data.dName}
        </p>

        <p>
            <span>Date : </span>
            {new Date(data.date).toLocaleDateString()}
        </p>

        <div className='btn-container'>
        <button onClick={()=>onEdit(data)}> Edit </button>
        <button onClick={()=>onDelete(data._id)}> Delete</button>

        </div>
    </div>
  )
}

export default Acard