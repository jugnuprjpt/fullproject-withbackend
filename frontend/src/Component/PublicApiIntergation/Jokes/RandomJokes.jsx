import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../config'

const RandomJokes = () => {
    const [getList,setGetList] = useState([]);
     
  useEffect(()=>{
    randomApiJokes()

  },[])
    const randomApiJokes=async()=>{
        const randomJokesApi = await fetch (`${API_URL}/api/v1/public/randomjokes/joke/random`) 
        const response = await randomJokesApi.json();
        const getData = response.data;
        setGetList(getData)

    }
  

  return (
    <>
       <blockquote class="p-4 my-4 border-s-4 border-gray-800 bg-gray-300 dark:border-gray-500 dark:bg-gray-800">
           
            
           <p className="italic font-medium leading-relaxed text-gray-900 dark:text-white">
             {/* Categories:- {idList.cat} */}
           </p>
        
           
       <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
         {getList?.content} 
       </p>
     </blockquote>
    </>
  )
}

export default RandomJokes