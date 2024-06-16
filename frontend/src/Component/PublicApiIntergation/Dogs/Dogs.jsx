import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomDogs from "./RandomDogs";

const Dogs = () => {
  const [list, setList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [showData, setShowData] = useState(1);

  const [dodsWithId, setDogsWithId] = useState([]);

  useEffect(() => {
    dogsList(currentPage);
  }, [currentPage, showData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const dogsList = async (page) => {
    const query = "Affenpinscher";
    const response = await fetch(
      `${API_URL}/api/v1/public/dogs?page=${page}&limit=${showData}&query=${query}`
    );
    const getData = await response.json();
    setList(getData?.data?.data);
    setTotalPage(getData?.data?.totalPages);
    dogsWithId(getData?.data?.data[0].id);
  };

  const dogsWithId = async (id) => {
    const response = await fetch(`${API_URL}/api/v1/public/dogs/${id}`);
    const dataGet = await response.json();
    setDogsWithId(dataGet?.data);
  };
  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center p-4">Dog List</h1>
      <div className="flex flex-wrap justify-center">
        {list.map((item) => (
          <div
            key={item.id}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer"
            onClick={() => dogsWithId(item?.id)}
          >
            <img className="w-full" src={item?.image?.url} alt={item?.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item?.name}</div>
              <p className="text-gray-700 text-base mb-2">
                <b>Bred For:</b> {item?.bred_for}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Breed Group:</b> {item?.breed_group}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Height:</b> {item?.height?.imperial} ({item?.height?.metric}{" "}
                Inch)
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Weight:</b> {item?.weight?.imperial} ({item?.weight?.metric}{" "}
                Kg)
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Life Span:</b> {item?.life_span}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Origin:</b> {item?.origin}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <b>Temperament:</b> {item?.temperament}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          disabled={currentPage === 1}
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
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          disabled={currentPage === totalPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* <div className="flex items-center justify-center mb-4">
    <input
      type="text"
      value={showData}
      onChange={(e) => setShowData(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 mr-2 w-11"
      placeholder="Enter number of items"
    />
  </div>

  <div className="flex flex-wrap justify-center">
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={dodsWithId?.image?.url} alt={dodsWithId?.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{dodsWithId?.name}</div>
        <p className="text-gray-700 text-base mb-2"><b>Bred For:</b> {dodsWithId?.bred_for}</p>
        <p className="text-gray-700 text-base mb-2"><b>Breed Group:</b> {dodsWithId?.breed_group}</p>
        <p className="text-gray-700 text-base mb-2"><b>Height:</b> {dodsWithId?.height?.imperial} ({dodsWithId?.height?.metric} Inch)</p>
        <p className="text-gray-700 text-base mb-2"><b>Weight:</b> {dodsWithId?.weight?.imperial} ({dodsWithId?.weight?.metric} Kg)</p>
        <p className="text-gray-700 text-base mb-2"><b>Life Span:</b> {dodsWithId?.life_span}</p>
        <p className="text-gray-700 text-base mb-2"><b>Origin:</b> {dodsWithId?.origin}</p>
        <p className="text-gray-700 text-base mb-2"><b>Temperament:</b> {dodsWithId?.temperament}</p>
      </div>
    </div>
  </div> */}
      <RandomDogs />
    </>
  );
};

export default Dogs;
