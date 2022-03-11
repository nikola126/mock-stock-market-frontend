export function dateToTextFieldDefault(date) {
  const asDate = new Date(date);
  var text = "";
  text += asDate.getFullYear();
  text += "-";
  text += (asDate.getMonth() < 10 ? "0" : "") + (asDate.getMonth() + 1);
  text += "-";
  text += (asDate.getDate() < 10 ? "0" : "") + asDate.getDate();

  return text;
}
