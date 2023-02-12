import { useEffect, useState } from "react";
import Wrapper from "../helpers/wrapper";
import axios from "../helpers/axios";
import ErrorBoundary from "../helpers/errorBoundary";

const Dashboard = () => {

  // API DATA
  const [apiData, setApiData] = useState([]);
  const [isApiDataLoading, setApiDataIsLoading] = useState(false);
  const [isApiDataLoaded, setApiDataIsLoaded] = useState(false);
  const [apiDataError, setApiDataError] = useState(null);

  // TO FETCH DATA FROM API
  const fetchApiData = async () => {
    setApiDataIsLoading(true);
    setApiDataIsLoaded(false);
    setApiDataError(null);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get("/", config);

      setApiData(
        res.data.length === 0
          ? []
          : res.data.data === undefined || res.data.data.length === 0
          ? []
          : res.data.data
      );
      setApiDataIsLoading(false);
      setApiDataIsLoaded(true);
      setApiDataError(null);
    } catch (error) {
      setApiData([]);
      setApiDataIsLoading(false);
      setApiDataIsLoaded(false);
      setApiDataError(error.code);
    }
  };

  let stockMarketData = (
    <Wrapper>
      <li className=" w-96 animate-pulse p-4">
        <div className="flex flex-row justify-between">
          <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
          <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </li>
      <li className=" w-96 animate-pulse p-4">
        <div className="flex flex-row justify-between">
          <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
          <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </li>
      <li className=" w-96  animate-pulse p-4">
        <div className="flex flex-row justify-between">
          <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
          <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </li>
      <li className=" w-96  animate-pulse p-4">
        <div className="flex flex-row justify-between">
          <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
          <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </li>
      <li className=" w-96  animate-pulse p-4">
        <div className="flex flex-row justify-between">
          <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
          <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </li>
    </Wrapper>
  );

  if (isApiDataLoaded && !isApiDataLoading) {
    if (apiData.length === 0) {
      stockMarketData = (
        <Wrapper>
          <div className="">No Data Available</div>
        </Wrapper>
      );
    } else {
      stockMarketData = (
        <Wrapper>
          <ErrorBoundary>
            {apiData.map((data, index) => (
              <Wrapper key={index}>
                <li>
                  <a
                    className="block hover:bg-gray-50"
                    href={"/details/" + data.id}
                  >
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex">
                            <div className="truncate font-medium text-indigo-600">
                              {data.name}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-16 flex flex-shrink-0">
                        <p
                          className={
                            data.tag === "Bearish"
                              ? "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-red-100 text-red-800"
                              : "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800"
                          }
                        >
                          {data.tag}
                        </p>
                      </div>
                      <div className="ml-5 flex-shrink-0">
                        <i className="arrow right"></i>
                      </div>
                    </div>
                  </a>
                </li>
              </Wrapper>
            ))}
          </ErrorBoundary>
        </Wrapper>
      );
    }
  }

  if (isApiDataLoading) {
    stockMarketData = (
      <Wrapper>
        <li className="w-96 animate-pulse p-4">
          <div className="flex flex-row justify-between">
            <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
            <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
          </div>
        </li>
        <li className=" w-96 animate-pulse p-4">
          <div className="flex flex-row justify-between">
            <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
            <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
          </div>
        </li>
        <li className=" w-96  animate-pulse p-4">
          <div className="flex flex-row justify-between">
            <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
            <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
          </div>
        </li>
        <li className=" w-96  animate-pulse p-4">
          <div className="flex flex-row justify-between">
            <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
            <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
          </div>
        </li>
        <li className=" w-96  animate-pulse p-4">
          <div className="flex flex-row justify-between">
            <div className="w-48 bg-gray-300 h-6 rounded-md "></div>
            <div className=" w-12 bg-gray-300 h-6 rounded-md "></div>
          </div>
        </li>
      </Wrapper>
    );
  }

  if (apiDataError) {
    stockMarketData = (
      <Wrapper>
        <div className="">Something Went Wrong!!</div>
      </Wrapper>
    );
  }

  // GET DATA ON FIRST LOAD
  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <Wrapper>
      <section className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw]">
        <ul className="divide-y divide-gray-200">{stockMarketData}</ul>
      </section>
    </Wrapper>
  );
};
export default Dashboard;
