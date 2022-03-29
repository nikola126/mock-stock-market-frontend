import { Typography, Card, Stack } from "@mui/material";

export default function HotlistEntry(props) {
  return (
    <Card
      key={props.entry.stockSymbol}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        margin: "5px 5px 5px 5px",
        minWidth: "350px",
        maxWidth: "90%",
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
        <Typography align="left" sx={{width:"30%"}}>{props.entry.usersOwning}</Typography>
        <Typography align="center" sx={{width:"30%"}}>{props.entry.stockSymbol}</Typography>
        <Typography align="right" sx={{width:"40%"}}>
        {props.entry.stockName.length > 15
          ? props.entry.stockName.substring(0, 15) + "..."
          : props.entry.stockName}
        </Typography>
      </Stack>
    </Card>
  );
}
