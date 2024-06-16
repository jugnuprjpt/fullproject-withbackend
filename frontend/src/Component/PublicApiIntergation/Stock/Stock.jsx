import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import RandomStock from "./RandomStock";

const Stock = () => {
  const [list, setList] = useState([]);
  const [stockSymbolList, setStockSymbolList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(7);
  const [showData, setShowData] = useState(5);

  useEffect(() => {
    stockMarket(currentPage);
  }, [currentPage, showData]);

  const stockMarket = async (page) => {
    const params = {
      inc: "Symbol,Name,MarketCap,CurrentPrice",
      query: "tata",
    };

    const encodedParams = {
      inc: encodeURIComponent(params.inc),
    };

    const response = await fetch(
      `${API_URL}/api/v1/public/stocks?page=${page}&limit=${showData}&inc=${encodedParams?.inc}&query=${params?.query}`
    );
    const dataGetStock = await response.json();
    console.log(dataGetStock?.data, "datra.......");
    setTotalPage(dataGetStock?.data?.totalPages);
    setList(dataGetStock?.data?.data);
    stockSymbol(dataGetStock?.data?.data[0].Symbol);
  };

  const stockSymbol = async (getSymbol) => {
    const response = await fetch(
      `${API_URL}/api/v1/public/stocks/${getSymbol}`
    );
    const getData = await response.json();
    setStockSymbolList(getData.data);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center p-4">
          Here you can Stock List
        </h1>
      </div>
      <div className="flex justify-center">
        <table className="w-3/4 border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Symbol</th>
              <th className="px-4 py-2 border border-gray-300">Market Cap</th>
              <th className="px-4 py-2 border border-gray-300">
                Current Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {list.map((item) => (
              <tr
                key={item.Symbol}
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => stockSymbol(item.Symbol)}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {item?.Name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item?.Symbol}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item?.MarketCap}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item?.CurrentPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPage > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-center ml-[1000px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from(Array(totalPage).keys()).map((num) => (
            <button
              key={num}
              className={`cursor-pointer mb-4 mx-1 mt-3 ${
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
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            disabled={currentPage === totalPage}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      <div className="flex items-center justify-center -mt-12">
        <input
          type="text"
          value={showData}
          onChange={(e) => setShowData(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 mr-2 w-16 -ml-[1000px]"
        />
        <span className="-mt-4">No. of list per page</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center p-4">
          Here you can select specific stock and get detail
        </h1>
      </div>
      <div className="flex justify-center">
        <table className="w-3/4 border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Symbol</th>
              <th className="px-4 py-2 border border-gray-300">Market Cap</th>
              <th className="px-4 py-2 border border-gray-300">ISIN</th>
              <th className="px-4 py-2 border border-gray-300">Listing Date</th>
              <th className="px-4 py-2 border border-gray-300">ROCE</th>
              <th className="px-4 py-2 border border-gray-300">ROE</th>
              <th className="px-4 py-2 border border-gray-300">StockPE</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="cursor-pointer hover:bg-gray-200">
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.Name}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.Symbol}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.MarketCap}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.ISIN}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.ListingDate}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.ROCE}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.ROE}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {stockSymbolList?.StockPE}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <RandomStock />
    </>
  );
};

export default Stock;
