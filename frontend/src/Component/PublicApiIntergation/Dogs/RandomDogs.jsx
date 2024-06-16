import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const RandomDogs = () => {
  const [randomList, setRandomList] = useState([]);

  const randomDogsMath = async () => {
    const response = await fetch(`${API_URL}/api/v1/public/dogs/dog/random`);
    const getData = await response.json();
    setRandomList(getData?.data);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    randomDogsMath();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={randomDogsMath}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8"
        >
          Click here for random Dogs
        </button>
        {randomList && (
          <div className="max-w-sm rounded overflow-hidden shadow-lg mx-6 my-6">
            <img
              className="w-full"
              src={randomList?.image?.url}
              alt={randomList?.name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{randomList?.name}</div>
              <p className="text-gray-700 text-base mb-2">
                <b>Bred For:</b> {randomList?.bred_for}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Breed Group:</b> {randomList?.breed_group}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Height:</b> {randomList?.height?.imperial} (
                {randomList?.height?.metric} Inch)
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Weight:</b> {randomList?.weight?.imperial} (
                {randomList?.weight?.metric} Kg)
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Life Span:</b> {randomList?.life_span}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Origin:</b> {randomList?.origin}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Temperament:</b> {randomList?.temperament}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RandomDogs;
