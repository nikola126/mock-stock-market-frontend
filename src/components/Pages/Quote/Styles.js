export const styleQuoteForm = (theme) => ({
  padding: "2%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const styleQuoteComponent = (theme) => {
  var coloring;
  if (theme === true) {
    coloring = "linear-gradient(to top, white, white, white, white, #91ffa2)";
  } else {
    coloring = "linear-gradient(to top, white, white, white, white, #ff6161)";
  }
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    margin: "1% 1% 1% 1%",
    minWidth: "300px",
    backgroundColor: "white",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 10,
    overflow: "hidden",
    position: "relative",
    background: coloring,
    userSelect: "none",
  };
};

export const styleQuoteContent = (theme) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    position: "relative",
  };
};

export const styleQuoteBackground = (theme) => ({
  position: "absolute",
  fontSize: "20vh",
  opacity: "10%",
});

export const styleHistoryComponent = () => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    margin: "1% 1% 5% 1%",
    minWidth: "300px",
    backgroundColor: "white",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 10,
    overflow: "hidden",
    position: "relative",
    userSelect: "none",
  };
};
