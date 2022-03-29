import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import HotlistEntry from "./HotlistEntry";
import { endpoints } from "../../../constants/endpoints";
import HotlistPanel from "./HotlistPanel";

export default function HotListPage(props) {
  const [hotlistPaged, setHotlistPaged] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSizeMenuOpened, setPageSizeMenuOpened] = useState(false);
  const [pageSizeMenuAnchor, setPageSizeMenuAnchor] = useState(null);
  const [totalEntries, setTotalEntries] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getHotlistPaged = async () => {
    setLoading(true);
    fetch(
      endpoints().hotlistGet + "?page=" + currentPage + "&size=" + pageSize,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            setHotlistPaged(response.content);
            setTotalPages(response.totalPages);
            setTotalEntries(response.totalElements);
            setLoading(false);
            setError(null);
          });
        } else {
          return response.json().then((response) => {
            throw {
              status: response.status,
              message: response.message,
            };
          });
        }
      })
      .catch((responseError) => {
        setError(responseError.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getHotlistPaged();
  }, [currentPage, pageSize]);

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPageClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageSizeMenuOpen = (event) => {
    setPageSizeMenuAnchor(event.currentTarget);
    setPageSizeMenuOpened(true);
  };

  const handlePageSizeMenuClose = (event) => {
    if (event.currentTarget.dataset.hasOwnProperty("value")) {
      setPageSize(event.currentTarget.dataset.value);
      setCurrentPage(0);
    }
    setPageSizeMenuOpened(false);
    setPageSizeMenuAnchor(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1%",
        }}
      >
        <Typography align="center" variant="h5">
          Most Popular Stocks
        </Typography>

        {error && <Typography variant="error">{error}</Typography>}
        {hotlistPaged && hotlistPaged.length > 0 && (
          <>
            <HotlistPanel
              currentPage={currentPage}
              pageSize={pageSize}
              totalPages={totalPages}
              totalEntries={totalEntries}
              handlePrevPageClick={handlePrevPageClick}
              handleNextPageClick={handleNextPageClick}
              handlePageSizeMenuClose={handlePageSizeMenuClose}
              handlePageSizeMenuOpen={handlePageSizeMenuOpen}
              pageSizeMenuOpened={pageSizeMenuOpened}
              pageSizeMenuAnchor={pageSizeMenuAnchor}
            />
            <Box
              sx={{
                minWidth: "350px",
                maxWidth: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography align="left" variant="h6" sx={{ width: "30%" }}>
                Users
              </Typography>
              <Typography align="center" variant="h6" sx={{ width: "30%" }}>
                Symbol
              </Typography>
              <Typography align="right" variant="h6" sx={{ width: "40%" }}>
                Name
              </Typography>
            </Box>
            {hotlistPaged.map((entry) => (
              <HotlistEntry key={entry.stockSymbol} entry={entry} />
            ))}
          </>
        )}
        {hotlistPaged && hotlistPaged.length === 0 && (
          <>
            <Typography align="center" variant="h6">
              No data yet!
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}
