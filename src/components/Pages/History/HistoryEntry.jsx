import { useState } from "react";
import { Typography, Card, Stack, Box } from "@mui/material";
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
      key={props.entry.date / 1000}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "1% 1% 0.2% 1%",
        minWidth: "90%",
        // maxWidth: "700px",
        height: "50px",
        backgroundColor: "white",
        border: "1px solid #000",
        borderRadius: "5px",
        boxShadow: 5,
        position: "relative",
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
            <Box
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "5rem",
              }}
            >
              <Typography noWrap variant="h7">
                {props.entry.symbol} <br />
                {props.entry.companyName}
              </Typography>
            </Box>
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
                <Box
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "5rem",
                  }}
                >
                  <Typography noWrap variant="h7">
                    {props.entry.symbol} <br />
                    {props.entry.companyName}
                  </Typography>
                </Box>
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
                <Box
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "3rem",
                  }}
                >
                  <Typography variant="p">Acc</Typography>
                </Box>
                <Typography variant="p">Deposit</Typography>
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
