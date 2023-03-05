import { elementCreator } from "../../utilities/elementCreator";
import { findRelativeDate, getToday, returnMonth, daysInMonth} from "../../utilities/dateUtils";
import './singleCal.css'

export function OneRowCalFact(type, parentDiv){

    const mainDiv = elementCreator("div", ["class", `onerow-cal-${type}`], false, parentDiv);
    const hideBtn = elementCreator("div", ["class", "onerow-hide-btn"], "Hide", mainDiv);
    hideBtnFunc(hideBtn, mainDiv, type);
    if(type==="weekly") createWeekCal(mainDiv);
    if(type==="monthly") createMonthCal(mainDiv);


    return {mainDiv};
}


//month--------------------------------------------------------------------------------
function createMonthCal(div){
    const [mm,yy] = document.querySelector(".monthly-date-range").innerText.split(" ");
    const monthDays = daysInMonth(mm,yy);
    for(let i=0;i<monthDays;i++){
        const monthSquare = elementCreator("div", ["class", "month-square"], false, div);
        elementCreator("p", ["class", "month-square-day"], i+1, monthSquare);

    }
 
}
export function newDateSquaresMonth(){
    const allSquares = document.querySelectorAll(".month-square");
    allSquares.forEach(square=>{square.remove();})
    createMonthCal(document.querySelector(".onerow-cal-monthly"));
}







//week--------------------------------------------------------------------------------
function createWeekCal(div){
    const dateStart = document.querySelector(".weekly-date-range p").innerText;
    const [todayDD, todayMM, todayYY] = getToday().split("/");

    for(let i=0;i<7;i++){
        const square = elementCreator("div", ["class", "week-square"], false,div);
        const num = findRelativeDate(dateStart, i, true).split("/");
        const month = returnMonth(num[1]).slice(0,3);
        if(num[0]==todayDD && num[1]===todayMM && num[2]===todayYY){
            elementCreator("p", ["class", "week-square-day"],"Today",square)
            square.classList.add("week-today")
        }
        else if(num[0]==1 && num[1]==0){
            elementCreator("p", ["class", "week-square-day"],`${month} ${num[2]}`,square)
        }
        else if(i===0 || (i!==0 && num[0]==1)){
            elementCreator("p", ["class", "week-square-day"],`${month} ${num[0]}`,square)
        }
        else{
            elementCreator("p", ["class", "week-square-day"],num[0],square)
        }
    }

}

export function newDateSquaresWeek(){
        const allSquares = document.querySelectorAll(".week-square");
        allSquares.forEach(square=>{square.remove();})
        createWeekCal(document.querySelector(".onerow-cal-weekly"));
}






function hideBtnFunc(btn, div, type){
    const tbHead = document.querySelector(`.taskbox-head-${type}`)
    btn.addEventListener("click", hideOnerow);
    function hideOnerow(e){
        relocateShowCal()
        hideShow(true)
        window.addEventListener("resize", relocateShowCal);
        e.stopPropagation();
        div.addEventListener("click", makeCalAgain);

    }
    function makeCalAgain(){
        window.removeEventListener("resize", relocateShowCal);
        hideShow(false)
    }
    function hideShow(isHide){
        const all = div.querySelectorAll("div")

        if(isHide){
            all.forEach(elem=>{elem.style.display = "none"})
            div.classList.add(`hidden-onerow-${type}`);
            elementCreator("p", ["class", `hidden-onerow-text`], "Show", div);
        }
        else{
            all.forEach(elem=>{elem.style.display = "flex"})
            div.classList.remove(`hidden-onerow-${type}`);
            div.style.top="0px";
            if(div.querySelector(".hidden-onerow-text")!==null){div.querySelector(".hidden-onerow-text").remove()}
            if(type==="weekly")newDateSquaresWeek();
        }
    }
    function relocateShowCal(){
        const headHeight = getComputedStyle(tbHead).height;
        div.style.top = headHeight;
    }
}