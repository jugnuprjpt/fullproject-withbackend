import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const RandomProduct = () => {
  const [list, setList] = useState([]);
  console.log(list, "getRandomProduct............");

  // useEffect(() => {
  //   randomProductFetch();
  // }, []);
  const randomProductFetch = async () => {
    const getData = await fetch(
      `${API_URL}/api/v1/public/randomproducts/product/random`
    );
    const response = await getData.json();
    const getRandomProduct = response.data;
    setList(getRandomProduct);
  };
  return (
    <>
    <button onClick={randomProductFetch}>
      <h1 className="text-xl font-bold mb-4 text-center p-4">
        Random Product{" "}
      </h1>

      <div class="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden">
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
          {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 block w-full">
            Add to Cart
          </button> */}
        </div>
      </div>
      </button>
    </>
  );
};

export default RandomProduct;
