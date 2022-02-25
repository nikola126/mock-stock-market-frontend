import { Box, Button, Stack, Typography, Snackbar, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import { endpoints } from "../../../constants/endpoints";
import Quote from "./Quote";
import { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import * as styles from "./Styles";
import { getRandomInt } from "../../../utilities/RandInt";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useRef } from "react";
import TransactionModalBuy from "../../TransactionModal/TransactionModalBuy";
import TransactionModalSell from "../../TransactionModal/TransactionModalSell";

export default function QuotePage(props) {
  const { user, capital, setCapital } = useContext(UserContext);

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
  const [desiredAction, setDesiredAction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("info");
  const [toastMessage, setToastMessage] = useState(null);

  const quoteField = useRef("");

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
            setQuote(response);
            setError(null);
            setLoading(false);
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
        setQuote(null);
        setError(responseError);
        setLoading(false);
      });
  };

  const handleTransaction = (shares, action, latestPrice) => {
    const transaction = {
      userId: user.id,
      symbol: quote.symbol,
      companyName: quote.companyName,
      action: action,
      shares: shares,
    };

    var updatedCapital = capital;
    if (action === "BUY") {
      updatedCapital -= shares * latestPrice;
    } else if (action === "SELL") {
      updatedCapital += shares * latestPrice;
    }

    setLoading(true);
    fetch(endpoints().transactionAdd, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            props.updatePortfolio(user.id);
            setQuote(quote);
            setCapital(updatedCapital);
            setLoading(false);
            handleModalClose();
            if (action === "BUY") openToast("Purchase successful", "success");
            else openToast("Sale successfull", "success");
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

  const handleModalClose = () => {
    setShowTransactionModal(false);
    setError(null);
  };

  const handleClickBuy = () => {
    setDesiredAction("BUY");
    setShowTransactionModal(true);
  };

  const handleClickSell = () => {
    setDesiredAction("SELL");
    setShowTransactionModal(true);
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

  const navigate = useNavigate();
  const portalElement = document.getElementById("overlays");

  return (
    <>
      {showTransactionModal &&
        desiredAction === "BUY" &&
        ReactDOM.createPortal(
          <TransactionModalBuy
            show={showTransactionModal}
            handleModalClose={handleModalClose}
            handleTransaction={handleTransaction}
            quote={quote}
          />,
          portalElement
        )}
      {showTransactionModal &&
        desiredAction === "SELL" &&
        ReactDOM.createPortal(
          <TransactionModalSell
            show={showTransactionModal}
            error={error}
            handleModalClose={handleModalClose}
            handleTransaction={handleTransaction}
            quote={quote}
          />,
          portalElement
        )}
      {toast &&
        ReactDOM.createPortal(
          <>
            <Snackbar open={toast} autoHideDuration={3000} onClose={closeToast}>
              <Alert severity={toastSeverity}>{toastMessage}</Alert>
            </Snackbar>
          </>,
          portalElement
        )}
      <Box sx={{ width: "100%" }}>
        <Stack sx={styles.styleQuoteForm} spacing={"1%"}>
          {error ? (
            <Typography variant="h6" sx={{ color: "red" }}>
              {error}
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
        {quote && (
          <Quote
            quote={quote}
            handleClickBuy={handleClickBuy}
            handleClickSell={handleClickSell}
          />
        )}
      </Box>
    </>
  );
}
