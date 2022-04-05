import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardActions,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import UserContext from "../../Context/UserContext";
import { TimeUntil } from "../../../utilities/TimeUntil";

export default function Asset(props) {
  const { capital } = useContext(UserContext);

  const handleUpdate = () => {
    props.handleUpdateClick(props.asset.stock.symbol);
  };

  const handleBuy = () => {
    props.handleClickBuy(props.asset);
  };

  const handleSell = () => {
    props.handleClickSell(props.asset);
  };

  const determineCardBackgroundColor = () => {
    const profitIfSold = props.asset.totalCost + props.asset.currentReturn;

    if (profitIfSold > 0.01) {
      return "linear-gradient(to top, white, white, white, white, #91ffa2)";
    } else if (profitIfSold < -0.01) {
      return "linear-gradient(to top, white, white, white, white, #ff6161)";
    } else {
      return "white";
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1%",
          margin: "1% 1% 1% 1%",
          minWidth: "100px",
          maxWidth: "150px",
          background: determineCardBackgroundColor(),
          border: "1px solid #000",
          borderRadius: "10px",
          boxShadow: 10,
          position: "relative",
        }}
      >
        <Typography variant="h5" align="center">
          {props.asset.stock.symbol}
        </Typography>
        <Typography variant="h7" align="center">
          {props.asset.stock.name.length > 15
            ? props.asset.stock.name.substring(0, 15) + "..."
            : props.asset.stock.name}
        </Typography>
        <Typography variant="h7" align="center">
          Latest price: {props.asset.stock.price}
        </Typography>
        <Typography variant="h5" align="center">
          Shares: {props.asset.shares}
        </Typography>
        <Typography variant="h7" align="center">
          Return: $
          {(props.asset.totalCost + props.asset.currentReturn).toFixed(2)}
        </Typography>
        <Typography variant="h8" align="center">
          Updated:{" "}
          {TimeUntil(props.asset.stock.lastUpdate, props.currentTime).asString}
          <IconButton size="small" onClick={handleUpdate}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Typography>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1px",
            width: "80%",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={handleBuy}
            disabled={props.asset.stock.price > capital || props.loading}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleSell}
            disabled={props.loading}
          >
            Sell
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
