import React from "react";
import { useState } from "react";
import UserContext from "./../context/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../assets/css/reset.css";
import "../assets/css/style.css";
import PaginaInicial from "./PaginaInicial";
import SignUp from "./SignUp";
import Registros from "./Registros";
import NovaMovimentacao from "./NovaMovimentacao";

export default function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PaginaInicial />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/registros" element={<Registros />}></Route>
            <Route
              path="/novaMovimentacao"
              element={<NovaMovimentacao />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
