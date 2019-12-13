export default function getCurrentMonthAndYear(separator = "") {
  let newDate = new Date();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let mon = "";
  switch (month) {
    case 1:
      mon = "JAN";
      break;
    case 2:
      mon = "FEB";
      break;
    case 3:
      mon = "MAR";
      break;
    case 4:
      mon = "APR";
      break;
    case 5:
      mon = "MAY";
      break;
    case 6:
      mon = "JUN";
      break;
    case 7:
      mon = "JUL";
      break;
    case 8:
      mon = "AUG";
      break;
    case 9:
      mon = "SEP";
      break;
    case 10:
      mon = "OCT";
      break;
    case 11:
      mon = "NOV";
      break;
    case 12:
      mon = "DEC";
      break;
    default:
      mon = "Invalid Date";
      break;
  }
  let monthyear = { month: mon, year: year };
  return monthyear;
}
