import '/src/dom/calenderFact/calFactoryGeneral.css';
import { elementCreator, imageCreator } from '../../utilities/elementCreator';
import {createIcon} from "/src/utilities/iconCreate";
import { modalDateInputFunc } from "/src/header/modal/modalDateInput";
import { quickAddBtnsFunc } from "/src/header/modal/quickAddBtns";
import arrow from '/src/assets/images/arrow-simple.png';
import { hideSelect, changeEffectiveBtn } from '../../header/modal/modalRepeat';
import { getCurrentDateText, detectFirstDayMonth, daysInMonth, formatNumDate, returnMonth, getToday, isPast, addOneToMonth} from "/src/utilities/dateUtils";
let typeCal, currentMonth, currentYear;
let isInputValid = false;
let getInputDate;
const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function changeInputDate(value){
    getInputDate=value;
}

export default function CalFactory(mainBtn, appendTo, textElem, returnInput, returnQuickBtns, returnCal, returnDay, userClass, toClose){
    const mainDiv = elementCreator("div", ["class", `cal-${userClass}-div`], false, appendTo)
    if(returnInput){generateCalInput(mainDiv,textElem, userClass)};
    if(returnQuickBtns){generateQuickBtns(mainDiv, userClass)};
    if(returnCal){generateCal(mainDiv, textElem, returnDay, mainBtn, userClass, toClose)};
    removeCalDivOnOutsideClick(mainDiv, mainBtn, userClass);
    return {mainDiv};
}
// Makes the calender------------------------------------------------------------------------------
function generateCal(div, textElem, returnDay, mainBtn, userClass, toClose){
    const datePickCalDiv = elementCreator("div", ["class", "cal-head-div"], false, div);
    const calenderDiv = elementCreator("div", ["class", "cal-main-div"], false, datePickCalDiv);
    const [date,titleText] = calArrowsTitle(datePickCalDiv, textElem, mainBtn, userClass, toClose);
    createCalHeader(calenderDiv,typeCal);
    createDaySquares(calenderDiv, date, titleText, returnDay, textElem, mainBtn, userClass, toClose);
}

