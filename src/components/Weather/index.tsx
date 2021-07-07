import { useGetCityByNameQuery } from "../../generated/graphql";

const Weather = () => {
  const { data, loading, error } = useGetCityByNameQuery({
    variables: {
      name: "Toronto",
    },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const weather = data?.getCityByName?.weather;
  const summary = weather?.summary;
  const temperature = weather?.temperature;

  return (
    <div>
      <h1>Weather Summary for Toronto</h1>
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
    </div>
  );
};

export default Weather;
