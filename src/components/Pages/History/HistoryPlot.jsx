import { Box, Stack, Button, Card, Typography, TextField } from "@mui/material";
import { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../Context/UserContext";
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
import { dateToTextFieldDefault } from "../../../utilities/DateToTextFieldDefault";
import { TextFieldToDate } from "../../../utilities/TextFieldToDate";

export default function HistoryPlot(props) {
  const { user, capital, portfolio } = useContext(UserContext);

  const [plotComplete, setPlotComplete] = useState(false);
  const [plotData, setPlotData] = useState(null);
  const [plotOptions, setPlotOptions] = useState(null);
  const globalStartDate = useRef(null);
  const globalEndDate = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

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
          var previous = deltasALL[deltasALL.length - 1];
          if (delta.action === "ADD") {
            deltasALL.push(previous + delta.price);
            deltasDEPOSIT.push(previous + delta.price);
            deltasBUY.push(null);
            deltasSELL.push(null);
          } else if (delta.action === "BUY") {
            deltasALL.push(previous - delta.price * delta.shares);
            deltasDEPOSIT.push(null);
            deltasBUY.push(previous - delta.price * delta.shares);
            deltasSELL.push(null);
          } else if (delta.action === "SELL") {
            deltasALL.push(previous + delta.price * delta.shares);
            deltasDEPOSIT.push(null);
            deltasBUY.push(null);
            deltasSELL.push(previous + delta.price * delta.shares);
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

    setStartDate(globalStartDate.current);
    setEndDate(globalEndDate.current);

    redraw();
  }, [props.history]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) redraw();
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
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
    redraw();
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
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
        <Stack direction="row" spacing={1}>
          <Typography variant="h6">Account Net Worth Summary</Typography>
          <Button variant="outlined" size="small" onClick={handlePlotReset}>
            Reset
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={props.handleShowPlot}
          >
            Hide
          </Button>
        </Stack>
        {plotComplete && (
          <>
            <Line options={plotOptions} data={plotData} />
          </>
        )}
        {plotComplete && (
          <Stack direction="row" spacing={1} sx={{ padding: "3%" }}>
            <TextField
              id="startDate"
              label="Start Date"
              type="date"
              defaultValue={dateToTextFieldDefault(globalStartDate.current)}
              InputLabelProps={{ shrink: true }}
              onChange={handleStartDateChange}
              error={startDateError}
            ></TextField>
            <TextField
              id="endDate"
              label="End Date"
              type="date"
              defaultValue={dateToTextFieldDefault(globalEndDate.current)}
              InputLabelProps={{ shrink: true }}
              onChange={handleEndDateChange}
              error={endDateError}
            ></TextField>
          </Stack>
        )}
      </Card>
    </Box>
  );
}
