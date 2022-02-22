import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { endpoints } from "./constants/endpoints";
import UserContext from "./components/Context/UserContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import QuotePage from "./components/Pages/Quote/QuotePage";
import PortfolioPage from "./components/Pages/Portfolio/PortfolioPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [capital, setCapital] = useState(null);

  const updatePortfolio = async (id) => {
    fetch(endpoints().assetsGet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            setPortfolio(response);
            console.log(response);
          });
        } else {
          return response.json().then((response) => {
            console.log(response);
            throw {
              status: response.status,
              message: response.message,
            };
          });
        }
      })
      .catch((responseError) => {
        console.log(responseError);
      });
  };

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, capital, setCapital, portfolio, setPortfolio }}
      >
        <BrowserRouter>
          <Navbar updatePortfolio={updatePortfolio} />
          <Routes>
            <Route
              exact
              path="/"
              element={<QuotePage updatePortfolio={updatePortfolio} />}
            />
            <Route
              path="/stocks/get"
              element={<QuotePage updatePortfolio={updatePortfolio} />}
            />
            <Route
              path="/portfolio"
              element={<PortfolioPage updatePortfolio={updatePortfolio} />}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <Footer />
    </>
  );
}
