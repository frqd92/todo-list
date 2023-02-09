import { elementCreator } from "../utilities/elementCreator";

export function createCalIcon(parent){
    const div = elementCreator("div", ["class", "header-calender-div"], false, parent);
    const clickDiv = elementCreator("div", ["class", "calender-click-div"], false, div)

    const monthDiv = elementCreator("div", ["class", "header-calender-month"], getDate()[0],div);
    const dayDiv = elementCreator("div", ["class", "header-calender-day"], getDate()[1],div);



    return div
}

function getDate(){
    const date = String(new Date());

    return [date.split(" ")[1], date.split(" ")[2]]
}