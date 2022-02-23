import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardActions,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { TimeUntil } from "../../../utilities/TimeUntil";

export default function Asset(props) {
  var now = new Date();

  const handleUpdate = () => {
    props.handleUpdateClick(props.asset.stock.symbol);
  };

  const handleBuy = () => {
    props.handleClickBuy(props.asset);
  };

  const handleSell = () => {
    props.handleClickSell(props.asset);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1%",
        margin: "1% 1% 1% 1%",
        width: "20%",
        backgroundColor: "white",
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
        {props.asset.stock.name}
      </Typography>
      <Typography variant="h7" align="center">
        Latest price: {props.asset.stock.price}
      </Typography>
      <Typography variant="h5" align="center">
        Shares: {props.asset.shares}
      </Typography>
      <Typography variant="h8" align="center">
        Updated: {TimeUntil(props.asset.stock.lastUpdate, now).asString}
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
        <Button variant="contained" size="small" onClick={handleBuy}>
          Buy
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleSell}
        >
          Sell
        </Button>
      </CardActions>
    </Card>
  );
}
