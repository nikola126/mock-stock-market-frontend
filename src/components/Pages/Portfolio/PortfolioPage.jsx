import { Box, Grid, Typography, Snackbar, Alert } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import UserContext from "../../Context/UserContext";
import Asset from "./Asset";
import TransactionModalBuy from "../../TransactionModal/TransactionModalBuy";
import TransactionModalSell from "../../TransactionModal/TransactionModalSell";
import { endpoints } from "../../../constants/endpoints";

export default function PortfolioPage(props) {
  const { user, capital, setCapital, portfolio } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState(null);
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("info");
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (user) props.updatePortfolio(user.id);
  }, []);

  const handleUpdateClick = (symbol) => {
    setLoading(true);
    updateStock(symbol);
    setLoading(false);
  };

  const handleClickBuy = (asset) => {
    setQuote({
      symbol: asset.stock.symbol,
      companyName: asset.stock.name,
      latestPrice: asset.stock.price,
    });
    setAction("BUY");
    setShowModal(true);
  };

  const handleClickSell = (asset) => {
    setQuote({
      symbol: asset.stock.symbol,
      companyName: asset.stock.name,
      latestPrice: asset.stock.price,
    });
    setAction("SELL");
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError(null);
  };

  const updateStock = async (symbol) => {
    fetch(endpoints().stockUpdate, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol: symbol }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            props.updatePortfolio(user.id);
            openToast(symbol + " price updated.", "info");
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

  const handleTransaction = async (shares, action, latestPrice) => {
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
            setQuote(null);
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
        handleModalClose();
        setError(responseError.message);
        setLoading(false);
      });
  };

  const portalElement = document.getElementById("overlays");

  return (
    <>
      {showModal &&
        action === "BUY" &&
        ReactDOM.createPortal(
          <TransactionModalBuy
            show={showModal}
            handleModalClose={handleModalClose}
            handleTransaction={handleTransaction}
            quote={quote}
          />,
          portalElement
        )}
      {showModal &&
        action === "SELL" &&
        ReactDOM.createPortal(
          <TransactionModalSell
            show={showModal}
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
      {error && (
        <Typography align="center" variant="h6">
          {error}
        </Typography>
      )}
      {loading && (
        <Typography align="center" variant="h6">
          Loading
        </Typography>
      )}
      {portfolio && (
        <Box sx={{ padding: "5%" }}>
          {portfolio.length > 0 ? (
            <Grid container columns={{ md: 2, lg: 2 }}>
              {portfolio.map((asset) => (
                <Asset
                  key={asset.stock.lastUpdate}
                  asset={asset}
                  handleUpdateClick={handleUpdateClick}
                  handleClickBuy={handleClickBuy}
                  handleClickSell={handleClickSell}
                  loading={loading}
                />
              ))}
            </Grid>
          ) : (
            <Typography align="center" variant="h5">
              You don't own any stocks yet! Click Get Quote and start trading!
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}
