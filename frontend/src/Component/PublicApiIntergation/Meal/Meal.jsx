import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const Meal = () => {
  const [list, setList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [showData, setShowData] = useState(2);

  const [mealIdData,setMealIdData] = useState([])

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    mealListing(currentPage);
  }, [currentPage, showData]);

  const mealListing = async (page) => {
    const response = await fetch(
      `${API_URL}/api/v1/public/meals?page=${page}&limit=${showData}&query=rice`
    );
    const mealGet = await response.json();
    setList(mealGet?.data?.data);
    setTotalPage(mealGet?.data?.totalPages);
    
  };


  const randomId = async(idGet)=>{
        const response = await fetch (`${API_URL}/api/v1/public/meals/${idGet}`)
        const getData = await response.json();
        setMealIdData(getData?.data)
       
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
  <h1 className="text-xl font-bold mb-4 text-center p-4">Meal List</h1>
  <div className="flex flex-wrap justify-center">
    {list.map((item) => (
      <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4" onClick={() => randomId(item.id)}>
        <img className="w-full" src={item?.strMealThumb} alt="Meal Image" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{item?.strMeal}</div>
          <p className="text-gray-700 text-base">
            {showFullDescription
              ? item?.strInstructions
              : `${item?.strInstructions.substring(0, 100)}...`}
            {!showFullDescription && (
              <button
                className="text-blue-500"
                onClick={toggleDescription}
              >
                Read More
              </button>
            )}
          </p>
          <ul className="text-gray-700 text-base">
  <table className="table-auto w-full">
    <thead>
      <tr>
        <th className="px-4 py-2">Ingredient</th>
        <th className="px-4 py-2">Measure</th>
      </tr>
    </thead>
    <tbody>
      {[...Array(20).keys()].map((i) => (
        (item[`strIngredient${i + 1}`] || item[`strMeasure${i + 1}`]) && (
          <tr key={i}>
            <td className="border px-4 py-2">{item[`strIngredient${i + 1}`] || 'N/A'}</td>
            <td className="border px-4 py-2">{item[`strMeasure${i + 1}`] || 'N/A'}</td>
          </tr>
        )
      ))}
    </tbody>
  </table>
</ul>

        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #{item?.strCategory}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{item?.strArea}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{item?.strTags}
          </span>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <a
            href="https://www.youtube.com/watch?v=qfchrS2D_v4"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Watch Video
          </a>
          <a
            href="https://www.bbcgoodfood.com/recipes/2369635/jerk-chicken-with-rice-and-peas"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Source Recipe
          </a>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-4 flex justify-center ml-[390px]">
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      type="button"
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800"
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
        } px-4 py-2 mr-4 rounded-lg text-sm`}
        onClick={() => handlePageChange(num + 1)}
      >
        {num + 1}
      </button>
    ))}
    <button
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800"
      disabled={currentPage === totalPage}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>

  <div className="flex items-center justify-center -mt-12 -ml-[390px] ">
    <input
      type="text"
      value={showData}
      onChange={(e) => setShowData(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2 w-12"
    />
    <span className="-mt-3">No. of meals per page</span>
  </div>

  <h1 className="text-xl font-bold mb-4 text-center p-4">Here you can select specific meal & get details</h1>

  <div className="flex flex-wrap justify-center">
  <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
    <img className="w-full" src={mealIdData?.strMealThumb} alt="Meal Image" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{mealIdData?.strMeal}</div>
      <p className="text-gray-700 text-base">
        {mealIdData?.strInstructions}
      </p>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Ingredient</th>
            <th className="px-4 py-2">Measure</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(20).keys()].map((i) => (
            (mealIdData[`strIngredient${i + 1}`] || mealIdData[`strMeasure${i + 1}`]) && (
              <tr key={i}>
                <td className="border px-4 py-2">{mealIdData[`strIngredient${i + 1}`] || 'N/A'}</td>
                <td className="border px-4 py-2">{mealIdData[`strMeasure${i + 1}`] || 'N/A'}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
    <div className="px-6 py-4">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
        #{mealIdData?.strCategory}
      </span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
        #{mealIdData?.strArea}
      </span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
        #{mealIdData?.strTags}
      </span>
    </div>
    <div className="px-6 py-4 flex justify-between">
      <a
        href="https://www.youtube.com/watch?v=qfchrS2D_v4"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Watch Video
      </a>
      <a
        href="https://www.bbcgoodfood.com/recipes/2369635/jerk-chicken-with-rice-and-peas"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Source Recipe
      </a>
    </div>
  </div>
</div>

</>

  );
};

export default Meal;
