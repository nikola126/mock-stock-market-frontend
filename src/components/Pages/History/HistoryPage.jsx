import { Box, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import HistoryEntry from "./HistoryEntry";
import UserContext from "../../Context/UserContext";
import { endpoints } from "../../../constants/endpoints";
import HistoryPanel from "./HistoryPanel";
import HistoryFooter from "./HistoryFooter";

export default function HistoryPage(props) {
  const { user, capital, setCapital, portfolio } = useContext(UserContext);

  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [pageSizeMenuOpened, setPageSizeMenuOpened] = useState(false);
  const [pageSizeMenuAnchor, setPageSizeMenuAnchor] = useState(null);
  const [pageSize, setPageSize] = useState(10);

  const [sortFieldMenuOpened, setSortFieldMenuOpened] = useState(false);
  const [sortFieldMenuAnchor, setSortFieldMenuAnchor] = useState(null);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  const [actions, setActions] = useState([]);
  // use reducer here instead of repeating states
  const [accountChipColor, setAccountChipColor] = useState("default");
  const [buyChipColor, setBuyChipColor] = useState("default");
  const [sellChipColor, setSellChipColor] = useState("default");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    if (user) getHistory();
  }, [user]);

  const getHistory = async () => {
    setLoading(true);
    fetch(
      endpoints().transactionGet +
        "?page=" +
        currentPage +
        "&size=" +
        pageSize +
        "&sort=" +
        sortField +
        "," +
        sortDirection,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          actions: actions.length > 0 ? actions : null,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            setHistory(response.content);
            setTotalPages(response.totalPages);
            setTotalTransactions(response.totalElements);
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
    getHistory();
  }, [currentPage, pageSize, sortDirection, sortField, actions]);

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

  const handleSortDirectionChange = () => {
    if (sortDirection === "desc") setSortDirection("asc");
    else setSortDirection("desc");
  };

  const handleSortFieldMenuOpen = (event) => {
    setSortFieldMenuAnchor(event.currentTarget);
    setSortFieldMenuOpened(true);
  };

  const handleSortFieldMenuClose = (event) => {
    if (event.currentTarget.dataset.hasOwnProperty("value")) {
      setSortField(event.currentTarget.dataset.value);
      setCurrentPage(0);
    }
    setSortFieldMenuOpened(false);
    setSortFieldMenuAnchor(null);
  };

  const handleChipClick = (event) => {
    const action = parseInt(event.currentTarget.dataset.value);
    var newActions = [...actions];

    switch (action) {
      case 0: {
        buyChipColor === "default"
          ? setBuyChipColor("primary")
          : setBuyChipColor("default");
        actions.includes(action)
          ? (newActions = actions.filter((item) => item !== action))
          : newActions.push(action);
        break;
      }
      case 1: {
        sellChipColor === "default"
          ? setSellChipColor("primary")
          : setSellChipColor("default");
        actions.includes(action)
          ? (newActions = actions.filter((item) => item !== action))
          : newActions.push(action);
        break;
      }
      case 2: {
        accountChipColor === "default"
          ? setAccountChipColor("primary")
          : setAccountChipColor("default");
        actions.includes(action)
          ? (newActions = actions.filter((item) => item !== action))
          : newActions.push(action);
        break;
      }
      default:
        break;
    }
    setActions(newActions);
    setCurrentPage(0);
  };

  return (
    <>
      {error && <Typography variant="error">{error}</Typography>}
      <HistoryPanel
        currentPage={currentPage}
        pageSize={pageSize}
        sortField={sortField}
        totalPages={totalPages}
        totalTransactions={totalTransactions}
        handlePrevPageClick={handlePrevPageClick}
        handleNextPageClick={handleNextPageClick}
        handlePageSizeMenuClose={handlePageSizeMenuClose}
        handlePageSizeMenuOpen={handlePageSizeMenuOpen}
        pageSizeMenuOpened={pageSizeMenuOpened}
        pageSizeMenuAnchor={pageSizeMenuAnchor}
        handleSortDirectionChange={handleSortDirectionChange}
        handleSortFieldMenuClose={handleSortFieldMenuClose}
        handleSortFieldMenuOpen={handleSortFieldMenuOpen}
        sortFieldMenuOpened={sortFieldMenuOpened}
        sortFieldMenuAnchor={sortFieldMenuAnchor}
        handleChipClick={handleChipClick}
        accountChipColor={accountChipColor}
        buyChipColor={buyChipColor}
        sellChipColor={sellChipColor}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1%",
        }}
      >
        {loading && (
          <Typography align="center" variant="h5">
            Fetching All Transactions...
          </Typography>
        )}
        {history.length > 0 ? (
          <>
            {history.map((entry) => (
              <HistoryEntry key={entry.date} entry={entry} />
            ))}
          </>
        ) : (
          <Typography align="center" variant="h5">
            No transactions with currently selected filters!
          </Typography>
        )}
      </Box>
      <HistoryFooter
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPageClick={handlePrevPageClick}
        handleNextPageClick={handleNextPageClick}
      />
    </>
  );
}
