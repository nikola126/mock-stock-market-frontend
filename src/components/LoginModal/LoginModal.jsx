import React, { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  checkAlphaInput,
  checkNumericInput,
  checkAlphaNumericInput,
} from "../../utilities/InputValidation";

export default function LoginModal(props) {
  const username = useRef("");
  const password = useRef("");
  const [usernameProvided, setUsernameProvided] = useState(false);
  const [passwordProvided, setPasswordProvided] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(null);

  const clearModal = () => {
    username.current = "";
    password.current = "";
    props.handleModalClose();
  };

  const handleUsernameChange = (e) => {
    username.current = e.target.value;
    if (checkAlphaInput(e.target.value)) setUsernameProvided(true);
    else setUsernameProvided(false);
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

  const handlePasswordChange = (e) => {
    password.current = e.target.value;
    if (checkAlphaNumericInput(e.target.value)) setPasswordProvided(true);
    else setPasswordProvided(false);
  };

  const handleSignInClick = () => {
    props.handleLogin(username.current, password.current);
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
            width: "30%",
            backgroundColor: "white",
            border: "1px solid #000",
            boxShadow: 24,
          }}
        >
          <Stack sx={{ padding: "10px" }} spacing={4}>
            {props.error != null && (
              <Typography
                color="error"
                align="center"
                padding="1px"
                variant="h6"
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
            <div align="center">
              <Button
                variant="contained"
                sx={{ width: "150px" }}
                onClick={handleSignInClick}
                disabled={
                  props.loading || !usernameProvided || !passwordProvided
                }
              >
                Sign In
              </Button>
            </div>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
