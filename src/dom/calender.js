import { elementCreator } from "../utilities/elementCreator";

export function createCalIcon(parent){
    const div = elementCreator("div", ["class", "header-calender-div"], false, parent);
    const monthDiv = elementCreator("div", ["class", "header-calender-month"], "FEB",div);
    const dayDiv = elementCreator("div", ["class", "header-calender-day"], "07",div);



    return 
}