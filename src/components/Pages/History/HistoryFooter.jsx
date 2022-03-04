import { Box, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function HistoryFooter(props) {
  return (
    <>
      {props.totalPages > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            variant="contained"
            color="primary"
            onClick={props.handlePrevPageClick}
            disabled={props.currentPage === 0 || props.totalPages === 0}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Typography align="center" variant="h5">
            {props.currentPage + 1}/{props.totalPages}
          </Typography>
          <IconButton
            variant="contained"
            color="primary"
            onClick={props.handleNextPageClick}
            disabled={
              props.currentPage === props.totalPages - 1 ||
              props.totalPages === 0
            }
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}
