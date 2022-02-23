import { useState } from "react";
import { Typography, Card, Stack } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function HistoryEntry(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const date = new Date(props.entry.date);

  return (
    <Card
      key={props.entry.date % 1000}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "1% 1% 0.2% 1%",
        minWidth: "40%",
        maxWidth: "45%",
        height: "50px",
        backgroundColor: "white",
        border: "1px solid #000",
        borderRadius: "5px",
        boxShadow: 5,
        position: "relative",
        "&:hover": { backgroundColor: "#e0e0e0" },
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {props.entry.action === "BUY" ? (
          <>
            <AddCircleOutlineIcon fontSize="large" />
            <Typography variant="h7">
              {props.entry.symbol} <br />
              {props.entry.companyName.substring(0, 10)}...
            </Typography>
            <Typography variant="p">
              {props.entry.shares} shares
              <br />${props.entry.price.toFixed(2)}
            </Typography>
            <Typography variant="p">
              Total:
              <br />${(props.entry.shares * props.entry.price).toFixed(2)}
            </Typography>
          </>
        ) : (
          <>
            {props.entry.action === "SELL" ? (
              <>
                <RemoveCircleOutlineIcon fontSize="large" />
                <Typography variant="h7">
                  {props.entry.symbol} <br />
                  {props.entry.companyName.substring(0, 10)}...
                </Typography>
                <Typography variant="p">
                  {props.entry.shares} shares
                  <br />${props.entry.price.toFixed(2)}
                </Typography>
                <Typography variant="p">
                  Total:
                  <br />${(props.entry.shares * props.entry.price).toFixed(2)}
                </Typography>
              </>
            ) : (
              <>
                <AccountBalanceIcon fontSize="large" />
                <Typography variant="p">Deposit</Typography>
                <Typography variant="p">Account</Typography>
                <Typography variant="p">
                  Total:
                  <br />${props.entry.price.toFixed(2)}
                </Typography>
              </>
            )}
          </>
        )}
        <Typography variant="p">{date.toLocaleDateString()}</Typography>
      </Stack>
    </Card>
  );
}
