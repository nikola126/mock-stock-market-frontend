import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { hostUrl } from "../../constants/hostUrl";
import { endpoints } from "../../constants/endpoints";
import UserContext from "../Context/UserContext";

export default function Navbar(props) {
  const { user, setUser } = useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignInClick = () => {
    setError(null);
    setShowLoginModal(true);
  };

  const handleSignOutClick = () => {
    setUser(null);
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
    fetch(endpoints(hostUrl).userLogin, {
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
            setShowLoginModal(false);
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

  const handleRegister = async (username, password, displayName, capital) => {
    setLoading(true);
    fetch(endpoints(hostUrl).userRegister, {
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

  return (
    <>
      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          loading={loading}
          error={error}
          handleLogin={handleLogin}
          handleModalClose={handleModalClose}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          show={showRegisterModal}
          loading={loading}
          error={error}
          handleRegister={handleRegister}
          handleModalClose={handleModalClose}
        ></RegisterModal>
      )}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ padding: "5px" }}>
          <Typography variant="h5">Mock Stock Market</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ padding: "5px" }}>
            {user ? (
              <>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
                  <Typography variant="h6">
                    Hello, {user.displayName}
                  </Typography>
                  <Button variant="contained" color="success">
                    <Typography sx={{ fontWeight: "bold" }}>
                      $ {user.capital}
                    </Typography>
                  </Button>
                  <Button variant="outlined" onClick={handleSignOutClick}>
                    Sign Out
                  </Button>
                </Stack>
              </>
            ) : (
              <>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ alignItems: "center" }}
                >
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
      </Box>
    </>
  );
}
