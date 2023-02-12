import axios from "../helpers/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../helpers/wrapper";
import ErrorBoundary from "../helpers/errorBoundary";

const Variable = () => {
  const params = useParams();
  const navigate = useNavigate();

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
          : res.data.data[params.stateDataId - 1].criteria[params.parentIndex]
              .variable[params.variableValue]
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

  let variableData = (
    <Wrapper>
      <section className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw]">
        <ul className="divide-y divide-gray-200">
          <li className=" w-96 animate-pulse">
            <div className=" px-4  pb-2 pt-4">
              <div className="w-48 bg-gray-300 h-6 rounded-md"></div>
            </div>
            <div className="px-4 pb-4 pt-2">
              <div className=" w-24 bg-gray-300 h-6 rounded-md p-4"></div>
            </div>
          </li>
          <li className=" w-96 animate-pulse p-4">
            <div className=" bg-gray-300 h-6 rounded-md "></div>
          </li>
          <li className=" w-96 animate-pulse p-4">
            <div className=" bg-gray-300 h-6 rounded-md "></div>
          </li>
        </ul>
      </section>
    </Wrapper>
  );

  if (isApiDataLoaded && !isApiDataLoading) {
    if (apiData.length === 0) {
      variableData = (
        <Wrapper>
          <div className="">No Data Available</div>
        </Wrapper>
      );
    } else {
      variableData = (
        <ErrorBoundary>
          <Wrapper>
            <div className="flex justify-start">
              <button
                onClick={() => navigate("/details/" + params.stateDataId)}
                className="inline-flex gap-2 items-center my-3"
              >
                <i className="arrow left"></i>
                Go back
              </button>
            </div>
            <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull">
              <h3 className="text-2xl font-medium leading-6 text-gray-900">
                Variable params
              </h3>
              <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
              {apiData.type === "indicator" ? (
                <ul role="list" className="divide-y divide-gray-200">
                  <div>
                    <h3 className="text-lg text-start font-medium leading-6 my-4 text-gray-900 uppercase">
                      {apiData.study_type}
                    </h3>
                    <div>
                      <label
                        htmlFor="number"
                        className="text-start block text-sm font-medium text-gray-700"
                      >
                        {apiData.parameter_name}
                      </label>
                      <div className="mt-1.5">
                        <input
                          data-testid="indicator-input"
                          type="tel"
                          name="param_value"
                          id="param_value"
                          max="99"
                          min="1"
                          className="block w-full rounded-md border-[0.1px] border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-3"
                          placeholder="period value"
                          value={apiData.default_value}
                        />
                      </div>
                    </div>
                  </div>
                </ul>
              ) : (
                <Wrapper>
                  <ul  className="divide-y divide-gray-200">
                    {apiData.values.map((data, index) => (
                      <li key={index} className="flex py-4">
                        <p className="font-medium text-gray-900">{data}</p>
                      </li>
                    ))}
                  </ul>
                </Wrapper>
              )}
            </div>
          </Wrapper>
        </ErrorBoundary>
      );
    }
  }

  if (isApiDataLoading) {
    variableData = (
      <Wrapper>
        <section className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw]">
          <ul className="divide-y divide-gray-200">
            <li className=" w-96 animate-pulse">
              <div className=" px-4  pb-2 pt-4">
                <div className="w-48 bg-gray-300 h-6 rounded-md"></div>
              </div>
              <div className="px-4 pb-4 pt-2">
                <div className=" w-24 bg-gray-300 h-6 rounded-md p-4"></div>
              </div>
            </li>
            <li className=" w-96 animate-pulse p-4">
              <div className=" bg-gray-300 h-6 rounded-md "></div>
            </li>
            <li className=" w-96 animate-pulse p-4">
              <div className=" bg-gray-300 h-6 rounded-md "></div>
            </li>
          </ul>
        </section>
      </Wrapper>
    );
  }

  if (apiDataError) {
    variableData = (
      <Wrapper>
        <div className="">Something Went Wrong!!</div>
      </Wrapper>
    );
  }

  // GET DATA ON FIRST LOAD
  useEffect(() => {
    fetchApiData();
  }, [params]);

  return <Wrapper>{variableData}</Wrapper>;
};

export default Variable;
