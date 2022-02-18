import React, { useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function RegisterModal(props) {
  const username = useRef("");
  const password = useRef("");
  const displayName = useRef("");
  const capital = useRef(0);

  const clearModal = () => {
    username.current = "";
    password.current = "";
    displayName.current = "";
    capital.current = 0;
    props.handleModalClose();
  }

  const handleUsernameChange = (e) => {
    username.current = e.target.value;
  };

  const handlePasswordChange = (e) => {
    password.current = e.target.value;
  };

  const handleDisplayNameChange = (e) => {
    displayName.current = e.target.value;
  };

  const handleCapitalChange = (e) => {
    capital.current = e.target.value;
  };

  const handleRegisterClick = async () => {
    props.handleRegister(username.current, password.current, displayName.current, capital.current);
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
              <Typography color="error" align="center" padding="5px">
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
            <TextField
              label="Display Name"
              onChange={handleDisplayNameChange}
            ></TextField>
            <TextField
              label="Initial Capital"
              onChange={handleCapitalChange}
            ></TextField>
            <div align="center">
              <Button
                variant="contained"
                sx={{ width: "150px" }}
                onClick={handleRegisterClick}
                disabled={props.loading}
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
