import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UserContext from "../Context/UserContext";
import * as styles from "./Styles";

export default function Navbar(props) {
  const { user, capital, portfolio } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {}, [user, capital, portfolio]);

  const handleSignInClick = () => {
    props.handleSignInClick();
  };

  const handleSignOutClick = () => {
    props.handleSignOutClick();
  };

  const handleSignUpClick = () => {
    props.handleSignUpClick();
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
      <Box sx={styles.styleNavbar}>
        <Box sx={{ padding: "5px" }}>
          <Typography variant="h5">Mock Stock Market</Typography>
          {user && (
            <Typography variant="h7">Hello {user.displayName}!</Typography>
          )}
        </Box>
        <Box sx={styles.styleNavbarTabs}>
          <Stack direction="row" spacing={1}>
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
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
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
