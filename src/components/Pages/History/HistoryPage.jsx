import { Box, Typography } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import HistoryEntry from "./HistoryEntry";
import HistoryPlot from "./HistoryPlot";
import NetworthPlot from "./NetworthPlot";
import UserContext from "../../Context/UserContext";
import { endpoints } from "../../../constants/endpoints";
import HistoryPanel from "./HistoryPanel";
import HistoryFooter from "./HistoryFooter";

export default function HistoryPage(props) {
  const { user, capital, setCapital, portfolio } = useContext(UserContext);

  const [history, setHistory] = useState(null);
  const [networth, setNetworth] = useState(null);
  const [networthCurrent, setNetworthCurrent] = useState(null);
  const [historyPaged, setHistoryPaged] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [showPlot, setShowPlot] = useState(false);

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
    if (user) {
      getHistoryPaged();
      getHistory();
      getNetWorth();
    }
  }, [user]);

  const getHistoryPaged = async () => {
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
            setHistoryPaged(response.content);
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

  const getHistory = async () => {
    setLoading(true);
    fetch(endpoints().transactionGetUnpaged, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            var sorted = response.content;
            sorted.sort((a, b) =>
              a.date > b.date ? 1 : b.date > a.date ? -1 : 0
            );
            setHistory(sorted);
            setShowPlot(true);
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

  const getNetWorth = async () => {
    setLoading(true);
    fetch(endpoints().networthGet, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((response) => {
            console.log(response);
            setNetworth(response);
            setShowPlot(true);
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
    getHistoryPaged();
  }, [currentPage, pageSize, sortDirection, sortField, actions]);

  const handleShowPlot = () => {
    setShowPlot(!showPlot);
  };

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
      {history && networth && showPlot && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <HistoryPlot history={history} handleShowPlot={handleShowPlot} />
          <NetworthPlot networth={networth} />
        </Box>
      )}
      <HistoryPanel
        currentPage={currentPage}
        pageSize={pageSize}
        sortField={sortField}
        totalPages={totalPages}
        totalTransactions={totalTransactions}
        showPlot={showPlot}
        handleShowPlot={handleShowPlot}
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
        {historyPaged && historyPaged.length > 0 ? (
          <>
            {historyPaged.map((entry) => (
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
