import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomCats from "./RandomCats";

const Cats = () => {
  const [list, setList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showData, setShowData] = useState(2);

  const [getlistId, setGetListId] = useState([]);

  useEffect(() => {
    catsApiListing(currentPage);
  }, [currentPage, showData]);

  const catsApiListing = async (page) => {
    const query = "sociable";
    const response = await fetch(
      `${API_URL}/api/v1/public/cats?query=${query}&page=${page}&limit=${showData}`
    );
    const getData = await response.json();
    setList(getData?.data?.data);
    setTotalPage(getData?.data?.totalPages);
    catsWithId(getData?.data?.data[0].id);
  };

  const catsWithId = async (getId) => {
    const res = await fetch(`${API_URL}/api/v1/public/cats/${getId}`);
    const getIdData = await res.json();
    setGetListId(getIdData?.data);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center p-4">Cats List</h1>

      <div className="flex flex-wrap justify-center">
        {list.map((item) => (
          <div
            key={item.id}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            onClick={() => catsWithId(item?.id)}
          >
            <img className="w-full" src={item?.image} alt={item?.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item?.name}</div>
              <p className="text-gray-700 text-base mb-2">
                <b>Description:</b> {item?.description}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Origin:</b> {item?.origin}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Country Code:</b> {item?.country_code}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>vetstreet_url Group:</b> {item?.vetstreet_url}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Life Span:</b> {item?.life_span}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Weight:</b> {item?.weight?.imperial} ({item?.weight?.metric}{" "}
                kg)
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Temperament:</b> {item?.temperament}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 ml-[1000px]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          type="button"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800"
        >
          Prev
        </button>
        <span className="mr-4"></span>
        {Array.from(Array(totalPage).keys()).map((num, index) => (
          <button
            key={index}
            className={`cursor-pointer mb-4 ${
              currentPage === num + 1
                ? "bg-blue-500 text-white"
                : "bg-yellow-500 text-red-500"
            } px-4 py-2 mr-4`}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </button>
        ))}
        <button
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800"
          disabled={currentPage === totalPage ? true : false}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>{" "}
      </div>

      <div className="flex items-center justify-center -mt-12 -ml-[485px]">
        <input
          type="text"
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2 w-11"
        />
        <span className="-mt-4">no. of dogs list per page </span>
      </div>

      <h1 className="text-xl font-bold mb-4 text-center p-4">
        Here you can select specific Cat frrom List and get details
      </h1>

      <div className="flex flex-wrap justify-center">
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img
            className="w-full"
            src={getlistId?.image}
            alt={getlistId?.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{getlistId?.name}</div>
            <p className="text-gray-700 text-base mb-2">
              <b>Description:</b> {getlistId?.description}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <b>Origin:</b> {getlistId?.origin}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <b>Country Code:</b> {getlistId?.country_code}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <b>vetstreet_url Group:</b> {getlistId?.vetstreet_url}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <b>Life Span:</b> {getlistId?.life_span}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <b>Weight:</b> {getlistId?.weight?.imperial} (
              {getlistId?.weight?.metric} kg)
            </p>
            <p className="text-gray-700 text-base mb-2">
              <b>Temperament:</b> {getlistId?.temperament}
            </p>
          </div>
        </div>
      </div>
      <RandomCats />
    </div>
  );
};

export default Cats;
