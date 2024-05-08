import React, { useState, useEffect } from "react";
import { API_URL } from "../../../config";

function RandomUsers() {
  const [list, setList] = useState([]);
  const [randomIdList, setRandomList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(50);
  const [showData, setShowData] = useState(10);

  useEffect(() => {
    randomUsers(currentPage);
  }, [currentPage, showData]);

  const randomUsers = async (page) => {
    try {
      const apiFetch = await fetch(
        `${API_URL}/api/v1/public/randomusers?page=${page}&limit=${showData}`
      );
      const response = await apiFetch.json();
      const dataGet = response.data.data;
      setTotalPage(response.data.totalPages);
      setList(dataGet);
      randomIdUserList(dataGet[0].id)
    } catch (error) {
      console.log(error, "error.........");
    }
  };

  const randomIdUserList = async (id) => {
    try {
      const randomUser = await fetch(
        `${API_URL}/api/v1/public/randomusers/${id}`
      );
      const responseData = await randomUser.json();
      const listingData = responseData.data;
      setRandomList(listingData);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <h1 className="text-xl font-bold mb-4 text-center p-4">
          Random User List
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            value={showData}
            onChange={(e) => setShowData(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2"
          />
        </div>
      </div>

      <table className="w-3/4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">Name</th>
            <th className="px-4 py-2 border border-gray-300">Gender</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr
              key={index}
              onClick={() => randomIdUserList(item.id)}
              className="cursor-pointer hover:bg-gray-200"
            >
              <td className="px-4 py-2 border border-gray-300">
                {item.name.first}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.gender}
              </td>
              <td className="px-4 py-2 border border-gray-300">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPage > 1 && (
        <div className="mt-4">
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
      )}

      <>
        <h1 className="text-xl font-bold mb-4 text-center p-4">
          Particular User{" "}
        </h1>

        <div className="flex justify-center items-center">
          <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={randomIdList?.picture?.large}
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {randomIdList?.name?.first}
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {randomIdList?.location?.city}
              </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {randomIdList?.email}
              </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {randomIdList?.location?.timezone.description}
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default RandomUsers;
