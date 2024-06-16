import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomQuote from "./RandomQuote";

const Quote = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [showData, setShowData] = useState(2);

  const [randomQuoteId, setRandomQuoteId] = useState([]);

  useEffect(() => {
    quoteListing(currentPage);
  }, [currentPage, showData]);

  const quoteListing = async (page) => {
    const params = {
      query: "human",
    };
    const response = await fetch(
      `${API_URL}/api/v1/public/quotes?page=${page}&limit=${showData}&query=${params.query}`
    );
    const getQuote = await response.json();

    setQuoteList(getQuote?.data?.data);
    setTotalPage(getQuote?.data?.totalPages);
    quoteWithId(getQuote.data?.data[0].id);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const quoteWithId = async (getId) => {
    const response = await fetch(`${API_URL}/api/v1/public/quotes/${getId}`);
    const getQuote = await response.json();
    setRandomQuoteId(getQuote?.data);
  };
  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center p-4">Quote List</h1>
      <div className="flex flex-wrap justify-center">
        {quoteList.map((item, index) => (
          <div
            key={index}
            onClick={() => quoteWithId(item?.id)}
            className="max-w-md mx-2 bg-blue-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4 cursor-pointer"
          >
            <div className="md:flex">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Quote
                </div>
                <p className="mt-2 text-gray-500">"{item?.content}"</p>
                <p className="mt-2 text-gray-500">
                  <b>Author:</b> {item?.author}
                </p>
                <p className="mt-2 text-gray-500">
                  <b>Date:</b> {item?.dateAdded}
                </p>
                <p className="mt-2 text-gray-500">
                  <b>Auth Slug:</b> {item?.authorSlug}
                </p>
                {item.tags?.map((tagItem, tagIndex) => (
                  <p key={tagIndex} className="mt-2 text-gray-500">
                    <b>Tags:</b> {tagItem}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPage > 1 && (
        <div className="flex flex-wrap items-center justify-center ml-[850px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="mr-4"></span>
          {Array.from(Array(totalPage).keys())
            .slice(currentPage - 1, currentPage + 2)
            .map((num, index) => (
              <button
                key={index}
                className={`cursor-pointer mb-4 ${
                  currentPage === num + 1
                    ? "bg-blue-500 text-white"
                    : "bg-yellow-500 text-red-500"
                } px-4 py-2 mr-4 rounded-lg text-sm`}
                onClick={() => handlePageChange(num + 1)}
              >
                {num + 1}
              </button>
            ))}
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 disabled:opacity-50"
            disabled={currentPage === totalPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      <div className="flex items-center ml-[390px] -mt-12">
        <input
          type="text"
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2 w-12"
        />
        <span className="-mt-3">Number of quote per list</span>
      </div>

      <h1 className="text-xl font-bold mb-4 text-center p-4">
        You can select quote and see the quote Deatils{" "}
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-md mx-2 bg-blue-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Quote
              </div>
              <p className="mt-2 text-gray-500">"{randomQuoteId?.content}"</p>
              <p className="mt-2 text-gray-500">
                <b>Author:</b> {randomQuoteId?.author}
              </p>
              <p className="mt-2 text-gray-500">
                <b>Date:</b> {randomQuoteId?.dateAdded}
              </p>
              <p className="mt-2 text-gray-500">
                <b>Auth Slug:</b> {randomQuoteId?.authorSlug}
              </p>
              {randomQuoteId.tags?.map((tagItem, tagIndex) => (
                <p key={tagIndex} className="mt-2 text-gray-500">
                  <b>Tags:</b> {tagItem}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RandomQuote />
    </>
  );
};

export default Quote;
