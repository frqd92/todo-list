export function daysInMonth(month, year) { //gets the days in a month of a year
    let chosenMonth = new Date(`${month}-01-${year}`);
    return new Date(chosenMonth.getFullYear(), chosenMonth.getMonth()+1, 0).getDate();
  }

export function chosenDayFunc(month, day, year) { //gets day of a date as a string
    let chosenDay = new Date(`${month}-${day}-${year}`);
    return chosenDay.toLocaleString('en-us', {weekday: 'long'})
}

export function getCurrentDateText(value){
  const date = new Date();
  switch(value){
    case "day": 
      return date.toLocaleString('en-us', {weekday: 'long'});
    case "month":
      return date.toLocaleString('en-us', {month: 'long'});
    case "year":
      return date.getFullYear();
  }

}