import { useState } from "react";
import { useGetCityByNameQuery } from "../../generated/graphql";

const Weather = () => {
  const [city, setCity] = useState("");
  const { data, loading, error } = useGetCityByNameQuery({
    variables: {
      name: city,
    },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  const weather = data?.getCityByName?.weather;
  const summary = weather?.summary;
  const temperature = weather?.temperature;

  return (
    <div>
      <h1>Weather Summary for Toronto</h1>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      ></input>
      {!loading && (
        <>
          {summary && (
            <>
              <h2>{summary.title}</h2>
              <p>{summary.description}</p>
            </>
          )}
          {temperature && (
            <>
              <h4>{temperature.actual}</h4>
              <ul>
                <li>
                  <b>Feels like</b>: {temperature.feelsLike}
                </li>
                <li>
                  <b>Min</b>: {temperature.min}
                </li>
                <li>
                  <b>Max</b>: {temperature.max}
                </li>
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
