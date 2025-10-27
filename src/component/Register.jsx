import React, { useState } from 'react'
import api from '../api'

function Register() {
    let [formdata,setformdata]=useState({
        firstname:"",lastname:"",email:"",username:"",password:"",usertype:"student"
    })
    const handle=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})

    }
    const submit=async(e)=>{
        e.preventDefault()
        try{

            const res=await api.post("/register",formdata)
            console.log(res.data.message)
        }
        catch(err){
            console.log(err.message)
        }
    }
  return (
    <div>
        <form onSubmit={submit}>
            <input type="text" name="firstname" placeholder='First Name' onChange={handle}></input>
            <br></br>
            <input type="text" name="lastname" placeholder='Last Name' onChange={handle}></input>
            <br></br>
            <input type="email" name="email" placeholder='Email' onChange={handle}></input>
            <br></br>
            <input type="text" name="username" placeholder='User Name' onChange={handle}></input>
            <br></br>
            <input type="password" name="password" placeholder='PassWord' onChange={handle}></input>
            <br></br>
            <select name="usertype" onChange={handle}>
               <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}
export default Register