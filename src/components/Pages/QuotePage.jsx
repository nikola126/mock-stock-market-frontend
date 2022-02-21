import { Box, Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { endpoints } from "../../constants/endpoints";
import Quote from "./Quote";
import { useState, useEffect, useContext } from "react";
import UserContext from "../Context/UserContext";
import * as styles from "./Styles";
import { getRandomInt } from "../../utilities/RandInt";
import { useRef } from "react";

export default function QuotePage() {
  const { user, setUser } = useContext(UserContext);

  const placeHolderSymbols = [
    "AMZN",
    "HON",
    "KHC",
    "CSCO",
    "MSFT",
    "AEP",
    "AAPL",
    "MDLZ",
    "NFLX",
    "TXN",
    "PEP",
    "QCOM",
  ];
  const [stockPlaceHolder, setStockPlaceHolder] = useState(
    placeHolderSymbols[getRandomInt(placeHolderSymbols.length)]
  );

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const quoteField = useRef("");

  // useEffect(() => {
  //   setQuote(null);
  // }, []);

  const handleQuoteFieldChange = (e) => {
    quoteField.current = e.target.value;
    if (e.target.value === "") setButtonDisabled(true);
    else setButtonDisabled(false);
  };

  const handleGetQuote = async () => {
    setLoading(true);
    fetch(endpoints().stockGet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: quoteField.current }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            console.log(response);
            setQuote(response);
            setError(null);
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
        setQuote(null);
        setError(responseError);
        setLoading(false);
      });
  };

  return (
    <>
      <Stack sx={styles.styleQuoteForm} spacing={"1%"}>
        {error ? (
          <Typography variant="h6" sx={{ color: "red" }}>
            {error.message}
          </Typography>
        ) : (
          <Typography variant="h6">
            Enter Quote to get real-time data
          </Typography>
        )}
        <TextField
          placeholder={stockPlaceHolder}
          onChange={handleQuoteFieldChange}
        ></TextField>
        <Button
          variant="contained"
          disabled={buttonDisabled || loading}
          onClick={handleGetQuote}
        >
          Get Quote
        </Button>
      </Stack>
      {quote && <Quote quote={quote} />}
    </>
  );
}
