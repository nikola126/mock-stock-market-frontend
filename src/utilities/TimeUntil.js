export function TimeUntil(date, now) {
  var diffMS = now - date;
  var seconds = diffMS / 1000;
  var minutes = seconds / 60;
  var hours = minutes / 60;
  var days = hours / 24;
  var recentlyUpdated = false;

  var asString = "";

  if (Math.round(days) > 1) asString += Math.floor(days) + " days ";
  else if (Math.round(hours) > 1) asString += Math.floor(hours) + " hours ";
  else if (Math.round(minutes) > 2)
    asString += Math.floor(minutes) + " minutes ";
  else recentlyUpdated = true;

  if (recentlyUpdated) asString += "Less than a minute ago";
  else asString += " ago";

  return {
    days: days > 1 ? Math.round(days) : null,
    hours: hours > 1 ? Math.round(hours) : null,
    minutes: minutes > 1 ? Math.round(minutes) : null,
    asString: asString,
  };
}
