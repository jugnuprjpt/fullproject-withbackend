import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomProduct from "./RandomProduct";

function Products() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [showData, setShowData] = useState(4);

  const [getSingleProduct, setGetSingleProduct] = useState([]);
 

  useEffect(() => {
    productDetail(currentPage);
  }, [currentPage, showData]);

  const productDetail = async (page) => {
    const params = {
      inc: "category,price,thumbnail,images,title,id",
      query: "mens-watches",
    };

    const encodedParams = {
      inc: encodeURIComponent(params.inc),
      query: encodeURIComponent(params.query),
    };

    const queryString = Object.keys(encodedParams)
      .map((key) => `${encodeURIComponent(key)}=${encodedParams[key]}`)
      .join("&");

    const response = await fetch(
      `${API_URL}/api/v1/public/randomproducts?page=${page}&limit=${showData}&${queryString}`
    );
    const getData = await response.json();
    const getProduct = getData.data.data;
    setTotalPage(response?.data?.totalPages);
    setList(getProduct);
    specficProduct(getProduct[0].id)
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const specficProduct = async (id) => {
    const apiGet = await fetch(`${API_URL}/api/v1/public/randomproducts/${id}`);
    const response = await apiGet.json();
    const getProduct = response.data;
    setGetSingleProduct(getProduct);
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4 text-center p-4">Product List</h1>
      <div className="flex items-center">
        <input
          type="text"
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {list.map((item, id) => (
          <div
            key={item.id}
            className="w-full max-w-sm mx-4 my-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            onClick={() => specficProduct(id)}
          >
            <img
              className="p-8 rounded-t-lg"
              src={item?.thumbnail}
              alt="product image"
            />

            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item?.title}
              </h5>

              <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    class="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  Rs.{item.price}
                </span>
                <span className="text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center">
                  {item?.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* {totalPage < 0 && ( */}
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
   {/* )}  */}

      <>
      <h1 className="text-xl font-bold mb-4 text-center p-4">
          Particular Product{" "}
        </h1>
        <div className="flex justify-center items-center">
          <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            src={getSingleProduct?.thumbnail}
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {getSingleProduct?.title}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {getSingleProduct?.brand}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {getSingleProduct?.category}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {getSingleProduct?.description}
            </p>

            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <b>Rs.{getSingleProduct?.price}</b>
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <b>Available Stock: {getSingleProduct?.stock}</b>
            </p>
            </div>
          </div>
        </div>

 <hr />
        <RandomProduct/>
      </>
    </>
  );
}

export default Products;
