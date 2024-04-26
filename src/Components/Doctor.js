import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DoctorCard from './DoctorCard'
import "../Styles/doctor.css"

const Doctor = () => {

    const [ data , setdata] = useState([])
    const [ isEdit , setisEdit] = useState(false)
    const [selectData , setselectData] = useState(null)
    const [newData , setnewData] = useState({
        dName:"",
        specs:""
    })

    useEffect(()=>{
        axios.get("https://hospital-backend-7vrd.onrender.com/doctors").then(res=>
    {
        setdata(res.data)
    }).catch(err=>console.log("Error While Fetching Appointments : " + err))
    }, [])

    const handleUpdate = (id , e)=>{
        axios.post(`https://hospital-backend-7vrd.onrender.com/doctors/update/:${id}` , selectData).
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
        console.log("here")
        axios.post("https://hospital-backend-7vrd.onrender.com/doctors/add" , newData).then(res=> {
            console.log("here")
            setdata([...data , res.data])

            setnewData({
                dName : "",
                specs : ""
            })
        }).catch(err=>{console.log("Error While Adding : " + err)})

    }

    const handleDelete = (id)=>{

        axios.delete(`https://hospital-backend-7vrd.onrender.com/doctors/delete/:${id}`).then(res=>{
            console.log(res.data + "Is Deleted")

            setdata(data.filter(val=>val._id != id))
        }).catch(err=>{console.log("Error While Adding : " + err)})

    }

    const handleEdit = (editdata)=>{

        console.log("Here")

        setselectData(editdata)
        setisEdit(true)

    }
  return (
    
    <div className='main-doc-container  '>
    <div className='form-sections  '>
        <h4>
            {
                isEdit ?
                    'Edit Doctor' :
                    'Add New Doctor'
            }
        </h4>
        <form
            onSubmit={
                isEdit ?
                    (e) =>
                      handleUpdate(selectData._id, e) :
                      handleAdd}>
            <label>Name: </label>
            <input
                type="text"
                value={
                    isEdit ?
                     selectData.dName :
                     newData.dName
                }
                onChange={
                    (e) =>
                    isEdit ?
                            setselectData(
                                {
                                    ...selectData,
                                    dName: e.target.value
                                }) :
                            setnewData(
                                {
                                    ...newData,
                                    dName: e.target.value
                                })} />
            <br />
            <label>Specialty: </label>
            <input type="text"
                value=
                {
                    isEdit ?
                        selectData.specs :
                        newData.specs
                }
                onChange={
                    (e) =>
                    isEdit ?
                            setselectData(
                                {
                                    ...selectData,
                                    specs: e.target.value
                                }
                            ) :
                            setnewData(
                                {
                                    ...newData,
                                    specs: e.target.value
                                }
                            )} />
            <br />
            <button type="submit">
                {
                    isEdit ?
                        'Update Doctor' :
                        'Add Doctor'
                }</button>
        </form>
    </div>
    <div className='doctors-section  '>
        <h3>Doctors({data.length}) </h3>
        <div className="doctor-list">
            {data.map(doctor => (
                <DoctorCard
                    key={doctor._id}
                    data={doctor}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    </div>

</div>
);
    
  
}

export default Doctor