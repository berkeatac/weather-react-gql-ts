import { GetCityByNameQuery } from "../../generated/graphql";
import CardLocationLabel from "../CardLocationLabel";

type CardDetailsProps = {
  data: GetCityByNameQuery;
};

const CardDetails = ({ data }: CardDetailsProps) => {
  return (
    <div className="flex flex-col ml-4 py-2 justify-around">
      <h2 className="flex text-xl font-medium">
        {data?.getCityByName?.weather?.summary?.title}
      </h2>
      <h2 className="flex text-md">
        {data?.getCityByName?.weather?.summary?.description}
      </h2>
      <p className="mt-3"></p>
      <h2 className="flex text-xl font-medium">
        {data?.getCityByName?.weather?.temperature?.actual} &deg;C
      </h2>
      <h2 className="flex text-md">
        {data?.getCityByName?.weather?.temperature?.min} &deg;C -{" "}
        {data?.getCityByName?.weather?.temperature?.max} &deg;C
      </h2>

      <p className="mt-3"></p>
      <CardLocationLabel data={data} />
    </div>
  );
};

export default CardDetails;
