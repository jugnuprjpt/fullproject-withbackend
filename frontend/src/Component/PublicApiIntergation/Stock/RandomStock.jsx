import React, { useEffect, useState } from "react";
import { API_URL } from "../../../config";

const RandomStock = () => {
  const [randomStockList, setRandomStockList] = useState([]);

  const randomStockCard = async () => {
    const response = await fetch(
      `${API_URL}/api/v1/public/stocks/stock/random`
    );
    const getStock = await response.json();
    setRandomStockList(getStock?.data);
  };
  // Fetch data when the component mounts
  useEffect(() => {
    randomStockCard();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4">
        <button
          onClick={randomStockCard}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8"
        >
          Click here for random Stock
        </button>
      </div>

      {randomStockList && (
        <div className="flex justify-center mt-8">
          <table className="w-3/4 border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Symbol</th>

                <th className="px-4 py-2 border border-gray-300">Market Cap</th>
                <th className="px-4 py-2 border border-gray-300">
                  Listing Date
                </th>
                <th className="px-4 py-2 border border-gray-300">ISIN</th>
                <th className="px-4 py-2 border border-gray-300">
                  Current Price
                </th>
                <th className="px-4 py-2 border border-gray-300">High Low</th>
                <th className="px-4 py-2 border border-gray-300">Book Value</th>
                <th className="px-4 py-2 border border-gray-300">
                  Dividend Yield
                </th>
                <th className="px-4 py-2 border border-gray-300">Face Value</th>
                <th className="px-4 py-2 border border-gray-300">ROCE</th>
                <th className="px-4 py-2 border border-gray-300">ROE</th>
                <th className="px-4 py-2 border border-gray-300">StockPE</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <>
                <tr className="cursor-pointer hover:bg-gray-200">
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.Name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.Symbol}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.MarketCap}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.ListingDate}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.ISIN}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.CurrentPrice}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.HighLow}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.BookValue}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.DividendYield}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.FaceValue}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.ROCE}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.ROE}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {randomStockList?.StockPE}
                  </td>
                </tr>
              </>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default RandomStock;
