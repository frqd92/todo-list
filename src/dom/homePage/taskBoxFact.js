import { elementCreator, imageCreator } from "../../utilities/elementCreator";
import { getToday, fullFormattedDate, addOneToMonth, findRelativeDate, formatNumDate, returnMonth } from '../../utilities/dateUtils';
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
    return taskboxDiv;
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
        return [
            addOneToMonth(formatNumDate(from.split("/"))),
            addOneToMonth(formatNumDate(to.split("/")))
        ]
    }
}


//can't use the one in dateUtil because I fucked up and used a bad date format (month 0-11) but there's already a bunch of other functions using it... Plan shit better next time kunt
function chosenDayFunc2(str) {
    const [day,month,year] = str.split("/"); 
    const chosenDay = new Date(year, month, day);
    return chosenDay.toLocaleString('en-us', {weekday: 'long'})
}
// recursive function that looks for the date range of a specific date
// also messed up because of the 0-11 month shenanigans
function recursiveFunc(date, isIncrement){
    const limit = isIncrement?"Sunday":"Monday";
    const step = isIncrement?1:-1;
    if(chosenDayFunc2(date)===limit) return date;

    const [dd,mm,yy] = date.split("/");
    const newDate = findRelativeDate(`${dd}/${mm}/${yy}`, step);
    const weekDay = chosenDayFunc2(newDate);
    if(weekDay===limit) return newDate;
    else return recursiveFunc(newDate, isIncrement);
}



























//arrow stuff
function createArrow(div, isLeft){
    const arrow = isLeft?"<":">";
    const arrowDiv = elementCreator("div", ["class", "taskbox-arrow-div"], false, div);
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