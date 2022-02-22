import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { TimeUntil } from "../../../utilities/TimeUntil";

export default function Asset(props) {
  var now = new Date();

  return (
    <Box
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
        Last Update: {TimeUntil(props.asset.stock.lastUpdate, now).asString}
      </Typography>
    </Box>
  );
}
