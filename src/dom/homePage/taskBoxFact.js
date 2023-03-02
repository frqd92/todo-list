import { elementCreator } from "../../utilities/elementCreator";
import { getToday, fullFormattedDate, addOneToMonth, chosenDayFunc, findRelativeDate } from '../../utilities/dateUtils';

export default function TaskBoxFact(type){
    
    let textDate;
    if(type==="daily" || type==="weekly"){
        textDate = dateProcess(type);
    }
    else{
        textDate = "fart";
    }


    //creating the elements in the dom;

    const taskboxElements = createElements(type, textDate);


    return { taskboxElements  }
}



function createElements(type, textDate){
    const taskboxDiv = elementCreator("div", ["class", "taskbox-div", `taskbox-div-${type}`], false, document.getElementById("taskbox-sub-container"));
    const containerHead = elementCreator("div", ["class", "taskbox-head"], false, taskboxDiv);
    const arrowLeft = createArrow(containerHead, true);
    const dateDisplay = elementCreator("p", false, textDate, containerHead);
    const arrowRight= createArrow(containerHead);
    arrowEffect([arrowLeft, arrowRight]);
    return taskboxDiv;
}

function dateProcess(type){
    switch(type){
        case "daily": return fullFormattedDate(getToday());
        case "weekly": return formatForWeek();
    }
    function formatForWeek(){
        const [day,month,year] = getToday().split("/");
        let index = -1;
        let from;

        if(chosenDayFunc(day,month,year)!=="Monday"){

            console.log(recursiveFunc(getToday(), false));
        }
        else{
            from = getToday();
        }
        //const to = recursiveFunc(getToday(), true);
        function recursiveFunc(date, isIncrement){
            const [dd,mm,yy] = date.split("/");
            const newDate = findRelativeDate(`${dd}/${mm}/${yy}`, -1);
            const [newD, newM, newY] = newDate.split("/");
            const weekDay = chosenDayFunc(newY, newM, newD);

            if(weekDay==="Monday"){
                return newDate;
            }
            else{
                index=-1;
                recursiveFunc(newDate, isIncrement);
            }

        }
      
          
          
    }
    
    
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