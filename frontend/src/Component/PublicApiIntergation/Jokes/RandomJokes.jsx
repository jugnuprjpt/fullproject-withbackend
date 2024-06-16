import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const RandomJokes = () => {
  const [getList, setGetList] = useState([]);

  const randomApiJokes = async () => {
    const randomJokesApi = await fetch(
      `${API_URL}/api/v1/public/randomjokes/joke/random`
    );
    const response = await randomJokesApi.json();
    const getData = response.data;
    setGetList(getData);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    randomApiJokes();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={randomApiJokes}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Click here for random jokes
        </button>
        {getList && (
          <blockquote className="p-4 max-w-2xl border-l-4 border-gray-800 bg-gray-300 dark:border-gray-500 dark:bg-gray-800">
            <p className="italic font-medium leading-relaxed text-gray-900 dark:text-white">
              {/* Categories: {idList.cat} */}
            </p>
            <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
              {getList?.content}
            </p>
          </blockquote>
        )}
      </div>
    </>
  );
};

export default RandomJokes;
