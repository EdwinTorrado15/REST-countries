import { Link } from "react-router-dom";
import africa from "../images/africa.svg";
import america from "../images/america.png";
import asia from "../images/asia.png";
import europa from "../images/europa.png";
import oceania from "../images/oceania.png";

const Home = () => {
  const regiones = [
    {
      id: 1,
      nombre: "Africa",
      imagen: africa,
    },
    {
      id: 2,
      nombre: "Americas",
      imagen: america,
    },
    {
      id: 3,
      nombre: "Asia",
      imagen: asia,
    },
    {
      id: 4,
      nombre: "Europe",
      imagen: europa,
    },
    {
      id: 5,
      nombre: "Oceania",
      imagen: oceania,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {regiones.map((region) => (
        <Link to={`/region/${region.nombre}`} key={region.id}>
          <div className="w-1/2 object-cover object-center border-2 hover:drop-shadow-lg m-auto">
            <img src={region.imagen} alt={region.nombre} />
            <p className="text-center font-semibold text-2xl">
              {region.nombre}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
