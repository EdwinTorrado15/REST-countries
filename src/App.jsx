import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Regiones, Pais } from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/region/:region" element={<Regiones />} />
          <Route path="/pais/:nombre" element={<Pais />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
