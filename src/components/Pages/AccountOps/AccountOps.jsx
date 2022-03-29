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
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { endpoints } from "../../../constants/endpoints";
import {
  checkAlphaInput,
  checkNumericInput,
  checkAlphaNumericInput,
} from "../../../utilities/InputValidation";

export default function AccountOps() {
  const { user, setUser, capital, setCapital, portfolio, setPortfolio } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  const apiTokenTooltipText =
    "This application uses iexcloud.io to fetch financial data. You can provide your own token after registering there.";

  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passProvided, setPassProvided] = useState(false);
  const [choice, setChoice] = useState(0);
  const [applyButtonText, setApplyButtonText] = useState("Apply Changes");
  const [newValue, setNewValue] = useState(false);

  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordHelperText, setNewPasswordHelperText] = useState(null);
  const [newDisplayNameError, setNewDisplayNameError] = useState(false);
  const [newDisplayNameHelperText, setNewDisplayNameHelperText] =
    useState(null);
  const [newCapitalError, setNewCapitalError] = useState(false);
  const [newCapitalHelperText, setNewCapitalHelperText] = useState(null);

  // TODO Toasts not working, component dismounted after navigation
  const [toast, setToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("info");
  const [toastMessage, setToastMessage] = useState(null);

  const username = useRef(user && user.username);
  const password = useRef("");
  const newDisplayName = useRef("");
  const newCapital = useRef(0);
  const newPassword = useRef("");
  const newApiToken = useRef("");

  const handleChoiceChange = (e) => {
    setChoice(e.target.value);
    setNewPasswordError(false);
    setNewPasswordHelperText(null);
    setNewDisplayNameError(false);
    setNewDisplayNameHelperText(null);
    setNewCapitalError(false);
    setNewCapitalHelperText(null);
    setNewValue(false);
    if (e.target.value === "password") {
      setApplyButtonText("Apply and logout");
    } else {
      setApplyButtonText("Apply Changes");
    }
  };

  const handlePasswordChange = (e) => {
    password.current = e.target.value;
    if (password.current !== "") setPassProvided(true);
    else setPassProvided(false);
  };

  const handlePasswordBlur = () => {
    if (password.current === "") return;

    if (checkAlphaNumericInput(password.current)) {
      setPasswordError(false);
      setPasswordHelperText(null);
    } else {
      setPasswordError(true);
      setPasswordHelperText("Password must be at least 2 characters long!");
    }
  };

  const handleNewPasswordChange = (e) => {
    newPassword.current = e.target.value;
    if (newPassword.current !== "") {
      setNewValue(true);
      setError(null);
      if (checkAlphaNumericInput(newPassword.current)) {
        setNewPasswordError(false);
        setNewPasswordHelperText(null);
      } else {
        setNewPasswordError(true);
        setNewPasswordHelperText(
          "Password must be at least 2 characters long!"
        );
      }
    } else setNewValue(false);
  };

  const handleNewDisplayNameChange = (e) => {
    newDisplayName.current = e.target.value;
    if (newDisplayName.current !== "") {
      setNewValue(true);
      setError(null);
      if (checkAlphaInput(newDisplayName.current)) {
        setNewDisplayNameError(false);
        setNewDisplayNameHelperText(null);
      } else {
        setNewDisplayNameError(true);
        setNewDisplayNameHelperText(
          "Display name must be at least 2 characters long and contain only letters!"
        );
      }
    } else setNewValue(false);
  };

  const handleNewCapitalChange = (e) => {
    newCapital.current = e.target.value;
    if (newCapital.current !== "") {
      setNewValue(true);
      setError(null);
      if (checkNumericInput(newCapital.current)) {
        setNewCapitalError(false);
        setNewCapitalHelperText(null);
      } else {
        setNewCapitalError(true);
        setNewCapitalHelperText(
          "Capital must be numerical value between 1 and 99999!"
        );
      }
    } else setNewValue(false);
  };

  const handleNewApiTokenChange = (e) => {
    newApiToken.current = e.target.value;
    if (newApiToken.current !== "") {
      setNewValue(true);
      setError(null);
    } else setNewValue(false);
  };

  const handleAccountOperation = async () => {
    setLoading(true);

    var requestBody;
    if (choice === "password")
      requestBody = {
        username: username.current,
        password: password.current,
        newPassword: newPassword.current,
      };
    else if (choice === "displayName")
      requestBody = {
        username: username.current,
        password: password.current,
        newDisplayName: newDisplayName.current,
      };
    else if (choice === "capital")
      requestBody = {
        username: username.current,
        password: password.current,
        capitalChange: newCapital.current,
      };
    else if (choice === "token")
      requestBody = {
        username: username.current,
        password: password.current,
        newApiToken: newApiToken.current,
      };
    else {
      setError("invalid choice");
      setLoading(false);
      return;
    }

    fetch(endpoints().userEdit, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            setApplyButtonText("Apply changes");
            if (choice === "password") {
              setUser(null);
              setPortfolio(null);
              setCapital(null);
              openToast("Password updated!", "info");
              navigate("/");
            } else if (choice === "displayName") {
              // creates a deep copy to triger Navbar rerender
              var newUser = JSON.parse(JSON.stringify(user));
              newUser.displayName = newDisplayName.current;
              setUser(newUser);
              openToast("Display Name updated!", "success");
              navigate("/get");
            } else if (choice === "capital") {
              const changeCapital =
                Number(capital) + Number(newCapital.current);
              setCapital(changeCapital);
              openToast("Funds added", "success");
              navigate("/history");
            }
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
        setError(responseError.message);
        setLoading(false);
      });
  };

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

  const portalElement = document.getElementById("overlays");

  return (
    <>
      {toast &&
        ReactDOM.createPortal(
          <>
            <Snackbar
              open={toast}
              autoHideDuration={3000}
              onClose={closeToast}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity={toastSeverity}>{toastMessage}</Alert>
            </Snackbar>
          </>,
          portalElement
        )}
      {user && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2%",
            margin: "1%",
            borderRadius: "5px",
            boxShadow: 5,
          }}
        >
          {error && (
            <Typography color="error" variant="h6">
              {error}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              width: "300px",
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
              autoFocus
              label="password"
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={passwordError}
              helperText={passwordHelperText}
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
              <RadioGroup value={choice} onChange={handleChoiceChange}>
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
                <FormControlLabel
                  value="token"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      Change API Token
                      <Tooltip title={apiTokenTooltipText} placement="top">
                        <HelpOutlineIcon color="disabled" />
                      </Tooltip>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box
            sx={{
              minWidth: "200px",
              maxWidth: "30%",
              display: "flex",
              flexDirection: "column",
              padding: "1%",
            }}
          >
            {passProvided && choice === "password" && (
              <TextField
                label="New Password"
                onChange={handleNewPasswordChange}
                error={newPasswordError}
                helperText={newPasswordHelperText}
              ></TextField>
            )}
            {passProvided && choice === "displayName" && (
              <TextField
                label="New Display Name"
                onChange={handleNewDisplayNameChange}
                error={newDisplayNameError}
                helperText={newDisplayNameHelperText}
              ></TextField>
            )}
            {passProvided && choice === "capital" && (
              <TextField
                label="Funds to Add"
                onChange={handleNewCapitalChange}
                error={newCapitalError}
                helperText={newCapitalHelperText}
              ></TextField>
            )}
            {passProvided && choice === "token" && (
              <TextField
                label="New API Token"
                onChange={handleNewApiTokenChange}
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
                onClick={handleAccountOperation}
                disabled={
                  !newValue ||
                  !passProvided ||
                  loading ||
                  newPasswordError ||
                  newDisplayNameError ||
                  newCapitalError
                }
              >
                {applyButtonText}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
