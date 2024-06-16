import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../config'

const RandomCats = () => {
   const [randomList,setRandomList] = useState([]);

    const randomCatsList=async()=>{
       const res = await fetch (`${API_URL}/api/v1/public/cats/cat/random`)
       const randomList = await res.json();
       setRandomList(randomList?.data)
    }
      // Fetch data when the component mounts
  useEffect(() => {
    randomCatsList();
  }, []);
  return (
    <> 
         <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={randomCatsList}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8"
        >
          Click here for random cat
        </button>
      </div>
      {randomList &&          <div className="flex flex-wrap justify-center">
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full"
        src={randomList?.image}
        alt={randomList?.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{randomList?.name}</div>
        <p className="text-gray-700 text-base mb-2">
          <b>Description:</b> {randomList?.description}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <b>Origin:</b> {randomList?.origin}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <b>Country Code:</b> {randomList?.country_code}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <b>vetstreet_url Group:</b> {randomList?.vetstreet_url}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <b>Life Span:</b> {randomList?.life_span}
        </p>
        <p className="text-gray-700 text-base mb-2">
          <b>Weight:</b> {randomList?.weight?.imperial} (
          {randomList?.weight?.metric} kg)
        </p>
        <p className="text-gray-700 text-base mb-2">
          <b>Temperament:</b> {randomList?.temperament}
        </p>
      </div>
    </div>
  </div>}

  </>
  )
}

export default RandomCats