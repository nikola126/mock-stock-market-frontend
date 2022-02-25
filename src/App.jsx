import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { endpoints } from "./constants/endpoints";
import UserContext from "./components/Context/UserContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import QuotePage from "./components/Pages/Quote/QuotePage";
import PortfolioPage from "./components/Pages/Portfolio/PortfolioPage";
import PageNotFound from "./components/Pages/NotFound/PageNotFound";
import { Snackbar, Alert } from "@mui/material";
import HistoryPage from "./components/Pages/History/HistoryPage";
import AccountOps from "./components/Pages/AccountOps/AccountOps";

export default function App() {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [capital, setCapital] = useState(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("info");
  const [toastMessage, setToastMessage] = useState(null);

  const navigate = useNavigate();
  const portalElement = document.getElementById("overlays");

  useEffect(() => {
    var authData = localStorage.getItem("auth");
    if (authData !== null) {
      authData = JSON.parse(authData);
      const localUsername = authData.username;
      const localPassword = authData.password;
      handleLogin(localUsername, localPassword);
    }
  }, []);

  const openToast = (message, severity) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToast(true);
  };

  const closeToast = () => {
    setToastMessage(null);
    setToastSeverity("info");
    setToast(false);
  };

  const handleSignInClick = () => {
    setError(null);
    setShowLoginModal(true);
  };

  const handleSignOutClick = () => {
    setUser(null);
    setCapital(null);
    setPortfolio(null);
    localStorage.removeItem("auth");
    openToast("Logged out.", "info");
    navigate("/");
  };

  const handleSignUpClick = () => {
    setShowRegisterModal(true);
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setError(null);
  };

  const handleLogin = async (username, password) => {
    setLoading(true);
    fetch(endpoints().userLogin, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                username: username,
                password: password,
              })
            );

            setUser(response);
            setCapital(response.capital);
            setShowLoginModal(false);
            setLoading(false);
            openToast("Logged in as " + response.displayName, "success");
            updatePortfolio(response.id);
          });
        } else {
          return response.json().then((response) => {
            throw {
              status: response.status,
              message: response.message,
            };
          });
        }
      })
      .catch((responseError) => {
        setError(responseError);
        setLoading(false);
      });
  };

  const handleRegister = async (username, password, displayName, capital) => {
    setLoading(true);
    fetch(endpoints().userRegister, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        displayName: displayName,
        capital: capital,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            handleLogin(username, password);
            setShowRegisterModal(false);
            setLoading(false);
            openToast("Logged in as " + response.displayName, "success");
          });
        } else {
          return response.json().then((response) => {
            throw {
              status: response.status,
              message: response.message,
            };
          });
        }
      })
      .catch((responseError) => {
        setError(responseError);
        setLoading(false);
      });
  };

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
          });
        } else {
          return response.json().then((response) => {
            throw {
              status: response.status,
              message: response.message,
            };
          });
        }
      })
      .catch((responseError) => {
      });
  };

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, capital, setCapital, portfolio, setPortfolio }}
      >
        {showLoginModal &&
          ReactDOM.createPortal(
            <LoginModal
              show={showLoginModal}
              loading={loading}
              error={error}
              handleLogin={handleLogin}
              handleModalClose={handleModalClose}
            />,
            portalElement
          )}
        {showRegisterModal &&
          ReactDOM.createPortal(
            <RegisterModal
              show={showRegisterModal}
              loading={loading}
              error={error}
              handleRegister={handleRegister}
              handleModalClose={handleModalClose}
            />,
            portalElement
          )}
        {toast &&
          ReactDOM.createPortal(
            <>
              <Snackbar
                open={toast}
                autoHideDuration={3000}
                onClose={closeToast}
              >
                <Alert severity={toastSeverity}>{toastMessage}</Alert>
              </Snackbar>
            </>,
            portalElement
          )}
        <Navbar
          updatePortfolio={updatePortfolio}
          handleSignInClick={handleSignInClick}
          handleSignOutClick={handleSignOutClick}
          handleSignUpClick={handleSignUpClick}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={<QuotePage updatePortfolio={updatePortfolio} />}
          />
          <Route
            path="/get"
            element={<QuotePage updatePortfolio={updatePortfolio} />}
          />
          <Route
            path="/portfolio"
            element={<PortfolioPage updatePortfolio={updatePortfolio} />}
          />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/account" element={<AccountOps />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </>
  );
}
