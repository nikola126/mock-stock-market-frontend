import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import * as styles from "./Styles";
import UserContext from "../../Context/UserContext";

export default function Quote(props) {
  const { user, capital, portfolio } = useContext(UserContext);
  const quote = props.quote;
  const changePercent = parseFloat(quote.changePercent).toFixed(2);
  const [ableToBuy, setAbleToBuy] = useState(quote.latestPrice < capital);
  const [ableToSell, setAbleToSell] = useState(
    portfolio &&
      portfolio.filter(
        (asset) => asset.stock.symbol === quote.symbol && asset.shares > 0
      ).length
  );

  useEffect(() => {
    setAbleToBuy(quote.latestPrice < capital);
    setAbleToSell(
      portfolio &&
        portfolio.filter(
          (asset) => asset.stock.symbol === quote.symbol && asset.shares > 0
        ).length
    );
  }, [user, capital, portfolio, props.quote]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card
        variant="outlined"
        sx={styles.styleQuoteComponent(quote.change >= 0)}
      >
        <Typography
          align="center"
          component={"span"}
          sx={styles.styleQuoteBackground}
        >
          {quote.symbol}
        </Typography>
        <CardContent>
          <Box sx={styles.styleQuoteContent()}>
            <Typography component={"span"} align="center">
              <Typography align="center">{quote.companyName}</Typography>
              <Typography
                align="center"
                variant="h3"
                sx={{ fontWeight: "bold" }}
              >
                ${quote.latestPrice.toFixed(2)}
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
                <Typography
                  variant="h5"
                  sx={{ color: "red", fontWeight: "bold" }}
                >
                  <ArrowDownwardIcon sx={{ verticalAlign: "middle" }} />
                  {quote.change} ({changePercent}%)
                </Typography>
              )}
            </Typography>
          </Box>
        </CardContent>
        {user && (
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1px",
              width: "60%",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              onClick={props.handleClickBuy}
              disabled={!ableToBuy}
            >
              Buy
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={props.handleClickSell}
              disabled={!(ableToSell > 0)}
            >
              Sell
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
