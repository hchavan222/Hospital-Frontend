import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Acard from './Acard'
import "../Styles/appoint.css"

const Appoint = () => {

    const [ data , setdata] = useState([])
    const [ isEdit , setisEdit] = useState(false)
    const [selectData , setselectData] = useState(null)
    const [newData , setnewData] = useState({
        pName:"",
        dName:"",
        date:""
    })

    useEffect(()=>{
        axios.get("https://hospital-backend-7vrd.onrender.com/appointments").then(res=>
    {
        setdata(res.data)
    }).catch(err=>console.log("Error While Fetching Appointments : " + err))
    }, [])

    const handleUpdate = (id , e)=>{
        axios.post(`https://hospital-backend-7vrd.onrender.com/appointments/update/:${id}` , selectData).
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
        axios.post("https://hospital-backend-7vrd.onrender.com/appointments/add" , newData).then(res=> {
            setdata([...data , res.data])

            setnewData({
                pName : "",
                dName : "",
                date : ""
            })
        }).catch(err=>{console.log("Error While Adding : " + err)})

    }

    const handleDelete = (id)=>{

        axios.delete(`https://hospital-backend-7vrd.onrender.com/appointments/delete/:${id}`).then(res=>{
            console.log(res.data + "Is Deleted")

            setdata(data.filter(val=>val._id != id))
        }).catch(err=>{console.log("Error While Adding : " + err)})

    }

    const handleEdit = (editdata)=>{

        setselectData(editdata)
        setisEdit(true)

    }
  return (
    <div className='flex-row'>
        <div className='flex-column'>
            <div className='add-form'>
                <h4>
                    {
                        isEdit ? 'Edit Appoinment' : 'Add Appointment'
                    }
                </h4>
                <form className='appointment-form' onSubmit={
                    isEdit? (e)=>handleUpdate(selectData._id , e) : handleAdd
                }>
                    <label>Patient Name : </label>
                    <input type='text' value={ isEdit ? selectData.pName : newData.pName} 
                    onChange={(e)=> isEdit ? setselectData({...selectData , pName: e.target.value }) : 
                        setnewData({...newData , pName: e.target.value})
                    }></input>

                    <label>Doctors Name : </label>
                    <input type='text' value={ isEdit ? selectData.dName : newData.dName} 
                    onChange={(e)=> isEdit ? setselectData({...selectData , dName: e.target.value }) : 
                        setnewData({...newData , dName: e.target.value})
                    }></input>

                    <label>Date : </label>
                    <input type='date' value={ isEdit ? selectData.date : newData.date} 
                    onChange={(e)=> isEdit ? setselectData({...selectData , date: e.target.value }) : 
                        setnewData({...newData , date: e.target.value})
                    }></input>

                    <button type="submit">{isEdit ? "Update" : "ADD"}</button>
                </form>

            </div>
        </div>

        <div className='appointments'>
            <h3>Appointments ({ data.length })</h3>
            <div className='appointment-list' > {
                data.map(val=>(
                    <Acard key={val._id}
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

export default Appoint