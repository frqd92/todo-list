export function daysInMonth(month, year) { //gets the days in a month of a year
    let chosenMonth = new Date(`${month}-01-${year}`);
    return new Date(chosenMonth.getFullYear(), chosenMonth.getMonth()+1, 0).getDate();
  }

export function chosenDayFunc(month, day, year) { //gets day of a date as a string
    let chosenDay = new Date(`${month}-${day}-${year}`);
    return chosenDay.toLocaleString('en-us', {weekday: 'long'})
}