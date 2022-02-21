import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as styles from "./Styles";

export default function Quote(props) {
  const quote = props.quote;
  const changePercent = parseFloat(quote.changePercent).toFixed(2);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={styles.styleQuoteComponent(changePercent >= 0)}>
        <Typography align="center" sx={styles.styleQuoteBackground}>
          {quote.symbol}
        </Typography>

        <Typography align="center">
          <Typography align="center">{quote.companyName}</Typography>
          <Typography align="center" variant="h3" sx={{ fontWeight: "bold" }}>
            ${quote.latestPrice}
          </Typography>
          {quote.change > 0 ? (
            <Typography
              variant="h5"
              sx={{ color: "green", fontWeight: "bold" }}
            >
              <ArrowUpwardIcon sx={{ verticalAlign: "middle" }} />
              {quote.change} ({changePercent}%)
            </Typography>
          ) : (
            <Typography variant="h5" sx={{ color: "red", fontWeight: "bold" }}>
              <ArrowDownwardIcon sx={{ verticalAlign: "middle" }} />
              {quote.change} ({changePercent}%)
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
}
