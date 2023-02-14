import { elementCreator, imageCreator } from "../utilities/elementCreator";
import { arrowChoose } from "/src/header/modal/addDateCal";
import arrow from '/src/assets/images/arrow-simple.png';
import { getCurrentDateText, detectFirstDayMonth, daysInMonth} from "/src/utilities/dateUtils";

const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



//add menu, date picked calender
export function calenderFact(div, type){
    const datePickCalDiv = elementCreator("div", ["class", "date-adder-calender-div"], false, div);
    //creates arrows and mm/yyyy above calender.. returns month, year
    const date = calArrowsTitle(datePickCalDiv);
    //the actual calender
    const calenderDivAdder = elementCreator("div", ["class", "calender-adder-div",`calender-adder-div-${type}`], false, datePickCalDiv);
    const calWidth = getComputedStyle(datePickCalDiv).getPropertyValue("width");
   
    createCalHeader(calenderDivAdder,type);

    if(type==="small"){
        let dateTest = ["February", "2098"]
        createDaySquaresSmall(calenderDivAdder, calWidth, dateTest);
    } 


    return Object.assign({}, datePickCalDiv);
}


function createCalHeader(div, type, date){

    //create header
    for(let i=0;i<7;i++){
        const headerSquare = elementCreator("div", ["class", `cal-header-${type}`, `cal-header-${weekArr[i].toLowerCase()}-${type}`], weekArr[i],div);
    }
}

function createDaySquaresSmall(div, width, date){
    const [mm,yy] = date;
    let firstDayMonth = detectFirstDayMonth(date).split("").slice(0,3).join("");
    firstDayMonth = weekArr.indexOf(firstDayMonth);
    let lastDayMonth =  daysInMonth(mm,yy);
    console.log(lastDayMonth)
    let dayCount=1;
    for(let i=0;i<42;i++){
        if(i>=firstDayMonth && dayCount<=lastDayMonth){
            const square = elementCreator("div", ["class", "cal-day-square"], dayCount, div);
            dayCount++;
        }
        else{
            const square = elementCreator("div", ["class", "cal-day-square"], false, div);

        }

    }
};








//the arrows and title
function calArrowsTitle(div){
    const calenderTitleDiv = elementCreator("div", ["class", "calender-title-div"], false, div);
    const arrowDivLeft = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowLeft = imageCreator(arrow, ["class", "add-cal-arrow", "add-arrow-left"], arrowDivLeft);
    const titleText = elementCreator("p", ["class", "calender-title-text"],`${getCurrentDateText("month")} ${getCurrentDateText("year")}`, calenderTitleDiv);
    const arrowDivRight = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowRight = imageCreator(arrow, ["class", "add-cal-arrow","add-arrow-right"], arrowDivRight);
    arrowHoverEffect([arrowDivLeft, arrowLeft], ["add-arrow-left-hov","add-arrow-clicked-right"]);
    arrowHoverEffect([arrowDivRight, arrowRight], ["add-arrow-right-hov","add-arrow-clicked-right"]);
    arrowChoose(arrowDivLeft, arrowDivRight, titleText);
    return titleText.innerText.split(" ");
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


