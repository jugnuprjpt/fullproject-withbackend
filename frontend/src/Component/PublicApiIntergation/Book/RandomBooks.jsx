import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const RandomBooks = () => {
  const [listing, setListing] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const randomBooks = async () => {
    const response = await fetch(`${API_URL}/api/v1/public/books/book/random`);
    const getRandom = await response.json();
    setListing(getRandom.data);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Fetch data when the component mounts
  useEffect(() => {
    randomBooks();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={randomBooks}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8"
        >
          Click here forRandom Books
        </button>
      </div>

      {listing && (
        <div className="flex flex-wrap justify-center mt-2">
          <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4">
            <div className="w-full h-48 flex justify-center items-center bg-gray-200">
              <img
                className="h-full w-auto"
                src={listing?.volumeInfo?.imageLinks?.smallThumbnail}
                alt="Book Cover"
              />
            </div>

            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {listing?.volumeInfo?.title}
              </div>
              <h1 className="text-sm font-bold mb-4 text-center">
                {listing?.volumeInfo?.subtitle}
              </h1>
              <p className="text-gray-700 text-base">
                <b>Author:- </b> {listing?.volumeInfo?.authors}
                <br />
                <b>Genre:- </b> {listing?.volumeInfo?.categories}
                <br />
                <b>Published:- </b> {listing?.volumeInfo?.publishedDate}
                <br />
                <b>Publisher:- </b> {listing?.volumeInfo?.publisher} <br />
                <b>Description:- </b>{" "}
                {showFullDescription
                  ? listing?.volumeInfo?.description
                  : `${listing?.volumeInfo?.description.substring(0, 100)}...`}
                {!showFullDescription && (
                  <button className="text-blue-500" onClick={toggleDescription}>
                    Read More
                  </button>
                )}
              </p>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {listing?.etag}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {listing?.kind}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {listing?.volumeInfo?.language}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RandomBooks;
