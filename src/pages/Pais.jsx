import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Pais = () => {
  const [pais, setPais] = useState([]);
  const { nombre } = useParams();

  const getPais = async () => {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${nombre}`
      );
      setPais(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPais();
  }, []);

  return (
    <div>
      <Link to="/REST-countries">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Volver
        </button>
      </Link>
      <h1 className="text-3xl font-medium mt-4">{nombre}</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.entries(pais).map(([key, value]) => (
          <div key={key} className="flex">
            <div className=" rounded-md w-full grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl">Nombres</p>
                <div className="w-96 border-2">
                  <div className="flex justify-between p-2 border-b-2">
                    <p className="font-bold">Comun: </p>
                    <p>{value.name.common}</p>
                  </div>
                  <div className="flex justify-between p-2">
                    <p className="font-bold">Oficial: </p>
                    <p>{value.name.official}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-2xl">Geografia</p>
                <div className="w-96 border-2">
                  <div className="flex justify-between p-2 border-b-2">
                    <p className="font-bold">Region: </p>
                    <p>{value.region ? value.region : "No disponible"}</p>
                  </div>
                  <div className="flex justify-between p-2 border-b-2">
                    <p className="font-bold">Sub-region: </p>
                    <p>{value.subregion ? value.subregion : "No disponible"}</p>
                  </div>
                  <div className="flex justify-between p-2 border-b-2">
                    <p className="font-bold">Capital: </p>
                    <p>{value.capital ? value.capital : "No disponible"}</p>
                  </div>
                  <div className="flex justify-between p-2 border-b-2">
                    <p className="font-bold">Fronteras: </p>
                    <p>
                      {value.borders
                        ? Object.values(value.borders).join(", ")
                        : "No existen"}
                    </p>
                  </div>
                  <div className="flex justify-between p-2">
                    <p className="font-bold">Area: </p>
                    <p>{value.area ? value.area : "No disponible"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {Object.entries(pais).map(([key, value]) => (
          <img
            key={key}
            src={value.flags.svg}
            alt={`Foto de la bandera de ${value.name.official}`}
            className="w-96"
          />
        ))}
      </div>
    </div>
  );
};

export default Pais;
