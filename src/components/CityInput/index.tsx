type CityInputPropsType = {
  city: string;
  setCity: Function;
};

const CityInput = ({ city, setCity }: CityInputPropsType) => {
  return (
    <input
      className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="City Name"
      onChange={(e) => setCity(e.target.value)}
      value={city}
    />
  );
};

export default CityInput;
