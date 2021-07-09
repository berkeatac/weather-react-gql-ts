import { useEffect, useState, useRef } from "react";
import { useGetCityByNameLazyQuery } from "../../generated/graphql";
import _ from "lodash";
import { MapContainer, TileLayer } from "react-leaflet";

const mapProps = {
  doubleClickZoom: false,
  closePopupOnClick: false,
  dragging: false,
  trackResize: false,
  touchZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
  zoom: 13,
  attributionControl: false,
};

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

  const weather = data?.getCityByName?.weather;
  const summary = weather?.summary;
  const temperature = weather?.temperature;

  return (
    <div>
      <h1 className="text-lg font-medium text-gray-900 m-4">
        Weather Master 3000
      </h1>
      <input
        className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="City Name"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      ></input>
      {!loading && !error && data?.getCityByName && (
        <>
          <div className="flex justify-center mt-6">
            <div className="bg-white shadow-lg rounded-3xl p-4 w-full h-full mx-2 lg:w-1/2 lg:h-1/4 overflow-hidden">
              <div className="flex-none lg:flex">
                <div className=" h-48 w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
                  {data?.getCityByName?.coord && (
                    <div className="flex justify-center">
                      <MapContainer
                        className=" h-48 w-full lg:h-48 lg:w-48 lg:mb-0 mb-3 rounded-xl"
                        center={[
                          data?.getCityByName?.coord?.lat || 51.505,
                          data?.getCityByName?.coord?.lon || -0.09,
                        ]}
                        {...mapProps}
                      >
                        <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      </MapContainer>
                    </div>
                  )}
                </div>
                <div className="flex flex-col ml-4 py-2 justify-around">
                  <div className="">
                    <h2 className="flex text-lg font-medium">
                      {summary?.title}
                    </h2>
                    <h2 className="flex text-sm">{summary?.description}</h2>
                    <p className="mt-3"></p>
                    <h2 className="flex text-lg font-medium">
                      {temperature?.actual} C
                    </h2>
                    <h2 className="flex text-sm">
                      {temperature?.min} C - {temperature?.max} C
                    </h2>
                  </div>
                  <p className="mt-3"></p>
                  <div className="flex text-sm text-gray-600">
                    <div className="flex-1 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <p className="">
                        {`${data?.getCityByName?.name}, ${data?.getCityByName?.country}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
