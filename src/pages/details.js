import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBoundary from "../helpers/errorBoundary";
import Wrapper from "../helpers/wrapper";
import axios from "../helpers/axios";

export const Details = () => {
  const params = useParams();
  const navigate = useNavigate();

  // API DATA
  const [apiData, setApiData] = useState([]);
  const [isApiDataLoading, setApiDataIsLoading] = useState(false);
  const [isApiDataLoaded, setApiDataIsLoaded] = useState(false);
  const [apiDataError, setApiDataError] = useState(null);

  const textReplaceWithLink = (data, stateData, parentIndex) => {
    let tempArr = data.text;

    for (let index = 0; index < Object.keys(data.variable).length; index++) {
      if (Object.values(data.variable)[index]["type"] === "value") {
        let url =
          "/variable/" +
          Object.keys(data.variable)[index] +
          "/" +
          parentIndex +
          "/" +
          stateData.id;
        var newChild1 =
          "<a href=" +
          url +
          ">" +
          Object.values(data.variable)[index].values[0] +
          "</a>";
        tempArr = tempArr.replace(Object.keys(data.variable)[index], newChild1);
      } else if (Object.values(data.variable)[index]["type"] === "indicator") {
        let url =
          "/variable/" +
          Object.keys(data.variable)[index] +
          "/" +
          parentIndex +
          "/" +
          stateData.id;
        var newChild1 =
          "<a href=" +
          url +
          ">" +
          Object.values(data.variable)[index].default_value +
          "</a>";
        tempArr = tempArr.replace(Object.keys(data.variable)[index], newChild1);
      }
    }
    return <div dangerouslySetInnerHTML={{ __html: tempArr }} />;
  };

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
          : res.data.data[params.listId - 1]
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

  let detailsData = (
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
      detailsData = (
        <Wrapper>
          <div className="">No Data Available</div>
        </Wrapper>
      );
    } else {
      detailsData = (
        <Wrapper>
          <ErrorBoundary>
            <Wrapper>
              <div className="flex justify-start">
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex gap-2 items-center my-3"
                >
                  <i className="arrow left"></i> Go back
                </button>
              </div>
              <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull">
                <h3 className="text-2xl font-medium leading-6 text-start text-gray-900">
                  {apiData.name}
                </h3>
                <div className="mt-3 flex flex-shrink-0">
                  <p
                    className={
                      apiData.tag === "Bearish"
                        ? "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-red-100 text-red-800"
                        : "inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-green-100 text-green-800"
                    }
                  >
                    {apiData.tag}
                  </p>
                </div>
                <hr className="w-full border-[0.1px] border-gray-200 mt-5" />

                <ul role="list" className="divide-y divide-gray-200">
                  {apiData.criteria.map((data, index) => (
                    <Wrapper key={index}>
                      <Wrapper>
                        {data.type === "plain_text" && (
                          <li className="flex py-4">
                            <p className="font-medium text-gray-900">
                              {data.text}
                            </p>
                          </li>
                        )}
                      </Wrapper>
                      <Wrapper>
                        {data.type === "variable" && (
                          <li className="flex py-4">
                            <p className="font-medium text-gray-900 variable-text">
                              {textReplaceWithLink(data, apiData, index)}
                            </p>
                          </li>
                        )}
                      </Wrapper>
                    </Wrapper>
                  ))}
                </ul>
              </div>
            </Wrapper>
          </ErrorBoundary>
        </Wrapper>
      );
    }
  }

  if (isApiDataLoading) {
    detailsData = (
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
    detailsData = (
      <Wrapper>
        <div className="">Something Went Wrong!!</div>
      </Wrapper>
    );
  }

  // GET DATA ON FIRST LOAD
  useEffect(() => {
    fetchApiData();
  }, [params]);

  return <Wrapper>{detailsData}</Wrapper>;
};

export default Details;
