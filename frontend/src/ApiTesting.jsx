import React, { useEffect } from 'react'
import { API_URL } from './config'

function ApiTesting() {

    useEffect(()=>{
        dataGet()

    },[])
    const dataGet = async() =>{
        const getData = await fetch (`${API_URL}/api/v1/todos`)
        const response = await getData.json();
        console.log(response,".....")
        
      }
  return (
    <div>
      dfsdfgds
    </div>
  )
}

export default ApiTesting
