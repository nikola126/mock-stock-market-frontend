import { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Card, Typography, Tooltip as MUITooltip } from "@mui/material";
import UserContext from "../../Context/UserContext";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { pieChartColorsArray } from "../../../utilities/pieChartColorsArray";

export default function PortfolioDiversityPlot(props) {
  const { user, networth, capital, portfolio } = useContext(UserContext);

  const [plotComplete, setPlotComplete] = useState(false);
  const [plotData, setPlotData] = useState({ labels: [], data: [] });
  const [plotOptions, setPlotOptions] = useState(null);

  const plotTooltipHelpText = (
    <div style={{ whiteSpace: "pre-line" }}>
      {
        "Displays the contribution of each owned stock to the total networth.\nPortfolio diversification can reduce the impact of a sudden decrease in a stock value and decrease the overall return volatility."
      }
    </div>
  );

  const redraw = () => {
    setPlotComplete(false);
    setPlotData(null);

    var labels = [];
    var datasetsData = [];
    var datasetsBackgroundColor = [];

    var index = 0;

    props.portfolio.map((entry) => {
      labels.push(
        entry.stock.symbol +
          " " +
          ((entry.currentReturn / (networth - capital)) * 100).toFixed(2) +
          "%"
      );
      datasetsData.push(entry.currentReturn.toFixed(2));
      datasetsBackgroundColor.push(pieChartColorsArray()[index % 10]);
      index += 1;
    });

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Portfolio",
          data: datasetsData,
          backgroundColor: datasetsBackgroundColor,
          hoverOffset: 20,
        },
      ],
    };

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
    });

    setPlotData(data);

    ChartJS.register(ArcElement, Title, Tooltip, Legend);

    setPlotComplete(true);
  };

  useEffect(() => {
    redraw();
  }, [props.portfolio]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        maxWidth: "600px",
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
          <Typography variant="h6">Portfolio Diversity</Typography>
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
          </Box>
        </Box>
        {plotComplete && (
          <>
            <Pie options={plotOptions} data={plotData} />
          </>
        )}
      </Card>
    </Box>
  );
}
