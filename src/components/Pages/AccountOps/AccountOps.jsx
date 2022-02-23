import {
  Box,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../Context/UserContext";

export default function AccountOps() {
  const { user, setUser, capital, setCapital, portfolio, setPortfolio } =
    useContext(UserContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passProvided, setPassProvided] = useState(false);
  const [choice, setChoice] = useState(0);
  const [newValue, setNewValue] = useState(false);

  const username = useRef("");
  const password = useRef("");
  const newDisplayName = useRef("");
  const newCapital = useRef(0);
  const newPassword = useRef("");

  const handleChangeChange = (e) => {
    setChoice(e.target.value);
    setNewValue(false);
  };

  const handleUsernameChange = (e) => {
    username.current = e.target.value;
  };

  const handlePasswordChange = (e) => {
    password.current = e.target.value;
    if (password.current !== "") setPassProvided(true);
    else setPassProvided(false);
  };

  const handleNewPasswordChange = (e) => {
    newPassword.current = e.target.value;
    if (newPassword.current !== "") setNewValue(true);
    else setNewValue(false);
  };

  const handleNewDisplayNameChange = (e) => {
    newDisplayName.current = e.target.value;
    if (newDisplayName.current !== "") setNewValue(true);
    else setNewValue(false);
  };

  const handleNewCapitalChange = (e) => {
    newCapital.current = e.target.value;
    if (newCapital.current !== "") setNewValue(true);
    else setNewValue(false);
  };

  return (
    <>
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2%",
            margin: "1%",
            // border: "1px solid #000",
            borderRadius: "5px",
            boxShadow: 5,
          }}
        >
          {error && <Typography>{error}</Typography>}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1%",
              margin: "1%",
            }}
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              label="username"
              disabled={true}
              value={user.username}
            ></TextField>
            <br />
            <TextField
              label="password"
              onChange={handlePasswordChange}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl disabled={!passProvided}>
              <FormLabel>Account Operations</FormLabel>
              <RadioGroup value={choice} onChange={handleChangeChange}>
                <FormControlLabel
                  value="password"
                  control={<Radio />}
                  label="Change Password"
                />
                <FormControlLabel
                  value="displayName"
                  control={<Radio />}
                  label="Change Display Name"
                />
                <FormControlLabel
                  value="capital"
                  control={<Radio />}
                  label="Add Funds"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1%",
            }}
          >
            {passProvided && choice === "password" && (
              <TextField
                label="New password"
                onChange={handleNewPasswordChange}
              ></TextField>
            )}
            {passProvided && choice === "displayName" && (
              <TextField
                label="New Display Name"
                onChange={handleNewDisplayNameChange}
              ></TextField>
            )}
            {passProvided && choice === "capital" && (
              <TextField
                label="Funds to Add"
                onChange={handleNewCapitalChange}
              ></TextField>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "4%",
              }}
            >
              <Button
                variant="contained"
                disabled={!newValue || !passProvided || error}
              >
                Apply Changes
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
