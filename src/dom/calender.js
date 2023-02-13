import { elementCreator, imageCreator } from "../utilities/elementCreator";
import { getCurrentDateText } from "../utilities/dateUtils";
import arrow from '/src/assets/images/arrow-simple.png';
//add menu, date picked calender

export function createDatePickCal(div){
    const calenderTitleDiv = elementCreator("div", ["class", "calender-title-div"], false, div);
    const arrowDivLeft = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowLeft = imageCreator(arrow, ["class", "add-cal-arrow", "add-arrow-left"], arrowDivLeft);
    const titleText = elementCreator("p", ["class", "calender-title-text"],`${getCurrentDateText("month")} ${getCurrentDateText("year")}`, calenderTitleDiv);
    const arrowDivRight = elementCreator("div", ["class","arrow-div"], false, calenderTitleDiv);
    const arrowRight = imageCreator(arrow, ["class", "add-cal-arrow","add-arrow-right"], arrowDivRight);
    arrowHoverEffect([arrowDivLeft, arrowLeft], ["add-arrow-left-hov","add-arrow-clicked-right"]);
    arrowHoverEffect([arrowDivRight, arrowRight], ["add-arrow-right-hov","add-arrow-clicked-right"]);

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

//little calender icon in header
export function createCalIcon(parent){
    const div = elementCreator("div", ["class", "header-calender-div"], false, parent);
    const clickDiv = elementCreator("div", ["class", "calender-click-div"], false, div)

    const monthDiv = elementCreator("div", ["class", "header-calender-month"], getDate()[0],div);
    const dayDiv = elementCreator("div", ["class", "header-calender-day"], getDate()[1],div);

    return div

    function getDate(){
        const date = String(new Date());
        return [date.split(" ")[1], date.split(" ")[2]]
    }
}

