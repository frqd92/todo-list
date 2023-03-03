import { elementCreator, imageCreator } from "../../utilities/elementCreator";
import { getToday, fullFormattedDate, addOneToMonth, findRelativeDate, formatNumDate, returnMonth, chosenDayFunc2, recursiveFunc, textDateToNum} from '../../utilities/dateUtils';
import rangeArrow from '/src/assets/images/neat-arrow.png'

export default function TaskBoxFact(type){
    
    const textDateElem = dateProcess(type);

    //creating the elements in the dom;
    const taskboxElements = createElements(type, textDateElem);


    return { taskboxElements  }
}



function createElements(type, text){
    const taskboxDiv = elementCreator("div", ["class", "taskbox-div", `taskbox-div-${type}`], false, document.getElementById("taskbox-sub-container"));
    const containerHead = elementCreator("div", ["class", "taskbox-head"], false, taskboxDiv);
    const arrowLeft = createArrow(containerHead, true);
    containerHead.appendChild(text);
    const arrowRight= createArrow(containerHead);
    arrowEffect([arrowLeft, arrowRight]);
    arrowFunc(containerHead, type);
    return taskboxDiv;
}

function arrowFunc(div, type){
    const [leftArr,text,rightArr] = div.childNodes;

    switch(type){
        case "daily": arrowDailyFunc(leftArr,rightArr);break;
        case "weekly": arrowWeeklyFunc(leftArr, rightArr);break;
        case "monthly": arrowMonthlyFunc(leftArr, rightArr);
    }
}


function arrowDailyFunc(left, right){
    [left,right].forEach(btn=>{
        btn.addEventListener("click", incrDecrDay);
    })
    function incrDecrDay(){
        const text = left.nextSibling;
        const date = textDateToNum(text.innerText);
        if(this.className.includes("taskbox-left-div")){
            text.innerText = fullFormattedDate(findRelativeDate(date,-1));
        }
        else{
            text.innerText = fullFormattedDate(findRelativeDate(date,1));
        }
    }
}

function arrowWeeklyFunc(left,right){
    [left,right].forEach(btn=>{
        btn.addEventListener("click", incrDecrWeek);
    })
    function incrDecrWeek(){
        const text = left.nextSibling;
        const date = text.querySelectorAll("p");
        const from = date[0];
        const to = date[1];
        if(this.className.includes("taskbox-right-div")){
            let rDateFrom = addOneToMonth(to.innerText, true);
            from.innerText = addOneToMonth(findRelativeDate(rDateFrom,1));
            let rDateTo = addOneToMonth(from.innerText, true);
            to.innerText = addOneToMonth(findRelativeDate(rDateTo,6));
        }
        else{
            let rDateTo = addOneToMonth(from.innerText, true);
            to.innerText = addOneToMonth(findRelativeDate(rDateTo,-1));
            let rDateFrom = addOneToMonth(to.innerText, true);
            from.innerText = addOneToMonth(findRelativeDate(rDateFrom,-6));
        }
    }
}
function arrowMonthlyFunc(left,right){

}






function dateProcess(type){
    const div = elementCreator("div", ["class", `${type}-date-range`])
    if(type==="daily"){
        div.innerText = fullFormattedDate(getToday());
    }
    else if(type==="weekly"){
        const [lText, rText] = formatForWeek();
        const left = elementCreator("p", false, lText, false);
        const right = elementCreator("p", false, rText, false);
        div.appendChild(left); 
        div.appendChild(imageCreator(rangeArrow, false, false));
        div.appendChild(right);
    }
    else if(type==="monthly"){
        div.innerText = returnMonth(getToday("month")) + " " + getToday("year");
    }
    return div;
    function formatForWeek(){
       const from = recursiveFunc(getToday(), false);
       const to = recursiveFunc(getToday(), true);
        return [addOneToMonth(formatNumDate(from.split("/"))), addOneToMonth(formatNumDate(to.split("/")))]
    }
}


























//arrow stuff
function createArrow(div, isLeft){
    const arrow = isLeft?"<":">";
    const arrClass = isLeft?"taskbox-left-div":"taskbox-right-div";
    const arrowDiv = elementCreator("div", ["class", "taskbox-arrow-div", arrClass], false, div);
    for(let i=0;i<3;i++){elementCreator("p", ["class", `arrow-${arrow}`], arrow, arrowDiv);}
    return arrowDiv
}
function arrowEffect(btns){
    btns.forEach(btn=>{
        btn.addEventListener("mouseover", arrowHover);
        btn.addEventListener("click", arrowHover);
    })

    function arrowHover(e){
        const arrows = this.querySelectorAll("p");
        const arrowDirection = this.childNodes[0].className.split("").pop();
        const isLeft = arrowDirection==="<"?true:false;
        let timer = 0; 
        if(isLeft){for(let i=arrows.length-1;i>=0;i--){callTimer(i)}}
        else{for(let i=0;i<arrows.length;i++){callTimer(i)}}
        function callTimer(i){
            timeFunc(timer, arrows[i]);
            timer+=100; 
        }
        function timeFunc(timer, elem){
            setTimeout(()=>{elem.classList.add("taskbox-animate");}, timer);
            setTimeout(()=>{elem.classList.remove("taskbox-animate");}, timer + 300)
        }
    }

}