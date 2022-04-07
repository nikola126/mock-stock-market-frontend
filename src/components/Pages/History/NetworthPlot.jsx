import { useState, useRef, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Box,
  Stack,
  Button,
  Card,
  Typography,
  TextField,
  Tooltip as MUITooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import UserContext from "../../Context/UserContext";
import RecentItemsFilter from "./RecentItemsFilter";
import { dateToTextFieldDefault } from "../../../utilities/DateToTextFieldDefault";
import { TextFieldToDate } from "../../../utilities/TextFieldToDate";

export default function HistoryPlot(props) {
  const {
    user,
    capital,
    networth: currentNetworth,
    portfolio,
  } = useContext(UserContext);
  const [plotComplete, setPlotComplete] = useState(false);
  const [plotData, setPlotData] = useState(null);
  const [plotOptions, setPlotOptions] = useState(null);
  const globalStartDate = useRef(null);
  const globalEndDate = useRef(null);
  const [startDateInputValue, setStartDateInputValue] = useState(null);
  const [endDateInputValue, setEndDateInputValue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  const plotTooltipHelpText = (
    <div style={{ whiteSpace: "pre-line" }}>
      {
        "This graph shows the changes in net worth of your account over time.\nGenerated periodically."
      }
    </div>
  );

  const redraw = () => {
    setPlotComplete(false);
    setPlotData(null);
    var networth = props.networth;

    if (networth.length < 1) {
      setPlotComplete(true);
      return;
    }

    var labels = [];
    for (const [index, delta] of Object.entries(networth)) {
      if (startDate <= delta.date && delta.date <= endDate)
        labels.push(
          new Date(delta.date).toLocaleDateString() +
            " " +
            delta.networth.toFixed(2)
        );
    }

    var totals = [];
    for (const [index, delta] of Object.entries(networth)) {
      if (startDate <= delta.date && delta.date <= endDate)
        totals.push(delta.networth);
    }

    setPlotOptions({
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false, // Hide X axis labels
        },
      },
    });

    setPlotData({
      labels,
      datasets: [
        totals && {
          label: "Current: " + currentNetworth.toFixed(2),
          data: totals,
          borderColor: "#03c2fc",
          backgroundColor: "#0394fc",
        },
      ],
    });

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    setPlotComplete(true);
  };

  useEffect(() => {
    var networth = props.networth;

    if (networth.length > 0) {
      globalStartDate.current = new Date(networth[0].date);
      globalEndDate.current = new Date(networth[networth.length - 1].date);

      setStartDateInputValue(dateToTextFieldDefault(globalStartDate.current));
      setEndDateInputValue(dateToTextFieldDefault(globalEndDate.current));
      setStartDate(globalStartDate.current);
      setEndDate(globalEndDate.current);
    }

    redraw();
  }, [props.networth]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) redraw();
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    setStartDateInputValue(e.target.value);
    const newDate = TextFieldToDate(e.target.value);

    if (globalStartDate.current <= newDate && newDate < globalEndDate.current) {
      setStartDate(newDate);
      setStartDateError(false);
      if (newDate.getDate() === globalStartDate.current.getDate()) {
        setStartDate(globalStartDate.current);
        setStartDateError(false);
      }
    } else if (newDate.getDate() === globalStartDate.current.getDate()) {
      setStartDate(globalStartDate.current);
      setStartDateError(false);
    } else {
      setStartDateError(true);
    }
  };

  const handleEndDateChange = (e) => {
    setEndDateInputValue(e.target.value);
    const newDate = TextFieldToDate(e.target.value);

    if (globalStartDate.current <= newDate && newDate < globalEndDate.current) {
      if (newDate.getDate() === globalEndDate.current.getDate()) {
        setEndDate(globalEndDate.current);
        setEndDateError(false);
      } else {
        setEndDate(newDate);
        setEndDateError(false);
      }
    } else if (newDate.getDate() === globalEndDate.current.getDate()) {
      setEndDate(globalEndDate.current);
      setEndDateError(false);
    } else {
      setEndDateError(true);
    }
  };

  const handlePlotReset = (e) => {
    setStartDate(globalStartDate.current);
    setEndDate(globalEndDate.current);
    setStartDateInputValue(dateToTextFieldDefault(globalStartDate.current));
    setEndDateInputValue(dateToTextFieldDefault(globalEndDate.current));
    setStartDateError(false);
    setEndDateError(false);
    redraw();
  };

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minWidth: "50%",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1%",
          margin: "1% 1% 1% 1%",
          minWidth: "30%",
          maxWidth: "95%",
          backgroundColor: "white",
          border: "1px solid #000",
          borderRadius: "10px",
          boxShadow: 10,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="h6">Account Net Worth Summary</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MUITooltip title={plotTooltipHelpText} placement="top">
              <HelpOutlineIcon color="disabled" />
            </MUITooltip>
            <Button variant="outlined" size="small" onClick={handlePlotReset}>
              Reset
            </Button>
          </Box>
        </Box>
        {plotComplete && (
          <>
            {plotData ? (
              <>
                <Line options={plotOptions} data={plotData} />
                <Stack
                  direction="column"
                  spacing={1}
                  sx={{ padding: "2%", width: "95%", justifyContent: "center" }}
                >
                  <TextField
                    id="startDate"
                    label="Start Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleStartDateChange}
                    error={startDateError}
                    value={startDateInputValue}
                  ></TextField>
                  <TextField
                    id="endDate"
                    label="End Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleEndDateChange}
                    error={endDateError}
                    value={endDateInputValue}
                  ></TextField>
                </Stack>
                <RecentItemsFilter
                  globalStartDate={globalStartDate}
                  globalEndDate={globalEndDate}
                  handlePlotReset={handlePlotReset}
                  handleStartDateChange={handleStartDateChange}
                  setStartDate={setStartDate}
                />
              </>
            ) : (
              <>
                <Typography variant="h6">No historical data yet!</Typography>
              </>
            )}
          </>
        )}
      </Card>
    </Box>
  );
}
