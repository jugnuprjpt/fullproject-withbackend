import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomJokes from "./RandomJokes";

const Jokes = () => {
  const [jokesList, setJokesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [showData, setShowData] = useState(2);

  const [idList, setIdList] = useState([]);

  useEffect(() => {
    jokesApi(currentPage);
  }, [currentPage, showData]);

  const jokesApi = async (page) => {
    const params = {
      inc: "categories,id,content",
      query: "science",
    };

    const encodedParams = {
      inc: encodeURIComponent(params.inc),
      query: params.query,
    };

    const apiGet = await fetch(
      `${API_URL}/api/v1/public/randomjokes?limit=${showData}&query=${encodedParams.query}&inc=${encodedParams.inc}&page=${page}`
    );
    const response = await apiGet.json();
    const getData = response.data.data;
    setTotalPage(response?.data?.totalPages);
    setJokesList(getData);
    jokesWithId(getData[0].id);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const jokesWithId = async (id) => {
    const response = await fetch(`${API_URL}/api/v1/public/randomjokes/${id}`);
    const getIdJokes = await response.json();
    const dataGet = getIdJokes.data.content;
    setIdList(dataGet);
  };
  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center p-4">List of Jokes</h1>
      {jokesList.map((item) => (
        <blockquote
          key={item.id}
          className="p-4 my-4 mx-auto max-w-2xl border-l-4 border-gray-800 bg-gray-300 dark:border-gray-500 dark:bg-gray-800"
          onClick={() => jokesWithId(item.id)}
        >
          {item?.categories?.map((cat, index) => (
            <p
              key={index}
              className="italic font-medium leading-relaxed text-gray-900 dark:text-white"
            >
              Categories: {cat}
            </p>
          ))}
          <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
            "{item?.content}"
          </p>
        </blockquote>
      ))}
      <div className="flex items-center justify-center mb-4 -ml-[390px]">
        <input
          type="text"
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-10"
        />
        &nbsp; <span>Number of page jokes per page</span>
      </div>

      {totalPage > 1 && (
        <div className="flex flex-wrap items-center justify-center -mt-16 ml-[390px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-gray-800 "
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPage }, (_, index) => index + 1)
            .slice(
              Math.max(currentPage - 2, 0),
              Math.min(currentPage + 1, totalPage)
            )
            .map((num) => (
              <button
                key={num}
                className={`cursor-pointer mb-4 mt-3 ${
                  currentPage === num
                    ? "bg-blue-500 text-white"
                    : "bg-yellow-500 text-red-500"
                } px-4 py-2 mx-2 rounded-lg text-sm`}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-gray-800"
            disabled={currentPage === totalPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
      <h1 className="text-xl font-bold mb-4 text-center p-4">
        You can select jokes from list and get details
      </h1>
      <blockquote className="p-4 my-4 mx-auto max-w-2xl border-l-4 border-gray-800 bg-gray-300 dark:border-gray-500 dark:bg-gray-800">
        <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
          {idList}
        </p>
      </blockquote>

      <h1 className="text-center text-2xl font-bold my-8">Random Jokes</h1>
      <RandomJokes />
    </>
  );
};

export default Jokes;
