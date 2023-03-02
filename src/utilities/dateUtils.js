import { autoArr } from "/src/header/modal/modalDateInput";

 //gets the days in a month of a year
 //ex. 2/2023 returns 28
export function daysInMonth(mm, year) {
    let month = isNaN(mm)?returnMonth(mm):mm;
    let chosenMonth = new Date(year,month,1);

    return new Date(chosenMonth.getFullYear(), chosenMonth.getMonth()+1,0 ).getDate();
  }

//checks if a date "dd/mm/yyyy" has passed 
export function isPast(value){
    const [day, month, year] = strDateToArr(value);
    const date = new Date();
    let getDay = date.getDate();
    let getMonth = date.getMonth();
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
export function chosenDayFunc(year, month, day) { 
    let chosenDay = new Date(year,month,day);
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
      case "month": return date.getMonth();
      case "year": return date.getFullYear();
    }
  }
}

//"February" returns 1
// 1 returns "February"
export function returnMonth(month){
    if(isNaN(month)) return autoArr.indexOf(month);
    else return autoArr[month];

}

//String "February 2023" returns wednesday
export function detectFirstDayMonth(selectDate){
  let [mm,yy] = selectDate;
  mm = isNaN(Number(mm))?returnMonth(mm):mm;
  const date = new Date(yy,mm, 1);
  return getCurrentDateText("day", date);
}

//adds a zero to nums less than 10
//ex. arr [2,2,2023] returns string 02/02/2023
export function formatNumDate(arr){
  for(let i=0;i<2;i++){
    if(arr[i]<10 && arr[i][0]!=="0"){
      arr[i] = "0"+(arr[i]);
    }
  }

  return `${arr[0]}/${arr[1]}/${arr[2]}`
}


//adds one to the month when it's displayed since months are 0-11 in date object
// ex. string 19/0/2023 becomes 19/01/2023
export function addOneToMonth(date){
  let arr = date.split("/");
  arr[1] = Number(arr[1])<9?"0" + (Number(arr[1])+1):(Number(arr[1])+1);
  return arr.join("/");
}


//adds suffix to day.. ex 24 returns 24th
export function addSuffixToDay(num){
  num = Number(num);
  let day = Number(num)<9?("0"+num).split(""):num.toString().split("");
  if(Number(day[1])===1){
    return num+"st";
  }
  else if(Number(day[1])===2){
    return num+"nd";
  }
  else if(Number(day[1])===3){
    return num+"rd";
  }
  else{
    return num+"th";
  }
}
//ex 22/02/2023 returns 4th wed
//ex 
export function whichWeekDayOfMonth(val){
    const weekDays = ["Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let date = val==="Today"?addOneToMonth(getToday()):val;
    date=strDateToArr(date);
    const [dd,,]= date;
    const dueWeekDay = getCurrentDateText("day", `${date[2]}/${date[1]}/${date[0]}`);
    const firstWeekDayMonth = getCurrentDateText("day", `${date[2]}/${date[1]}/1`);
    const indexOfFirstWeekDay = weekDays.indexOf(firstWeekDayMonth);
    let weekDayCount=indexOfFirstWeekDay;
    let overallCount=0;
    let whichWeek = 0;
    while(overallCount<Number(dd)){
      // console.log(weekDays[weekDayCount]);
      if(dueWeekDay===weekDays[weekDayCount]){
        whichWeek++;
      }
      weekDayCount++;

      if(weekDayCount===7){
        weekDayCount=0;
      }
      overallCount++;
      
    }
    return whichWeek
  }




//displays full text formatted date
//ex. string "2/2/2023" returns 2nd of march, 2023
export function fullFormattedDate(date){
  const [dd,mm,yy] = date.split("/");
  return `${addSuffixToDay(Number(dd))} of ${returnMonth(Number(mm))}, ${yy}`
}


//ex enter a date as a string "2/2/2023" and num 7
//finds date 7 days from that date.. if negative then goes back 7

export function findRelativeDate(date, num){
  const [dd,mm,yy] = date.split("/");
  const inputDate = new Date(yy,mm,dd);
  const nextDate = new Date(inputDate.getTime()+ num * 24 * 60 * 60 * 1000);
  return `${nextDate.getDate()}/${nextDate.getMonth()}/${nextDate.getFullYear()}`
}

