import { Stack, Button } from "@mui/material";
import { dateToTextFieldDefault } from "./../../../utilities/DateToTextFieldDefault";

export default function RecentItemsFilter(props) {
  const handleButtonClick = (e) => {
    if (e.target.value === "0") {
      props.handlePlotReset();
    } else if (e.target.value === "1") {
      handleDateChange(1);
    } else if (e.target.value === "7") {
      handleDateChange(7);
    } else if (e.target.value === "30") {
      handleDateChange(30);
    } else if (e.target.value === "180") {
      handleDateChange(180);
    }
  };

  const handleDateChange = (days) => {
    const globalStartDate = props.globalStartDate.current;
    const globalEndDate = props.globalEndDate.current;

    var eventObject = {
      target: {
        value: 0,
      },
    };

    var newStartDate = new Date(globalEndDate.getTime() - 86400000 * days);

    if (newStartDate > globalStartDate) {
      eventObject.target.value = dateToTextFieldDefault(newStartDate);
      props.handleStartDateChange(eventObject);
    } else {
      props.handlePlotReset();
    }
  };

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ padding: "0%", width: "95%", justifyContent: "center" }}
    >
      <Button
        variant="contained"
        size="small"
        value={0}
        onClick={handleButtonClick}
      >
        All
      </Button>
      <Button
        variant="contained"
        size="small"
        value={180}
        onClick={handleButtonClick}
      >
        6m
      </Button>
      <Button
        variant="contained"
        size="small"
        value={30}
        onClick={handleButtonClick}
      >
        1m
      </Button>
      <Button
        variant="contained"
        size="small"
        value={7}
        onClick={handleButtonClick}
      >
        7d
      </Button>
      <Button
        variant="contained"
        size="small"
        value={1}
        onClick={handleButtonClick}
      >
        1d
      </Button>
    </Stack>
  );
}
