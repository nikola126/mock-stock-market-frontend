import { Box, Card, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import * as styles from "./Styles";
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

export default function History(props) {
  const { user, capital, portfolio } = useContext(UserContext);

  const [plotData, setPlotData] = useState(null);
  const [plotOptions, setPlotOptions] = useState(null);

  useEffect(() => {
    const quote = props.quote;
    var history = props.history.data;
    history.push({ close: quote.latestPrice, date: "Today" });

    console.log(quote);
    console.log(history);

    const labels = history.map((entry) => entry.date);
    const values = history.map((entry) => entry.close);

    setPlotOptions({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: quote.companyName,
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
        {
          label: quote.companyName,
          data: values,
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
  }, [props.history, props.quote]);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card variant="outlined" sx={styles.styleHistoryComponent()}>
        <Typography variant="h6">
          Last {props.historyInterval} {props.historyUnits}
        </Typography>
        {plotData && <Line options={plotOptions} data={plotData} />}
      </Card>
    </Box>
  );
}
