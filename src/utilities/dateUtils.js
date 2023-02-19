import { autoArr } from "/src/header/modal/modalDateInput";

 //gets the days in a month of a year
 //ex. 2/2023 returns 28
export function daysInMonth(month, year) {
    let chosenMonth = new Date(`${year}-${month}-01`);
    return new Date(chosenMonth.getFullYear(), chosenMonth.getMonth()+1, 0).getDate();
  }

//checks if a date "dd/mm/yyyy" has passed 
export function isPast(value){
    const [day, month, year] = strDateToArr(value);
    const date = new Date();
    let getDay = date.getDate();
    let getMonth = date.getMonth() + 1;
    let getYear = date.getFullYear();
    if(year<getYear){
      return false;
    }
    else if(year===getYear){
      if(month<getMonth){
        return false;
      }
      else if(month===getMonth){
        if(day<getDay){
          return false;
        }
      }
    }
    return true;
}

//returns "dd/mm/yyyy" as an array [dd,mm,yyyy] 
export function strDateToArr(str){
  return str.replaceAll(/[^0-9]/g," ").split(" ").map(elem=>Number(elem));
}




//gets day of a date as a string
export function chosenDayFunc(month, day, year) { 
    let chosenDay = new Date(`${year}-${month}-${day}`);
    return chosenDay.toLocaleString('en-us', {weekday: 'long'})
}


//if today is mon feb 2023... "day" returns Monday.... "month" returns February...year 2023
//if no chosen date then date is today
export function getCurrentDateText(value, chosenDate){
  let date;
  if(!chosenDate){
    date = new Date();
  }
  else{
    date = new Date(chosenDate);
  }
  switch(value){
    case "day": 
      return date.toLocaleString('en-us', {weekday: 'long'});
    case "month":
      return date.toLocaleString('en-us', {month: 'long'});
    case "year":
      return date.getFullYear();
  }
}

//returns today in mm/dd/yyyy format if no parameter
export function getToday(val){
  const date = new Date();
  if(!val){
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  else{
    switch(val){
      case "day": return date.getDate();
      case "month": return date.getMonth()+1;
      case "year": return date.getFullYear();
    }
  }
}

//"February" returns 2
// 2 returns "February"
export function returnMonth(month){
    if(isNaN(month)) return autoArr.indexOf(month)+1;
    else return autoArr[month-1];

}

//String "February 2023" returns wednesday
export function detectFirstDayMonth(selectDate){
  const [mm,yy] = selectDate;
  const date = new Date(yy,returnMonth(mm), 1);
  return getCurrentDateText("day", date);
}

//adds a zero to nums less than 10
//ex. arr [2,2,2023] returns string 02/02/2023
export function formatNumDate(arr){
  for(let i=0;i<2;i++){
    arr[i] = arr[i]<10?"0"+arr[i]:arr[i];
  }
  return `${arr[0]}/${arr[1]}/${arr[2]}`
}


