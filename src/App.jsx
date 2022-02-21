import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./components/Context/UserContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import QuotePage from "./components/Pages/QuotePage";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    var locallyStoredUser = localStorage.getItem("user");

    if (locallyStoredUser !== null && Object.keys(locallyStoredUser).length > 0)
      setUser(JSON.parse(locallyStoredUser));
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<QuotePage />} />
            <Route path="/stocks/get" element={<QuotePage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <Footer />
    </>
  );
}
