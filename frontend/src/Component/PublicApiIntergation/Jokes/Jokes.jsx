import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomJokes from "./RandomJokes";

const Jokes = () => {
  const [jokesList, setJokesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [showData, setShowData] = useState(2);

  const [idList,setIdList] = useState([])

  console.log(idList,"idList..........")

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
    setTotalPage(response?.data?.data?.totalPages);
    setJokesList(getData);
    jokesWithId(getData[0].id)
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  // useEffect(()=>{
  //   jokesWithId();
  // },[])

  const jokesWithId=async(id)=>{
    const response = await fetch(`${API_URL}/api/v1/public/randomjokes/${id}`)
    const getIdJokes = await response.json();
    const dataGet = getIdJokes.data.content;
    setIdList(dataGet);
  }
  return (
    <>

<div className="flex items-center">
        <input
          type="text"
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2"
        />
      </div>
      {jokesList.map((item) => (
        <>
          <blockquote class="p-4 my-4 border-s-4 border-gray-800 bg-gray-300 dark:border-gray-500 dark:bg-gray-800" onClick={()=>jokesWithId(item.id)}>
            {item?.categories?.map((cat) => (
              
                <p className="italic font-medium leading-relaxed text-gray-900 dark:text-white" >
                  Categories:- {cat}
                </p>
             
            ))}
            <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
              "{item?.content}"
            </p>
          </blockquote>
        </>
      ))}

{/* {totalPage > 1 && ( */}
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
      {/* )} */}


      <>
     
      <blockquote class="p-4 my-4 border-s-4 border-gray-800 bg-gray-300 dark:border-gray-500 dark:bg-gray-800">
           
            
                <p className="italic font-medium leading-relaxed text-gray-900 dark:text-white">
                  {/* Categories:- {idList.cat} */}
                </p>
             
                
            <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
              {idList}
            </p>
          </blockquote>
      </>

      <RandomJokes/>
    </>
  );
};

export default Jokes;
