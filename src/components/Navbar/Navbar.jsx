import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import UserContext from "../Context/UserContext";
import * as styles from "./Styles";

export default function Navbar(props) {
  const { user, capital, networth, portfolio } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {}, [user, capital, networth, portfolio]);

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

  const handleGetHotlist = () => {
    navigate("/hotlist");
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
        <Stack direction="row" spacing={1} sx={styles.styleNavbarTabs}>
          <Button variant="contained" onClick={handleGetQuote}>
            Quote
          </Button>
          <Button variant="contained" onClick={handleGetHotlist}>
            HotList
          </Button>
          <Button
            variant="contained"
            onClick={handleGetPortfolio}
            disabled={user === null}
          >
            Portfolio
          </Button>
          <Button
            variant="contained"
            onClick={handleGetHistory}
            disabled={user === null}
          >
            History
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={styles.styleNavbarTabs}>
          {user ? (
            <>
              <Stack direction="row" spacing={1} sx={styles.styleNavbarTabs}>
                <Button variant="contained" color="success">
                  {capital && (
                    <Typography sx={{ fontWeight: "bold" }}>
                      Funds ${capital.toFixed(2)}
                    </Typography>
                  )}
                </Button>
                <Button variant="contained" color="success">
                  {networth && (
                    <Typography sx={{ fontWeight: "bold" }}>
                      Net ${networth.toFixed(2)}
                    </Typography>
                  )}
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} sx={styles.styleNavbarTabs}>
                <Button variant="contained" 
                onClick={handleGetAccountOps}>
                  Account
                </Button>
                <Button variant="outlined" onClick={handleSignOutClick}>
                  Sign Out
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={handleSignInClick}>
                Sign In
              </Button>
              <Button variant="outlined" onClick={handleSignUpClick}>
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}
