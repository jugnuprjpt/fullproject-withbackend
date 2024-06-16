import React, { useState } from 'react'
import { API_URL } from '../../config'

const ForgetPwd = ({open,setOpen}) => {
    const [forgetEmail,setForgetEmail] = useState({email :""})

    const handleChange=(e)=>{
        const {name,value} = e.target
        setForgetEmail((prev)=>
            ({
                ...prev,
                [name]: value,
              }));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const requestBody = {
            email :forgetEmail?.email
          }
          
          const response = await fetch (`${API_URL}/api/v1/users/forgot-password`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(requestBody) 
        });
   console.log(response,"....")
    }

  return (
    <>
     {
        open === true && 
        <div id="modal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
        <div class="bg-white p-6 rounded shadow-lg w-96">
            <h2 class="text-xl mb-4">Forgot Password</h2>
            <form id="forgotPasswordForm" onSubmit={handleSubmit}>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 mb-2">Email:</label>
                    <input type="email" id="email" name="email" 
                    required class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={forgetEmail?.email}
                    onChange={handleChange}
                    />
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded w-full">Submit</button>
            </form>
            <button id="closeModalButton" class="mt-4 text-gray-500" onClick={()=> setOpen(false)}>Close</button>
        </div>
    </div>
     }
        
    </>
  )
}

export default ForgetPwd
