import { useEffect, useState, useRef } from "react";
import { useGetCityByNameLazyQuery } from "../../generated/graphql";
import _ from "lodash";

import CardMap from "../CardMap";
import CityInput from "../CityInput";
import CardDetails from "../CardDetails";

const Weather = () => {
  const [city, setCity] = useState("Munich");

  const [getCity, { data, loading, error }] = useGetCityByNameLazyQuery({
    variables: {
      name: city,
    },
  });

  const debouncedGetCity = useRef(_.debounce(getCity, 1000));

  useEffect(() => {
    debouncedGetCity.current({ variables: { name: city.toLowerCase() } });
  }, [city]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-medium text-gray-900 m-4">
        Weather Master 3000
      </h1>
      <CityInput city={city} setCity={setCity} />
      {!loading && !error && data?.getCityByName && (
        <>
          <div className="flex justify-center mt-6">
            <div className="bg-white shadow-lg rounded-3xl p-4 w-full h-full mx-2 lg:w-1/2 lg:h-1/4 overflow-hidden">
              <div className="flex-none lg:flex">
                <div className=" h-48 w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
                  {data?.getCityByName?.coord && (
                    <CardMap coord={data?.getCityByName?.coord} />
                  )}
                </div>
                <CardDetails data={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
