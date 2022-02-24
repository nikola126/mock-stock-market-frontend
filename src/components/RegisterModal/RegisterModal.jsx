import React, { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  checkAlphaInput,
  checkNumericInput,
  checkAlphaNumericInput,
} from "../../utilities/InputValidation";

export default function RegisterModal(props) {
  const username = useRef("");
  const password = useRef("");
  const displayName = useRef("");
  const capital = useRef(0);

  const [usernameProvided, setUsernameProvided] = useState(false);
  const [passwordProvided, setPasswordProvided] = useState(false);
  const [displayNameProvided, setDisplayNameProvided] = useState(false);
  const [capitalProvided, setCapitalProvided] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(null);

  const [displayNameError, setDisplayNameError] = useState(false);
  const [displayNameHelperText, setDisplayNameHelperText] = useState(null);
  const [capitalError, setCapitalError] = useState(false);
  const [capitalHelperText, setCapitalHelperText] = useState(null);

  const clearModal = () => {
    username.current = "";
    password.current = "";
    displayName.current = "";
    capital.current = 0;
    props.handleModalClose();
  };

  const handleUsernameChange = (e) => {
    username.current = e.target.value;
    if (checkAlphaInput(e.target.value)) setUsernameProvided(true);
    else setUsernameProvided(false);
  };

  const handlePasswordChange = (e) => {
    password.current = e.target.value;
    if (checkAlphaNumericInput(e.target.value)) setPasswordProvided(true);
    else setPasswordProvided(false);
  };

  const handleDisplayNameChange = (e) => {
    displayName.current = e.target.value;
    if (checkAlphaNumericInput(e.target.value)) setDisplayNameProvided(true);
    else setDisplayNameProvided(false);
  };

  const handleCapitalChange = (e) => {
    capital.current = e.target.value;
    if (checkNumericInput(e.target.value)) setCapitalProvided(true);
    else setCapitalProvided(false);
  };

  const handleUsernameBlur = () => {
    if (checkAlphaInput(username.current)) {
      setUsernameError(false);
      setUsernameHelperText(null);
    } else {
      setUsernameError(true);
      setUsernameHelperText(
        "Username must be at least 2 characters long and contain only letters!"
      );
    }
  };

  const handlePasswordBlur = () => {
    if (checkAlphaNumericInput(password.current)) {
      setPasswordError(false);
      setPasswordHelperText(null);
    } else {
      setPasswordError(true);
      setPasswordHelperText("Password must be at least 2 characters long!");
    }
  };

  const handleDisplayNameBlur = (e) => {
    if (checkAlphaInput(displayName.current)) {
      setDisplayNameError(false);
      setDisplayNameHelperText(null);
    } else {
      setDisplayNameError(true);
      setDisplayNameHelperText(
        "Display name must be at least 2 characters long and contain only letters!"
      );
    }
  };

  const handleCapitalBlur = (e) => {
    if (checkNumericInput(capital.current)) {
      setCapitalError(false);
      setCapitalHelperText(null);
    } else {
      setCapitalError(true);
      setCapitalHelperText(
        "Starting capital must be numerical value between 1 and 99999!"
      );
    }
  };

  const handleRegisterClick = async () => {
    props.handleRegister(
      username.current,
      password.current,
      displayName.current,
      capital.current
    );
  };

  return (
    <>
      <Modal open={props.show} onClose={clearModal}>
        <Box
          sx={{
            position: "absolute",
            display: "inline",
            padding: "2%",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "350px",
            maxWidth: "700px",
            backgroundColor: "white",
            border: "1px solid #000",
            boxShadow: 24,
          }}
        >
          <Stack sx={{ padding: "10px" }} spacing={4}>
            {props.error && (
              <Typography
                color="error"
                align="center"
                padding="5px"
                variant="h5"
              >
                {props.error.message}
              </Typography>
            )}
            <TextField
              label="Username"
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              error={usernameError}
              helperText={usernameHelperText}
            ></TextField>
            <TextField
              label="Password"
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={passwordError}
              helperText={passwordHelperText}
            ></TextField>
            <TextField
              label="Display Name"
              onChange={handleDisplayNameChange}
              onBlur={handleDisplayNameBlur}
              error={displayNameError}
              helperText={displayNameHelperText}
            ></TextField>
            <TextField
              label="Initial Capital"
              onChange={handleCapitalChange}
              onBlur={handleCapitalBlur}
              error={capitalError}
              helperText={capitalHelperText}
            ></TextField>
            <div align="center">
              <Button
                variant="contained"
                sx={{ width: "150px" }}
                onClick={handleRegisterClick}
                disabled={
                  props.loading ||
                  !usernameProvided ||
                  !passwordProvided ||
                  !displayNameProvided ||
                  !capitalProvided
                }
              >
                Register
              </Button>
            </div>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
