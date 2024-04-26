import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Acard from './Acard'
import PatientCard from './PatientCard'
import "../Styles/patient.css"

const Patient = () => {

    const [ data , setdata] = useState([])
    const [ isEdit , setisEdit] = useState(false)
    const [selectData , setselectData] = useState(null)
    const [newData , setnewData] = useState({
        Name:"",
        Age:"",
        Gender:""
    })

    useEffect(()=>{
        axios.get("https://hospital-backend-7vrd.onrender.com/patients").then(res=>
    {
        setdata(res.data)
    }).catch(err=>console.log("Error While Fetching Appointments : " + err))
    }, [])

    const handleUpdate = (id , e)=>{
        axios.post(`https://hospital-backend-7vrd.onrender.com/patients/update/:${id}` , selectData).
        then(response=>{
            console.log(response.data)

            const updateData = {...selectData , _id:id}

            setdata(data.map(val=>(
                val._id === id ? updateData : val

            )))

            setselectData(null)
            setisEdit(false)
        }).catch(err=>{console.log("Error While Updating : " + err)})

        

    }


    const handleAdd = (id , e)=>{
        axios.post("https://hospital-backend-7vrd.onrender.com/patients/add" , newData).then(res=> {
            setdata([...data , res.data])

            setnewData({
                Name : "",
                Age : "",
                Gender : ""
            })
        }).catch(err=>{console.log("Error While Adding : " + err)})

    }

    const handleDelete = (id)=>{

        axios.delete(`https://hospital-backend-7vrd.onrender.com/patients/delete/:${id}`).then(res=>{
            console.log(res.data + "Is Deleted")

            setdata(data.filter(val=>val._id != id))
        }).catch(err=>{console.log("Error While Adding : " + err)})

    }

    const handleEdit = (editdata)=>{

        setselectData(editdata)
        setisEdit(true)

    }
  return (
    <div className='patient-main'>
        <div className='form-sections '>
                <h4>
                    {
                        isEdit ? 'Edit Appoinment' : 'Add Appointment'
                    }
                </h4>
                <form className='appointment-form' onSubmit={
                    isEdit? (e)=>handleUpdate(selectData._id , e) : handleAdd
                }>
                    <label>Patient Name : </label>
                    <input type='text' value={ isEdit ? selectData.Name : newData.Name} 
                    onChange={(e)=> isEdit ? setselectData({...selectData , Name: e.target.value }) : 
                        setnewData({...newData , Name: e.target.value})
                    }></input>

                    <label>Patient Age : </label>
                    <input type='text' value={ isEdit ? selectData.Age : newData.Age} 
                    onChange={(e)=> isEdit ? setselectData({...selectData , Age: e.target.value }) : 
                        setnewData({...newData , Age: e.target.value})
                    }></input>

                    <label>Gender : </label>
                    <input type='text' value={ isEdit ? selectData.Gender : newData.Gender} 
                    onChange={(e)=> isEdit ? setselectData({...selectData , Gender: e.target.value }) : 
                        setnewData({...newData , Gender: e.target.value})
                    }></input>

                    <button type="submit">{isEdit ? "Update" : "ADD"}</button>
                </form>

            </div>

        <div className='patients-section'>
            <h3>Patients ({ data.length })</h3>
            <div className='patients-list' > {
                data.map(val=>(
                    <PatientCard key={val._id}
                        data={val} 
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            }</div>
        </div>
    </div>
  )
}

export default Patient