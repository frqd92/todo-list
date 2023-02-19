import { elementCreator, imageCreator } from "../utilities/elementCreator";
import arrow from '/src/assets/images/arrow-simple.png';
import { getCurrentDateText, detectFirstDayMonth, daysInMonth, formatNumDate, returnMonth, getToday, isPast} from "/src/utilities/dateUtils";
//import { hideDateAdder } from "../header/modal/showHideAdder";
const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let typeCal, currentMonth, currentYear;
import { hideDiv } from "../header/modal/showHideAdder";

//add menu, date picked calender
export function calenderFact(div, type){
    typeCal = type;
    const datePickCalDiv = elementCreator("div", ["class", "date-adder-calender-div"], false, div);
    //creates arrows and mm/yyyy above calender.. returns [[month, year], titleText],
    //the actual calender
    const calenderDiv = elementCreator("div", ["class", "calender-adder-div",`calender-adder-div-${typeCal}`], false, datePickCalDiv);
    const [date,titleText] = calArrowsTitle(datePickCalDiv);
   
    createCalHeader(calenderDiv,typeCal);

    if(typeCal==="small"){
        createDaySquares(calenderDiv, date, titleText);
    } 
    return {datePickCalDiv};
}






function createCalHeader(div, typeCal){
    //create header
    for(let i=0;i<7;i++){
        elementCreator("div", ["class", `cal-header-${typeCal}`, `cal-header-${weekArr[i].toLowerCase()}-${typeCal}`], weekArr[i],div);
    }
}



function createDaySquares(div, date, text){

    const [firstDayMonth, lastDayMonth] = firstLastDay(date);
    let prevMonth = prevMonthDays([firstDayMonth, lastDayMonth], date, text);

    let dayCount=1, nextMonthCount=1;
    for(let i=0;i<42;i++){
        const square = elementCreator("div", ["class", "cal-day-square"], false, div);
        if(i<firstDayMonth){
            square.innerText = (prevMonth-((firstDayMonth-1)-i));
            square.classList.add("cal-day-other-month");
            square.classList.add("cal-day-prev");
        }
        else if(i>=firstDayMonth && dayCount<=lastDayMonth){ //days of current Month
            square.innerText = dayCount;
            dayCount++;

        }
        else if(i>=lastDayMonth){
            square.innerText = nextMonthCount;
            nextMonthCount++;
            square.classList.add("cal-day-other-month");
            square.classList.add("cal-day-next");
        }
        if(dayCount===getToday("day")+1 && date[0]===returnMonth(getToday("month"))){
            square.classList.add("current-day-cal")
        }
        if(inputCalDay(false, square)){
            square.classList.add("valid-square")
        }
        if(square.className.includes("valid-square")){
            square.addEventListener("click", inputCalDay);
        }
    }

    

    function inputCalDay(e, square){
        let day, month, year, tar;
        if(e){
            day = e.target.innerText;
            tar=e.target.className;
        }
        else{
            day=square.innerText;
            tar=square.className;
        }   

        //for current month days
        if(!tar.includes("cal-day-other-month")){
            month = currentMonth;
            year = currentYear;
        }
        else if(tar.includes("cal-day-prev")){
            [month, year] = incrDecrMonth(text, false, true).split(" ");
        }
        else if(tar.includes("cal-day-next")){
            [month, year] = incrDecrMonth(text, true, true).split(" ");
        }
        let date = formatNumDate([day, returnMonth(month), year]);
        if(!e){
            return isPast(date);
        }
        document.querySelector(".modal-due-btn").innerText= date;
        document.querySelector(".due-btn-day-text").innerText = getCurrentDateText("day", `${month}-${day}-${year}`);
        
        const datePickerDiv = div.parentElement.parentElement;
        hideDiv(document.querySelector(".date-picker-div"), "hidden-date-picker-div");
        

    }
};


//calculates the days in prev month of the selected month.. Used to show the preceding left days before the first of the current month
//ex if date is "February 2023", returns 31 (jan 2023 had 31 days)
function prevMonthDays(arr, date, text){

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
    [currentMonth, currentYear] = titleText.innerText.split(" ");
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
        [currentMonth, currentYear] = text.innerText.split(" ");

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

