import { returnMonth, isPast } from "../../utilities/dateUtils";
export function arrowChoose(leftBtn, rightBtn ,textDiv){
    rightBtn.addEventListener("click", ()=>{
        incrDecrMonth(textDiv, true)
    });
    leftBtn.addEventListener("click", ()=>{
        incrDecrMonth(textDiv, false)
    });

}


function incrDecrMonth(text, isIncr){

    let [month, year] = text.innerText.split(" ");
    const date = new Date(`${month}-1-${year}`);
    month = returnMonth(month);
    const nextMonth = new Date(date);
    let action = isIncr?nextMonth.getMonth() + 1 : nextMonth.getMonth() - 1;
    nextMonth.setMonth(action ,1);
    isPast(nextMonth.getMonth()+1, year);

    text.innerText = `${returnMonth(nextMonth.getMonth()+1)} ${nextMonth.getFullYear()}`;
}

