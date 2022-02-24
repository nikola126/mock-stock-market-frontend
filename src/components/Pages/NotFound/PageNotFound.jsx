import { Box, Typography } from "@mui/material";

export default function PageNotFound(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "10%",
      }}
    >
      <Typography variant="h2" align="center">
        404
      </Typography>
    </Box>
  );
}
