import React, { useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function LoginModal(props) {
  const username = useRef("");
  const password = useRef("");

  const clearModal = () => {
    username.current = "";
    password.current = "";
    props.handleModalClose();
  }

  const handleUsernameChange = (e) => {
    username.current = e.target.value;
  };

  const handlePasswordChange = (e) => {
    password.current = e.target.value;
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
            padding: "5px",
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
          <Stack sx={{ padding: "10px" }} spacing={2}>
            {props.error && (
              <Typography color="error" align="center" padding="1px">
                <h3>{props.error.status}</h3>
                <h3>{props.error.message}</h3>
              </Typography>
            )}
            <TextField
              label="Username"
              onChange={handleUsernameChange}
            ></TextField>
            <TextField
              label="Password"
              onChange={handlePasswordChange}
            ></TextField>
            <div align="center">
              <Button
                variant="contained"
                sx={{ width: "150px" }}
                onClick={handleSignInClick}
                disabled={props.loading}
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