function createCalHeader(div){
    //create header
    for(let i=0;i<7;i++){
        elementCreator("div", ["class", `cal-calender-header`], weekArr[i],div);
    }
}
function createDaySquares(div, date, text, returnDay, textElem, mainBtn, userClass, toClose){
    const [firstDayMonth, lastDayMonth] = firstLastDay(date);
    let prevMonth = prevMonthDays([firstDayMonth, lastDayMonth], date, text);
    let dayCount=1, nextMonthCount=1;
    for(let i=0;i<42;i++){
        const square = elementCreator("div", ["class", "cal-square"], false, div);
        if(i<firstDayMonth){
            square.innerText = (prevMonth-((firstDayMonth-1)-i));
            square.classList.add("cal-other-month");
            square.classList.add("cal-prev");
        }
        else if(i>=firstDayMonth && dayCount<=lastDayMonth){ //days of current Month
            square.innerText = dayCount;
            dayCount++;
        }
        else if(i>=lastDayMonth){
            square.innerText = nextMonthCount;
            nextMonthCount++;
            square.classList.add("cal-other-month");
            square.classList.add("cal-next");
        }
        if(dayCount===getToday("day")+1 && date[0]===returnMonth(getToday("month")) &&Number(date[1])===getToday("year")){
            square.classList.add("cal-current-day")
        }
        if(inputCalDay(false, square)){
            square.classList.add("cal-valid-day")
        }
        if(square.className.includes("cal-valid-day")){
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
        if(!tar.includes("cal-other-month")){
            month = currentMonth;
            year = currentYear;
        }
        else if(tar.includes("cal-prev")){
            [month, year] = incrDecrMonth(text, false, true).split(" ");
        }
        else if(tar.includes("cal-next")){
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
        else{
            div.parentElement.parentElement.remove();
            if(toClose){
                hideSelect();
                changeEffectiveBtn("until");
                if(userClass==="effective"){
                    document.querySelector(".summary-text-3").innerText=`until ${document.querySelector(".effective-other-text").innerText}.`;
                }
            }
            e.stopPropagation();
        }
    }
}


function removeCalDivOnOutsideClick(div, btn, userClass){
    document.addEventListener("click", hideDivFromSquareClick);
    document.addEventListener("keypress", hideDivFromInputKeypress);
    function hideDivFromSquareClick(e){
        const divClass = div.classList[0];
        if(!e.target.closest(`.${divClass}`) && e.target!==btn){
            resetShit()
        }
    }
    function hideDivFromInputKeypress(e){
        if(e.key==="Enter" && isInputValid===true){
            resetShit();
        }
    }
    function resetShit(){
        if(document.querySelector(`.cal-${userClass}-div`!==null)){
            console.log(userClass);
            document.removeEventListener("click",hideDivFromSquareClick);
            document.removeEventListener("click",hideDivFromInputKeypress);
            document.querySelector(`.cal-${userClass}-div`).remove();
        }
        isInputValid=false;
    }
}





export function validateInputCal(isTrue){
    isInputValid = isTrue?true:false;
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
function calArrowsTitle(div, textElem, mainBtn, userClass, toClose){
    const calenderTitleDiv = elementCreator("div", ["class", "cal-title-div"], false, div, true);
    const arrowDivLeft = elementCreator("div", ["class","cal-arrow-div"], false, calenderTitleDiv);
    const arrowLeft = imageCreator(arrow, ["class", "cal-arrow", "cal-arrow-left"], arrowDivLeft);
    const titleText = elementCreator("p", ["class", "cal-title-text"],`${getCurrentDateText("month")} ${getCurrentDateText("year")}`, calenderTitleDiv);
    [currentMonth, currentYear] = titleText.innerText.split(" ");
    const arrowDivRight = elementCreator("div", ["class","cal-arrow-div"], false, calenderTitleDiv);
    const arrowRight = imageCreator(arrow, ["class", "cal-arrow","cal-arrow-right"], arrowDivRight);
    arrowHoverEffect([arrowDivLeft, arrowLeft], ["cal-arrow-left-hov","cal-arrow-clicked-right"]);
    arrowHoverEffect([arrowDivRight, arrowRight], ["cal-arrow-right-hov","cal-arrow-clicked-right"]);
    arrowChoose(arrowDivLeft, arrowDivRight, titleText, textElem, mainBtn, userClass, toClose);
    return [titleText.innerText.split(" "), titleText];
}

function arrowChoose(leftBtn, rightBtn, text, textElem, mainBtn, userClass, toClose){
    rightBtn.addEventListener("click", ()=>{
        incrDecrMonth(text, true, false, textElem, mainBtn, userClass, toClose);
    });
    leftBtn.addEventListener("click", ()=>{
        incrDecrMonth(text, false, false, textElem, mainBtn, userClass, toClose);
    });
}

function incrDecrMonth(text, isIncr, onlyValue, textElem, mainBtn, userClass, toClose){
    let [month, year] = text.innerText.split(" ");
    month = returnMonth(month)+1;
    const date = new Date(`${year}-${month}-1`);
    const nextMonth = new Date(date);
    let action = isIncr?nextMonth.getMonth() + 1 : nextMonth.getMonth() - 1;
    nextMonth.setMonth(action ,1);
    if(!onlyValue){
        text.innerText = `${returnMonth(nextMonth.getMonth())} ${nextMonth.getFullYear()}`;
        [currentMonth, currentYear] = text.innerText.split(" ");

        renderCalender(text.innerText.split(" "), text, textElem, mainBtn, userClass, toClose);
    }
    else{
        return `${returnMonth(nextMonth.getMonth())} ${nextMonth.getFullYear()}`;
    }
}
function renderCalender(date, text, textElem, mainBtn, userClass, toClose){
    let calDiv = text.parentElement.parentElement;
    const squares = calDiv.querySelectorAll(".cal-square");
    const div = calDiv.querySelector(".cal-main-div");
    squares.forEach(elem=>elem.remove());
    createDaySquares(div, date, text, false, textElem, mainBtn, userClass, toClose);
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
function generateCalInput(div,textElem, userClass){
    const enterDateDiv = elementCreator("div", ["class", "cal-general-date-div"], false, div);
    const enterDateInput = elementCreator("input", ["class", "cal-general-input"], false, enterDateDiv);
    enterDateInput.placeholder="Write your date & press enter";
    modalDateInputFunc(enterDateInput, textElem, false);
    const iconDiv = elementCreator("div", ["class", "cal-icon-div"], false, enterDateDiv )
    createIcon(iconDiv, "Hello", ["cal-i-div","cal-i-img", "cal-i-img-div"]);
    enterDateInput.addEventListener("keypress", closeDiv);
    function closeDiv(e){
        if(e.key==="Enter" && isInputValid){
            hideSelect();
            div.remove();
            enterDateInput.removeEventListener("keypress", closeDiv);
            isInputValid=false;
            if(userClass==="effective"){
                document.querySelector(".summary-text-3").innerText=`until ${document.querySelector(".effective-other-text").innerText}.`;
            }
            if(userClass==="adder"){
                document.querySelector(".due-btn-day-text").innerText = getInputDate;
                getInputDate="";
            }
        }
    }
}
// Makes the quickBtns-----------------------------------------------------------------
function generateQuickBtns(div, userClass){
    const dateBtnsDiv = elementCreator("div", ["class", "cal-general-quick-div"], false,div);
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
                quickAddBtnsFunc(btn, userClass);
              }
        }
    })
}