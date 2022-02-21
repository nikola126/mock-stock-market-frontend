export const styleQuoteForm = (theme) => ({
  padding: "2%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const styleQuoteComponent = (theme) => {
  var coloring;
  if (theme === true) {
    coloring = "linear-gradient(to top, white, white, white, #91ffa2)";
  } else {
    coloring = "linear-gradient(to top, white, white, white, #ff6161)";
  }
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    margin: "1% 1% 10% 1%",
    width: "40%",
    backgroundColor: "white",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow: 10,
    overflow: "hidden",
    position: "relative",
    background: coloring,
  };
};

export const styleQuoteBackground = (theme) => ({
  position: "absolute",
  fontSize: "20vh",
  opacity: "10%",
});
