import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const RandomProduct = () => {
  const [list, setList] = useState([]);

  const randomProductFetch = async () => {
    const getData = await fetch(
      `${API_URL}/api/v1/public/randomproducts/product/random`
    );
    const response = await getData.json();
    const getRandomProduct = response.data;
    setList(getRandomProduct);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    randomProductFetch();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={randomProductFetch}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8"
        >
          Click here for random Product
        </button>
      </div>

      {list && (
        <div class="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
          <div class="px-6 py-4 bg-gray-100">
            <h1 class="text-xl font-bold text-gray-800">{list.title}</h1>
            <p class="text-sm text-gray-600">
              <b>{list?.category}</b>
            </p>
            <p class="text-sm text-gray-600">{list?.description}</p>
          </div>

          <div class="grid grid-cols-3 gap-1">
            {list.images &&
              list.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  class="w-full h-24 object-cover"
                />
              ))}
          </div>

          <div class="px-6 py-4">
            <img
              src={list?.thumbnail}
              alt="Image 5"
              class="w-full h-32 object-cover"
            />
          </div>

          <div class="px-6 py-4 bg-gray-100">
            <span class="text-xs text-gray-500">Price: {list?.price}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomProduct;
