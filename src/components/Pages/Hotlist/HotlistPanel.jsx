import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Typography,
  } from "@mui/material";
  import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  
  export default function HotlistPanel(props) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            padding: "1%",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
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
            <Typography variant="h6" sx={{ padding: "10px" }}>
              Total Stocks: {props.totalEntries}
            </Typography>
          </Stack>
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Button variant="outlined" onClick={props.handlePageSizeMenuOpen}>
                per page: {props.pageSize}
              </Button>
              <Menu
                anchorEl={props.pageSizeMenuAnchor}
                open={props.pageSizeMenuOpened}
                onClose={props.handlePageSizeMenuClose}
              >
                <MenuItem onClick={props.handlePageSizeMenuClose} data-value={5}>
                  5
                </MenuItem>
                <MenuItem onClick={props.handlePageSizeMenuClose} data-value={10}>
                  10
                </MenuItem>
                <MenuItem onClick={props.handlePageSizeMenuClose} data-value={20}>
                  20
                </MenuItem>
                <MenuItem onClick={props.handlePageSizeMenuClose} data-value={50}>
                  50
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        </Box>
      </>
    );
  }
  