import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Regiones = () => {
  const [regiones, setRegiones] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const { region } = useParams();

  const getRegiones = async () => {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/region/${region}`
      );

      setRegiones(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRegiones();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchCountry(searchTerm);
    const filtered = regiones.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm) ||
        country.name.official.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver
        </button>
      </Link>
      <input
        onChange={handleSearch}
        value={searchCountry}
        type="text"
        placeholder="Busca tu pais..."
        className="w-full p-3 border-2 mb-3 rounded-lg mt-4"
      />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {Object.entries(filteredCountries).map(([key, value]) => (
          <div key={key} className="m-auto border-2 rounded-md w-96">
            <div className="flex items-center justify-between p-2 bg-gray-50">
              <div>
                <p>{value.name.common}</p>
                <span className="text-xs text-gray-500">
                  ({value.name.official})
                </span>
              </div>
              <Link to={`/pais/${value.name.common}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                  Ver
                </button>
              </Link>
            </div>
            <div className="flex items-center justify-between p-2">
              <p className="font-bold">Lenguaje: </p>
              <p className="text-sm ">
                {Object.values(value.languages).join(", ")}
              </p>
            </div>
            <div className="flex items-center justify-between p-2 border-t-2">
              <p className="font-bold">Moneda: </p>
              <p className="text-sm ">
                {value.currencies
                  ? Object.values(value.currencies)
                      .map((currency) =>
                        currency.symbol ? currency.symbol : null
                      )
                      .join(", ")
                  : "No disponible"}
              </p>
            </div>
            <div className="flex items-center justify-between p-2 border-t-2">
              <p className="font-bold">Sub Region: </p>
              <p className="text-sm ">
                {value.subregion ? value.subregion : "No disponible"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regiones;
