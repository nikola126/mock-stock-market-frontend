import { Link, Stack, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import AddchartIcon from "@mui/icons-material/Addchart";

export default function Footer() {
  return (
    <>
      <Stack
        direction="column"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography align="center" variant="subtitle1">
          Mock Stock Market Project
        </Typography>
        <Typography align="center" variant="subtitle2">
          By Nikola Yordanov
        </Typography>
        <Typography align="center" variant="subtitle2">
          <GitHubIcon sx={{ verticalAlign: "middle" }}></GitHubIcon>
          <Link href="https://github.com/nikola126/mock-stock-market">
            Backend
          </Link>{" "}
          <GitHubIcon sx={{ verticalAlign: "middle" }}></GitHubIcon>
          <Link href="https://github.com/nikola126/mock-stock-market-frontend">
            Frontend
          </Link>{" "}
          <AddchartIcon sx={{ verticalAlign: "middle" }}></AddchartIcon>
          <Link href="https://iexcloud.io/">IEX Cloud</Link>
        </Typography>
      </Stack>
    </>
  );
}
