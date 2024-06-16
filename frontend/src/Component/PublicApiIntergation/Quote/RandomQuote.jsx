import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const RandomQuote = () => {
  const [randomList, setRandomList] = useState([]);

  const randomQuoteGenerate = async () => {
    const response = await fetch(
      `${API_URL}/api/v1/public/quotes/quote/random`
    );
    const dataGetQuote = await response.json();
    setRandomList(dataGetQuote?.data);
  };
  // Fetch data when the component mounts
  useEffect(() => {
    randomQuoteGenerate();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={randomQuoteGenerate}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8"
        >
          Click here for random Quote
        </button>
      </div>
      {randomList && (
        <div className="flex flex-wrap justify-center mt-5">
          <div className="max-w-md mx-2 bg-blue-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Quote
                </div>
                <p className="mt-2 text-gray-500">"{randomList?.content}"</p>
                <p className="mt-2 text-gray-500">
                  <b>Author:</b> {randomList?.author}
                </p>
                <p className="mt-2 text-gray-500">
                  <b>Date:</b> {randomList?.dateAdded}
                </p>
                <p className="mt-2 text-gray-500">
                  <b>Auth Slug:</b> {randomList?.authorSlug}
                </p>
                {randomList.tags?.map((tagItem, tagIndex) => (
                  <p key={tagIndex} className="mt-2 text-gray-500">
                    <b>Tags:</b> {tagItem}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomQuote;
