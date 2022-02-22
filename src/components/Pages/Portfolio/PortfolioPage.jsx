import { Box, Grid } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import Asset from "./Asset";

export default function PortfolioPage(props) {
  const { user, capital, portfolio } = useContext(UserContext);

  useEffect(() => {
    props.updatePortfolio(user.id);
  }, []);

  return (
    <>
      <Box sx={{ padding: "5%" }}>
        {portfolio && (
          <Grid container columns={{ md: 2, lg: 2 }}>
            {portfolio.map((asset) => (
              <Asset asset={asset} />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
