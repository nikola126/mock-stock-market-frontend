import { useState, useRef, useEffect } from "react";
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
import { dateToTextFieldDefault } from "../../../utilities/DateToTextFieldDefault";
import { TextFieldToDate } from "../../../utilities/TextFieldToDate";

export default function HistoryPlot(props) {
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
        "This graph shows the changes in available assets of your account over time.\nClick on specific legend entries to filter them out.\nYou can also specify a date range using the fields below."
      }
    </div>
  );

  const redraw = () => {
    setPlotComplete(false);
    setPlotData(null);
    var history = props.history;

    var labels = [];
    for (const [index, delta] of Object.entries(history)) {
      if (startDate <= delta.date && delta.date <= endDate) {
        if (delta.action === "ADD")
          labels.push("Deposit " + new Date(delta.date).toLocaleDateString());
        else if (delta.action === "SELL")
          labels.push(
            "SELL " +
              delta.shares +
              "*" +
              delta.symbol +
              " " +
              new Date(delta.date).toLocaleDateString()
          );
        else if (delta.action === "BUY")
          labels.push(
            "BUY " +
              delta.shares +
              "*" +
              delta.symbol +
              " " +
              new Date(delta.date).toLocaleDateString()
          );
      }
    }

    var totals = [];
    for (const [index, delta] of Object.entries(history)) {
      if (totals.length === 0) {
        totals.push(delta.price);
      } else {
        var previous = totals[totals.length - 1];
        if (delta.action === "ADD") {
          totals.push(previous + delta.price);
        } else if (delta.action === "BUY") {
          totals.push(previous - delta.price * delta.shares);
        } else if (delta.action === "SELL") {
          totals.push(previous + delta.price * delta.shares);
        }
      }
    }

    var deltasALL = [];
    var deltasDEPOSIT = [];
    var deltasBUY = [];
    var deltasSELL = [];
    for (const [index, delta] of Object.entries(history)) {
      if (startDate <= delta.date && delta.date <= endDate) {
        if (deltasALL.length === 0) {
          if (startDate === globalStartDate) {
            deltasALL.push(delta.price);
            deltasDEPOSIT.push(delta.price);
            deltasBUY.push(null);
            deltasSELL.push(null);
          } else {
            if (delta.action === "ADD") {
              deltasALL.push(totals[index]);
              deltasDEPOSIT.push(totals[index]);
              deltasBUY.push(null);
              deltasSELL.push(null);
            } else if (delta.action === "BUY") {
              deltasALL.push(totals[index]);
              deltasDEPOSIT.push(null);
              deltasBUY.push(totals[index]);
              deltasSELL.push(null);
            } else if (delta.action === "SELL") {
              deltasALL.push(totals[index]);
              deltasDEPOSIT.push(null);
              deltasBUY.push(totals[index]);
              deltasSELL.push(null);
            }
          }
        } else {
          var previousDelta = deltasALL[deltasALL.length - 1];
          if (delta.action === "ADD") {
            deltasALL.push(previousDelta + delta.price);
            deltasDEPOSIT.push(previousDelta + delta.price);
            deltasBUY.push(null);
            deltasSELL.push(null);
          } else if (delta.action === "BUY") {
            deltasALL.push(previousDelta - delta.price * delta.shares);
            deltasDEPOSIT.push(null);
            deltasBUY.push(previousDelta - delta.price * delta.shares);
            deltasSELL.push(null);
          } else if (delta.action === "SELL") {
            deltasALL.push(previousDelta + delta.price * delta.shares);
            deltasDEPOSIT.push(null);
            deltasBUY.push(null);
            deltasSELL.push(previousDelta + delta.price * delta.shares);
          }
        }
      }
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
        deltasBUY && {
          label: "Buy",
          data: deltasBUY,
          borderColor: "#c73434",
          backgroundColor: "#f54242",
        },
        deltasSELL && {
          label: "Sell",
          data: deltasSELL,
          borderColor: "#32a852",
          backgroundColor: "#3fd467",
        },
        deltasDEPOSIT && {
          label: "Deposit",
          data: deltasDEPOSIT,
          borderColor: "#03c2fc",
          backgroundColor: "#0394fc",
        },
        deltasALL && {
          label: "All",
          data: deltasALL,
          borderColor: "#595959",
          backgroundColor: "#595959",
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
    var history = props.history;

    globalStartDate.current = new Date(history[0].date);
    globalEndDate.current = new Date(history[history.length - 1].date);

    setStartDateInputValue(dateToTextFieldDefault(globalStartDate.current));
    setEndDateInputValue(dateToTextFieldDefault(globalEndDate.current));
    setStartDate(globalStartDate.current);
    setEndDate(globalEndDate.current);

    redraw();
  }, [props.history]);

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
          <Typography variant="h6">Account Net Asset Summary</Typography>
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
            <Line options={plotOptions} data={plotData} />
            <Stack
              direction="column"
              spacing={1}
              sx={{ padding: "3%", width: "95%", justifyContent: "center" }}
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
          </>
        )}
      </Card>
    </Box>
  );
}
