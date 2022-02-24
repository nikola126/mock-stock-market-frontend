import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import HistoryEntry from "./HistoryEntry";
import UserContext from "../../Context/UserContext";
import { endpoints } from "../../../constants/endpoints";

export default function HistoryPage(props) {
  const { user, capital, setCapital, portfolio } = useContext(UserContext);

  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getHistory = async () => {
    setLoading(true);
    fetch(endpoints().transactionGet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            setHistory(response);
            console.log(response);
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
        setError(responseError.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2%",
          // width: "100%",
        }}
      >
        {loading && (
          <Typography align="center" variant="h5">
            Fetching All Transactions...
          </Typography>
        )}
        {history && (
          <>
            {history.map((entry) => (
              <HistoryEntry entry={entry} />
            ))}
          </>
        )}
      </Box>
    </>
  );
}
