import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { endpoints } from "../../constants/endpoints";
import UserContext from "../Context/UserContext";
import * as styles from "./Styles";

export default function Navbar(props) {
  const { user, setUser, capital, setCapital, portfolio, setPortfolio } =
    useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const portalElement = document.getElementById("overlays");

  useEffect(() => {}, [user, capital, portfolio]);

  const handleSignInClick = () => {
    setError(null);
    setShowLoginModal(true);
  };

  const handleSignOutClick = () => {
    setUser(null);
    setPortfolio(null);
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
            console.log(response);
            setUser(response);
            setCapital(response.capital);
            setShowLoginModal(false);
            setLoading(false);
            props.updatePortfolio(response.id);
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
            console.log(response);
            setUser(response);
            setCapital(response.capital);
            props.updatePortfolio(response.id);
            setShowRegisterModal(false);
            setLoading(false);
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
        setError(responseError);
        setLoading(false);
      });
  };

  const handleGetQuote = () => {
    navigate("/get");
  };

  const handleGetPortfolio = () => {
    navigate("/portfolio");
  };

  const handleGetHistory = () => {
    navigate("/history");
  };

  const handleGetAccountOps = () => {
    navigate("/account");
  };

  return (
    <>
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
      <Box sx={styles.styleNavbar}>
        <Box sx={{ padding: "5px" }}>
          <Typography variant="h5">Mock Stock Market</Typography>
        </Box>
        <Box sx={styles.styleNavbarTabs}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleGetQuote}>
              Get Quote
            </Button>
            <Button
              variant="contained"
              onClick={handleGetPortfolio}
              disabled={user === null}
            >
              My Portfolio
            </Button>
            <Button
              variant="contained"
              onClick={handleGetHistory}
              disabled={user === null}
            >
              Transaction History
            </Button>
          </Stack>
        </Box>
        <Box sx={styles.styleNavbarUserOperations}>
          {user ? (
            <>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Typography variant="h6">Hello, {user.displayName}</Typography>
                <Button variant="contained" color="success">
                  {capital && (
                    <Typography sx={{ fontWeight: "bold" }}>
                      $ {capital.toFixed(2)}
                    </Typography>
                  )}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ManageAccountsIcon />}
                  onClick={handleGetAccountOps}
                >
                  Account Operations
                </Button>
                <Button variant="outlined" onClick={handleSignOutClick}>
                  Sign Out
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Button variant="contained" onClick={handleSignInClick}>
                  Sign In
                </Button>
                <Button variant="outlined" onClick={handleSignUpClick}>
                  Sign Up
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
