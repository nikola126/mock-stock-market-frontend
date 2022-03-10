import { Box, Card, Typography } from "@mui/material";
import { useContext, useState } from "react";
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
  const [units, setUnits] = useState("d");
  const [number, setNumber] = useState(30);

  const quote = props.quote;
  var history = props.history.data;
  history.push({ close: quote.latestPrice, date: "Today" });

  console.log(quote);
  console.log(history);

  const labels = history.map((entry) => entry.date);
  const values = history.map((entry) => entry.close);

  const options = {
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
        display: false, // Hide Y axis labels
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: quote.companyName,
        data: values,
        borderColor: "#03c2fc",
        backgroundColor: "#0394fc",
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card variant="outlined" sx={styles.styleHistoryComponent()}>
        <Typography variant="h6">
          Last {number} {units}
        </Typography>
        <Line options={options} data={data} />
      </Card>
    </Box>
  );
}
