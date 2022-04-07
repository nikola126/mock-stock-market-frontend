import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

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
        ></Stack>
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Button variant="contained" onClick={props.handlePageSizeMenuOpen}>
              TOP {props.pageSize}
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
