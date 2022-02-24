import React from "react";
import { useState, useContext } from "react";
import UserContext from "../Context/UserContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Stack, Slider, Typography, Input } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function TransactionModalBuy(props) {
  const { capital, portfolio } = useContext(UserContext);
  const [value, setValue] = useState(0);
  const [quote, setQuote] = useState(props.quote);
  const [assetOwned, setAssetOwned] = useState(
    portfolio &&
      portfolio.filter((asset) => asset.stock.symbol === quote.symbol)
  );
  const [maxShares, setMaxShares] = useState(
    Math.floor(capital / quote.latestPrice)
  );
  const [newCapital, setNewCapital] = useState(capital);

  const clearModal = () => {
    props.handleModalClose();
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setNewCapital(capital - quote.latestPrice * Number(newValue));
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    if (
      Number(event.target.value) >= 0 &&
      Number(event.target.value) <= maxShares
    )
      setNewCapital(capital - quote.latestPrice * Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
      setNewCapital(capital - quote.latestPrice * 0);
    } else if (value > maxShares) {
      setValue(maxShares);
      setNewCapital(capital - quote.latestPrice * maxShares);
    }
  };

  const handleBuyStock = () => {
    props.handleTransaction(value, "BUY", quote.latestPrice);
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
            minWidth: "350px",
            maxWidth: "700px",
            backgroundColor: "white",
            border: "1px solid #000",
            boxShadow: 24,
          }}
        >
          <Stack sx={{ padding: "10px", alignItems: "center" }} spacing={2}>
            {props.error != null && (
              <Typography color="error" align="center" padding="5px">
                <h3>{props.error.status}</h3>
                <h3>{props.error.message}</h3>
              </Typography>
            )}
            {assetOwned.length > 0 ? (
              <Typography align="center" variant="h5">
                You own {assetOwned[0].shares} shares from {quote.companyName}
              </Typography>
            ) : (
              <Typography>
                You don't own any shares from {quote.companyName}
              </Typography>
            )}
            <Box
              spacing={1}
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Slider
                value={typeof value === "number" ? value : 0}
                min={0}
                max={maxShares}
                onChange={handleSliderChange}
                sx={{ width: "70%" }}
              />
              <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: maxShares,
                  type: "number",
                }}
              />
            </Box>
          </Stack>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack
              spacing={1.5}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Capital after transaction:</Typography>
              <Typography variant="h5">
                ${capital.toFixed(2)}
                {value > 0 && (
                  <>
                    {<NavigateNextIcon sx={{ verticalAlign: "middle" }} />}$
                    {newCapital.toFixed(2)}
                  </>
                )}
              </Typography>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  sx={{ width: "30%" }}
                  disabled={value <= 0}
                  onClick={handleBuyStock}
                >
                  Buy
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "30%" }}
                  onClick={clearModal}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
