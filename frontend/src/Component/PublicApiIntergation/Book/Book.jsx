import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomBooks from "./RandomBooks";

const Book = () => {
  const [list, setList] = useState([]);
  const [booksIdList, setBooksIdList] = useState([]);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [showData, setShowData] = useState(4);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    bookList(currentPage);
  }, [currentPage, showData]);

  const bookList = async (page) => {
    const params = {
      inc: "kind,id,etag,volumeInfo",
      query: "tech",
    };

    const encodedParams = {
      inc: encodeURIComponent(params.inc),
      query: params.query,
    };

    const response = await fetch(
      `${API_URL}/api/v1/public/books?page=${page}&limit=
      ${showData}&inc=${encodedParams?.inc}&query=${encodedParams?.query}`
    );
    const dataGet = await response.json();
    const booksList = dataGet.data.data;
    console.log(booksList, "..");
    setTotalPage(dataGet?.data?.totalPages);
    setList(booksList);

    booksWithId(booksList[0]?.id);
  };

  const booksWithId = async (id) => {
    const response = await fetch(`${API_URL}/api/v1/public/books/${id}`);
    const dataGet = await response.json();
    setBooksIdList(dataGet.data);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center p-4">
        Here You can see Book List
      </h1>

      <div className="flex flex-wrap justify-center">
        {list.map((item, index) => (
          <div
            key={index}
            className="max-w-xs rounded overflow-hidden shadow-lg mx-2 my-2"
            onClick={() => booksWithId(item?.id)}
          >
            <div className="w-full h-48 flex justify-center items-center bg-gray-200">
              <img
                className="h-full w-auto"
                src={item?.volumeInfo?.imageLinks?.smallThumbnail}
                alt="Book Cover"
              />
            </div>
            <div className="px-4 py-2">
              <div className="font-bold text-lg mb-1">
                {item?.volumeInfo?.title}
              </div>
              <h1 className="text-sm font-bold mb-2 text-center">
                {item?.volumeInfo?.subtitle}
              </h1>
              <p className="text-gray-700 text-sm">
                <b>Author:- </b> {item?.volumeInfo?.authors?.join(", ")}
                <br />
                <b>Genre:- </b> {item?.volumeInfo?.categories?.join(", ")}
                <br />
                <b>Published:- </b> {item?.volumeInfo?.publishedDate}
                <br />
                <b>Publisher:- </b> {item?.volumeInfo?.publisher}
                <br />
                <b>Description:- </b>{" "}
                {showFullDescription
                  ? item?.volumeInfo?.description
                  : `${item?.volumeInfo?.description.substring(0, 100)}...`}
                {!showFullDescription && (
                  <button className="text-blue-500" onClick={toggleDescription}>
                    Read More
                  </button>
                )}
              </p>
            </div>
            <div className="px-4 py-2">
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1">
                {item?.etag}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1">
                {item?.kind}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                {item?.volumeInfo?.language}
              </span>
            </div>
          </div>
        ))}
      </div>

      <>
        <div className="flex flex-col items-center mb-4 mt-4">
          <div className="flex items-center -ml-[800px]">
            <input
              type="text"
              value={showData}
              onChange={(e) => setShowData(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2 w-20"
            />
            <span className="text-gray-700 -mt-5">
              Number of products per page
            </span>
          </div>
        </div>

        {totalPage > 1 && (
          <div className="-mt-[80px] flex flex-wrap items-center justify-center -py-10 ml-[630px]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800"
            >
              Prev
            </button>
            <span className="mr-4"></span>
            {Array.from(Array(totalPage).keys()).map((num, index) => (
              <button
                key={index}
                className={`cursor-pointer mb-4 mt-2 ${
                  currentPage === num + 1
                    ? "bg-blue-500 text-white"
                    : "bg-yellow-500 text-red-500"
                } px-4 py-2 mx-2 rounded-lg text-sm`}
                onClick={() => handlePageChange(num + 1)}
              >
                {num + 1}
              </button>
            ))}
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800"
              disabled={currentPage === totalPage}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </>

      <h1 className="text-xl font-bold mb-4 text-center p-4 mt-8">
        You can select Books from list and get details
      </h1>

      <div className="flex flex-wrap justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4">
          <div className="w-full h-48 flex justify-center items-center bg-gray-200">
            <img
              className="h-full w-auto"
              src={booksIdList?.volumeInfo?.imageLinks?.smallThumbnail}
              alt="Book Cover"
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {booksIdList?.volumeInfo?.title}
            </div>
            <h1 className="text-sm font-bold mb-4 text-center">
              {booksIdList?.volumeInfo?.subtitle}
            </h1>
            <p className="text-gray-700 text-base">
              <b>Author:- </b> {booksIdList?.volumeInfo?.authors}
              <br />
              <b>Genre:- </b> {booksIdList?.volumeInfo?.categories}
              <br />
              <b>Published:- </b> {booksIdList?.volumeInfo?.publishedDate}
              <br />
              <b>Publisher:- </b> {booksIdList?.volumeInfo?.publisher}
              <br />
              <b>Description:- </b>{" "}
              {showFullDescription
                ? booksIdList?.volumeInfo?.description
                : `${booksIdList?.volumeInfo?.description.substring(
                    0,
                    100
                  )}...`}
              {!showFullDescription && (
                <button className="text-blue-500" onClick={toggleDescription}>
                  Read More
                </button>
              )}
            </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {booksIdList?.etag}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {booksIdList?.kind}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {booksIdList?.volumeInfo?.language}
            </span>
          </div>
        </div>
      </div>

      <RandomBooks />
    </>
  );
};

export default Book;
