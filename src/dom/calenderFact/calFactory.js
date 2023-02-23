import '/src/dom/calenderFact/calFactoryGeneral.css';
import '/src/dom/calenderFact/effectiveCal.css';
import { elementCreator, imageCreator } from '../../utilities/elementCreator';
import {createIcon} from "/src/utilities/iconCreate";
import { modalDateInputFunc } from "/src/header/modal/modalDateInput";
import { quickAddBtnsFunc } from "/src/header/modal/quickAddBtns";
import arrow from '/src/assets/images/arrow-simple.png';
import { getCurrentDateText, detectFirstDayMonth, daysInMonth, formatNumDate, returnMonth, getToday, isPast, addOneToMonth} from "/src/utilities/dateUtils";
let typeCal, currentMonth, currentYear;
const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export default function CalFactory(userClass, appendTo, textElem, returnInput, returnQuickBtns, returnCal, returnDay){
    const mainDiv = elementCreator("div", ["class", "cal-general-div", `cal-${userClass}-div`], false, appendTo)
    
    if(returnInput){generateCalInput(mainDiv, userClass, textElem)};
    if(returnQuickBtns){generateQuickBtns(mainDiv, userClass, textElem)};
    if(returnCal){generateCal(mainDiv, textElem, returnDay)};

    return {mainDiv};
}
// Makes the calender------------------------------------------------------------------------------
function generateCal(div, textElem, returnDay){
    const datePickCalDiv = elementCreator("div", ["class", "date-adder-calender-div"], false, div);
    const calenderDiv = elementCreator("div", ["class", "calender-adder-div", `calender-adder-div-small`], false, datePickCalDiv);
    const [date,titleText] = calArrowsTitle(datePickCalDiv, textElem);
    createCalHeader(calenderDiv,typeCal);
    createDaySquares(calenderDiv, date, titleText, false, textElem);
}

function createCalHeader(div){
    //create header
    for(let i=0;i<7;i++){
        elementCreator("div", ["class", `cal-header`, `cal-header-${weekArr[i].toLowerCase()}-${typeCal}`], weekArr[i],div);
    }
}
function createDaySquares(div, date, text, returnDay, textElem){
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
        if(dayCount===getToday("day")+1 && date[0]===returnMonth(getToday("month")) &&Number(date[1])===getToday("year")){
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
        };
        let finalDate = addOneToMonth(date)
        textElem.innerText= finalDate;

        if(returnDay){
            document.querySelector(".due-btn-day-text").innerText = getCurrentDateText("day", `${year}-${month}-${day}`);
        }
        
        const datePickerDiv = div.parentElement.parentElement;
        //hideDiv(document.querySelector(".date-picker-div"), "hidden-date-picker-div");
    }
}


function prevMonthDays(arr, date, text){
    const prevMonth = incrDecrMonth(text, false, true);
    const [mm, yy] = prevMonth.split(" ");
    return daysInMonth(mm,yy)
  }
  
function firstLastDay(date){
    let [mm,yy] = date;
    let firstDay = detectFirstDayMonth(date).split("").slice(0,3).join("");
    firstDay = weekArr.indexOf(firstDay);


    let lastDay = daysInMonth(mm,yy, true);
    return [firstDay, lastDay];
}






//the arrows and title
function calArrowsTitle(div, textElem){
    const calenderTitleDiv = elementCreator("div", ["class", "calender-title-div"], false, div, true);
    const arrowDivLeft = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowLeft = imageCreator(arrow, ["class", "add-cal-arrow", "add-arrow-left"], arrowDivLeft);
    const titleText = elementCreator("p", ["class", "calender-title-text"],`${getCurrentDateText("month")} ${getCurrentDateText("year")}`, calenderTitleDiv);
    [currentMonth, currentYear] = titleText.innerText.split(" ");
    const arrowDivRight = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowRight = imageCreator(arrow, ["class", "add-cal-arrow","add-arrow-right"], arrowDivRight);
    arrowHoverEffect([arrowDivLeft, arrowLeft], ["add-arrow-left-hov","add-arrow-clicked-right"]);
    arrowHoverEffect([arrowDivRight, arrowRight], ["add-arrow-right-hov","add-arrow-clicked-right"]);
    arrowChoose(arrowDivLeft, arrowDivRight, titleText, textElem);
    return [titleText.innerText.split(" "), titleText];
}

function arrowChoose(leftBtn, rightBtn, text, textElem){
    rightBtn.addEventListener("click", ()=>{
        incrDecrMonth(text, true, false, textElem);
    });
    leftBtn.addEventListener("click", ()=>{
        incrDecrMonth(text, false, false, textElem);
    });
}

function incrDecrMonth(text, isIncr, onlyValue, textElem){
    let [month, year] = text.innerText.split(" ");
    month = returnMonth(month)+1;
    const date = new Date(`${year}-${month}-1`);
    const nextMonth = new Date(date);
    let action = isIncr?nextMonth.getMonth() + 1 : nextMonth.getMonth() - 1;
    nextMonth.setMonth(action ,1);
    if(!onlyValue){
        text.innerText = `${returnMonth(nextMonth.getMonth())} ${nextMonth.getFullYear()}`;
        [currentMonth, currentYear] = text.innerText.split(" ");

        renderCalender(text.innerText.split(" "), text, textElem);
    }
    else{
        return `${returnMonth(nextMonth.getMonth())} ${nextMonth.getFullYear()}`;
    }
}
function renderCalender(date, text, textElem){
    let calDiv = text.parentElement.parentElement;
    const squares = calDiv.querySelectorAll(".cal-day-square");
    const div = calDiv.querySelector(".calender-adder-div");
    squares.forEach(elem=>elem.remove());
    createDaySquares(div, date, text, false, textElem);
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





// Makes the smart input-----------------------------------------------------------------
function generateCalInput(div, userClass, textElem){
    const enterDateDiv = elementCreator("div", ["class", "cal-general-date-div", `cal-${userClass}-date-div`], false, div);
    const enterDateInput = elementCreator("input", ["class", "cal-general-input",`cal-${userClass}-input`], false, enterDateDiv);
    enterDateInput.placeholder="Write your date & press enter";
    modalDateInputFunc(enterDateInput, textElem);
    const iconDiv = elementCreator("div", ["class", "cal-icon-div"], false, enterDateDiv )
    createIcon(iconDiv, "Hello", ["cal-i-div","cal-i-img", "cal-i-img-div"]);
}
// Makes the quickBtns-----------------------------------------------------------------
function generateQuickBtns(div, userClass, textElem){
    const dateBtnsDiv = elementCreator("div", ["class", "cal-general-quick-div", `cal-${userClass}-quick-div`], false,div);
    if(document.querySelector(".due-btn-hover-div")===null){
        const hoverDiv = elementCreator("div",["class", "cal-due-btn-hover-div"], false,document.body);
        elementCreator("p", false, false, hoverDiv);
        elementCreator("p", false, false, hoverDiv);
    }

    const btnArray = [
        {none:"None"}, {today:"Today"}, {tomorrow:"Tomorrow"}, 
        {afterTomorrow:"After tomorrow"},{week:"Next week"}, {month:"Next month"}
    ]
    btnArray.forEach((elem)=>{   
        for(const key in elem){
            if (elem.hasOwnProperty(key)) {
                const value = elem[key];
                const btn = elementCreator("div", ["class", "cal-due-btn", `cal-due-btn-${key}`],value, dateBtnsDiv);
                quickAddBtnsFunc(btn);
              }
        }
    })
}