import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./client-component/NavBar";
import NavBar from "./client-component/NavBar";
import Home from "./client-views/home";
import About from "./client-views/about";
import Price from "./client-views/price/price";
import Footer from "./client-component/Footer";
import Trainning from "./client-views/trainning";
import Contact from "./client-views/contact";
import DetailPayments from "./client-views/detailPayments/detailPayments";
import RegisterLocal from "./client-component/RegisterLocal";
import LocalLogin from "./client-component/LocalLogin";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Nosotros" element={<About />} />
          <Route path="/Entrenamiento" element={<Trainning />} />
          <Route path="/Precios" element={<Price />} />
          <Route path="/Contacto" element={<Contact />} />
          <Route path="/Detalle/:id" element={<DetailPayments />} />
          <Route path="/RegistroLocal" element={<RegisterLocal />} />
          <Route path="/LocalLogin" element={<LocalLogin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
