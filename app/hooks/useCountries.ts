import countries from "world-countries";

//extract an object with only the properties we need from  world-countries
const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  //search countries by name
  const getByValue = (value: string) => {
    return formattedCountries.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
