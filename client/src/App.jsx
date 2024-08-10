import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/userLocalSlice";
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
import OrderStatus from "./client-views/orderStatus";
import AdminDashboard from "./admin-views/adminDashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

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
          <Route path="/orderStatus" element={<OrderStatus />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
