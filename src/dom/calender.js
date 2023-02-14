import { elementCreator, imageCreator } from "../utilities/elementCreator";
import arrow from '/src/assets/images/arrow-simple.png';
import { getCurrentDateText, detectFirstDayMonth, daysInMonth} from "/src/utilities/dateUtils";
import { returnMonth } from "/src/utilities/dateUtils";
const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let typeCal;


//add menu, date picked calender
export function calenderFact(div, type){
    typeCal = type;
    const datePickCalDiv = elementCreator("div", ["class", "date-adder-calender-div"], false, div);
    //creates arrows and mm/yyyy above calender.. returns [[month, year], titleText],
    //the actual calender
    const calenderDiv = elementCreator("div", ["class", "calender-adder-div",`calender-adder-div-${typeCal}`], false, datePickCalDiv);
    const [date,titleText] = calArrowsTitle(datePickCalDiv);
    const calWidth = getComputedStyle(datePickCalDiv).getPropertyValue("width");
   
    createCalHeader(calenderDiv,typeCal);

    if(typeCal==="small"){
        createDaySquares(calenderDiv, date, titleText);
    } 


    return Object.assign({}, datePickCalDiv);
}






function createCalHeader(div, typeCal){
    //create header
    for(let i=0;i<7;i++){
        const headerSquare = elementCreator("div", ["class", `cal-header-${typeCal}`, `cal-header-${weekArr[i].toLowerCase()}-${typeCal}`], weekArr[i],div);
    }
}



function createDaySquares(div, date, text){
    const [firstDayMonth, lastDayMonth] = firstLastDay(date);
    let prevMonth = prevMonthDays([firstDayMonth, lastDayMonth], date, text)
    let dayCount=1, nextMonthCount=1;
    for(let i=0;i<42;i++){
        const square = elementCreator("div", ["class", "cal-day-square"], false, div);
        if(i<firstDayMonth){
            square.innerText = (prevMonth-((firstDayMonth-1)-i));
            square.classList.add("cal-day-other-month");
        }
        else if(i>=firstDayMonth && dayCount<=lastDayMonth){ //days of current Month
            square.innerText = dayCount;
            dayCount++;
        }
        else if(i>=lastDayMonth){
            square.innerText = nextMonthCount;
            nextMonthCount++;
            square.classList.add("cal-day-other-month");
        }


    }
};

//calculates the days in prev month of the selected month.. Used to show the preceding left days before the first of the current month
//ex if date is "February 2023", returns 31 because jan 2023 had
function prevMonthDays(arr, date, text){
    const prevMonthDays = arr[0];
    //const nextMonthDays = 42-(prevMonthDays + arr[1]);
    const prevMonth = incrDecrMonth(text, false, true);
    const [mm, yy] = prevMonth.split(" ");
    return daysInMonth(mm,yy)
  }
  

function firstLastDay(date){
    const [mm,yy] = date;
    let firstDay = detectFirstDayMonth(date).split("").slice(0,3).join("");
    firstDay = weekArr.indexOf(firstDay);
    let lastDay = daysInMonth(mm,yy);
    return [firstDay, lastDay];
}


//-----------------------------------------------------------------------------------------
//the arrows and title
function calArrowsTitle(div, calDiv){
    const calenderTitleDiv = elementCreator("div", ["class", "calender-title-div"], false, div, true);
    const arrowDivLeft = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowLeft = imageCreator(arrow, ["class", "add-cal-arrow", "add-arrow-left"], arrowDivLeft);
    const titleText = elementCreator("p", ["class", "calender-title-text"],`${getCurrentDateText("month")} ${getCurrentDateText("year")}`, calenderTitleDiv);
    const arrowDivRight = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowRight = imageCreator(arrow, ["class", "add-cal-arrow","add-arrow-right"], arrowDivRight);
    arrowHoverEffect([arrowDivLeft, arrowLeft], ["add-arrow-left-hov","add-arrow-clicked-right"]);
    arrowHoverEffect([arrowDivRight, arrowRight], ["add-arrow-right-hov","add-arrow-clicked-right"]);
    arrowChoose(arrowDivLeft, arrowDivRight, titleText);
    return [titleText.innerText.split(" "), titleText];
}


function arrowChoose(leftBtn, rightBtn, text){
    rightBtn.addEventListener("click", ()=>{
        incrDecrMonth(text, true, false);
    });
    leftBtn.addEventListener("click", ()=>{
        incrDecrMonth(text, false, false);
    });

}

function incrDecrMonth(text, isIncr, onlyValue){
    //logic to change text
    let [month, year] = text.innerText.split(" ");
    const date = new Date(`${month}-1-${year}`);
    month = returnMonth(month);
    const nextMonth = new Date(date);
    let action = isIncr?nextMonth.getMonth() + 1 : nextMonth.getMonth() - 1;
    nextMonth.setMonth(action ,1);
    if(!onlyValue){
        text.innerText = `${returnMonth(nextMonth.getMonth()+1)} ${nextMonth.getFullYear()}`;
        //logic to change the calender
        renderCalender(text.innerText.split(" "), text);
    }
    else{
        return `${returnMonth(nextMonth.getMonth()+1)} ${nextMonth.getFullYear()}`;
    }


}

//when arrow button is clicked, removes squares and runs createDaySquares again with new date
function renderCalender(date, text){
    let calDiv = text.parentElement.parentElement;
    const squares = calDiv.querySelectorAll(".cal-day-square");
    const div = calDiv.querySelector(".calender-adder-div");
    squares.forEach(elem=>elem.remove());
    if(typeCal==="small"){createDaySquares(div, date, text)};
}

function arrowHoverEffect(arr, classL){
    const [div,arrow] = arr;
    div.addEventListener("mouseover", addHov);
    div.addEventListener("mousedown", addEff);

    function addHov(){
        arrow.classList.add(classL[0]);
        div.addEventListener("mouseleave", removeHov);
    }
    function removeHov(){
        arrow.classList.remove(classL[0]);
        div.addEventListener("mouseover", addHov,)
        div.removeEventListener("mouseleave", removeHov)
    }
    function addEff(){
        arrow.classList.add(classL[1]);
        div.addEventListener("mouseup", removeEff);
        arrow.classList.remove(classL[0]);
    }
    function removeEff(){
        arrow.classList.remove(classL[1]);
        div.addEventListener("mousedown", addEff);
        div.removeEventListener("mouseup", removeEff);
        arrow.classList.add(classL[0]);
    }
}

//-----------------------------------------------------------------------------------------

