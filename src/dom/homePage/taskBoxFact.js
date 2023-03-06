import { elementCreator, imageCreator } from "../../utilities/elementCreator";
import { getToday, fullFormattedDate, addOneToMonth, findRelativeDate, formatNumDate, returnMonth, recursiveFunc, textDateToNum} from '../../utilities/dateUtils';
import { isAutoHide, changeAutoHide, taskArray, groupArray, homeViewChoice } from "../../state";
import rangeArrow from '/src/assets/images/neat-arrow.png'
import { OneRowCalFact } from "/src/dom/calenderFact/singleRowCal";
import { newDateSquaresWeek, newDateSquaresMonth } from "../calenderFact/singleRowCal";


export default function TaskBoxFact(type){
    
    const textDateElem = dateProcess(type);


    //creating the taskbox head elements;
    const taskboxDiv = elementCreator("div", ["class", "taskbox-div", `taskbox-div-${type}`], false, document.getElementById("taskbox-sub-container"));
    createHeadElements(type, textDateElem, taskboxDiv);


    //if weekly or monthly add the single row cal
    if(type==="weekly" || type==="monthly"){
        const weeklyRowCal = OneRowCalFact(type, taskboxDiv);
    };

    //task processing
    const dispTasksDiv = elementCreator("div", ["class", `disp-${type}-taskdiv`], false, taskboxDiv )


    return { taskboxDiv  }
}



//tasks-------------------------------------------------------------------------------------------
//takes the array from taskboxDateArray and compares it to the user's task array due date, compares the dates and if they match adds the task to array tasksToDisplay
export function homeTaskDisplay(taskObj){
    const chosenDate = taskboxDateArray(document.querySelector(`.${homeViewChoice}-date-range`), homeViewChoice);
    const tasksToDisplay = [];
    taskObj.forEach(elem=>{
        const [taskD, taskM, taskY] = elem.due;
        for(let date of chosenDate){
            if(taskD===date[0] && taskM===date[1] && taskY===date[2]){
                tasksToDisplay.push(elem);
            }
        }
    });
    renderTaskRows(tasksToDisplay);
}
function renderTaskRows(tasks){
    tasks.forEach(elem=>{
        const taskRow = TaskrowFact(elem);
    })
}
//actually makes the task row in the dom
function TaskrowFact(taskObj){
    const taskDiv = elementCreator("div", ["class", "home-task-row"], false, document.querySelector(`.disp-${homeViewChoice}-taskdiv`));
    elementCreator("p", false, "jkfldsjfkldsfjdsklasasasasasasafjdskfjdsl", taskDiv)

    return {taskDiv}
}











//takes the selected range of time, and displays all the dates in an array
function taskboxDateArray(dateDiv, type){
    if(type==="daily"){
        const [dd,mm,yy] = textDateToNum(dateDiv.innerText).split("/");
        return [[Number(dd), Number(mm), Number(yy)]];
    }
    else if(type==="weekly"){
        const allArr = [];
        const dateStart = dateDiv.querySelector(".weekly-date-range p").innerText;
        for(let i=0;i<7;i++){
            const [dd,mm,yy] = findRelativeDate(dateStart, i, true).split("/");
            allArr.push([Number(dd), Number(mm), Number(yy)])
        }
        return allArr;
    }
    else if(type==="monthly"){
        const allArr = [];
        const monthSquares = document.querySelectorAll(".month-square");
        let [mm,yy] = dateDiv.innerText.split(" ");
        mm = returnMonth(mm);
        for(let i=1;i<=monthSquares.length;i++){
            allArr.push([i,mm,Number(yy)]);
        }
        return allArr;
    }
}







//Dropdown menu----------------------------------------------------------------------------
function createDropdown(type, div){
    const dropdownDiv = elementCreator("div", ["class", "tb-dropdown"], false, div);
    const upperDiv = elementCreator("div", ["class", "tb-dropdown-upper", "tb-upper-hidden"], false, dropdownDiv);
    const autoHideCont = elementCreator("div", ["class", "tb-autohide"], false, upperDiv);
    const autohideCheck = elementCreator("div", ["class", "tb-check"], false, autoHideCont);
    autohideCheck.innerHTML ="&#x2713";
    const autoLabel = elementCreator("span",["class", "autohide-label"], "Disable autohide", upperDiv);
    autoHideFunc();

    const progressDiv = elementCreator("div", ["class", "tb-progress"], false, upperDiv);
    const graph = elementCreator("div", ["class", "graph-div"], false, progressDiv);

    const thisBtn = elementCreator("div", ["class", "tb-dropdown-this"], thisText()[0], upperDiv)
    const goToBtn = elementCreator("div", ["class", "tb-dropdown-go"],thisText()[1], upperDiv);



    const lowerDiv = elementCreator("div", ["class", "tb-dropdown-lower"], false, dropdownDiv);
    const container = elementCreator("div", ["class", "tb-arrow-div"], false, lowerDiv);
    const arrow = elementCreator("div", ["class", "tb-lower-hidden"],"^", container);

    lowerDiv.addEventListener("click", showHideDropdown);
    dropdownDiv.addEventListener("mouseover",showMain);

    function showMain(){
        if(isAutoHide==="no-hide"){
            return
        }
        upperDiv.classList.remove("tb-upper-hidden");
        arrow.classList.remove("tb-lower-hidden")
        dropdownDiv.removeEventListener("mouseover",showMain);
        dropdownDiv.addEventListener("mouseleave",hideMain)
    }
    function hideMain(e){
        if(isAutoHide==="no-hide"){
            return
        }
        upperDiv.classList.add("tb-upper-hidden");
        arrow.classList.add("tb-lower-hidden")
        dropdownDiv.addEventListener("mouseover",showMain);
        dropdownDiv.removeEventListener("mouseleave",hideMain)
    }


    function autoHideFunc(){
        autoHideCont.addEventListener("mouseover", ()=>{autoLabel.style.display = "block";});
        autoHideCont.addEventListener("mouseleave", ()=>{autoLabel.style.display = "none";});

        getHideState()
        autoHideCont.addEventListener("click", autohideState);
        function getHideState(){
            const state = localStorage.getItem("dropdown-hide");
            if(state!==null){
                state==="no-hide"?showDrop(false):hideDrop(false);
            }
        }
        function autohideState(){
            if(isAutoHide==="autohide"){
                showDrop(true);
                localStorage.setItem("dropdown-hide", "no-hide");
            }
            else{
                hideDrop(true)
                localStorage.setItem("dropdown-hide", "autohide");
            }
        }
    }
    function showDrop(bool){
        if(bool){
            const checks = document.querySelectorAll(".tb-check");
            const labels = document.querySelectorAll(".autohide-label");
            for(let i=0;i<3;i++){
                checks[i].style.display="none";
                labels[i].innerText = "Enable autohide";
                labels[i].style.right = "-94px";
            }
        }
        else{
            autohideCheck.style.display="none";
            autoLabel.innerText = "Enable autohide";
            autoLabel.style.right = "-94px";
        }
        changeAutoHide("no-hide");
    }
    function hideDrop(bool){
        if(bool){
            const checks = document.querySelectorAll(".tb-check");
            const labels = document.querySelectorAll(".autohide-label");
            for(let i=0;i<3;i++){
                checks[i].style.display="block";
                labels[i].innerText = "Disable autohide";
                labels[i].style.right = "-98px";
            }    
        }
        else{
            autohideCheck.style.display="block";
            autoLabel.innerText = "Disable autohide";
            autoLabel.style.right = "-98px";
        }
        changeAutoHide("autohide");
    }
    function showHideDropdown(){
        if(upperDiv.className.includes("tb-upper-hidden")){
            upperDiv.classList.remove("tb-upper-hidden");
            arrow.classList.remove("tb-lower-hidden")
        }
        else{
            upperDiv.classList.add("tb-upper-hidden");
            arrow.classList.add("tb-lower-hidden")
        }
    }
    

    function thisText(){
        switch(type){
            case "daily": return ["Today", "Go to day"];
            case "weekly": return ["This week", "Go to week"];
            case "monthly": return ["This month", "Go to month"];
        }
        
    }

}













//Head Elements----------------------------------------------------------------------------
function createHeadElements(type, text, div){
    const containerHead = elementCreator("div", ["class", "taskbox-head", `taskbox-head-${type}`], false, div);
    const arrowLeft = createArrow(containerHead, true);
    containerHead.appendChild(text);
    const arrowRight= createArrow(containerHead);
    arrowEffect([arrowLeft, arrowRight]);
    arrowFunc(containerHead, type);
    const dropDownMasterCont = elementCreator("div", ["class", "drop-master-cont"], false, containerHead)
    createDropdown(type, dropDownMasterCont);
    return containerHead;
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
    [left,right].forEach(btn=>{btn.addEventListener("click", incrDecrDay);})
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
    [left,right].forEach(btn=>{btn.addEventListener("click", incrDecrWeek);})
    function incrDecrWeek(){
        const text = left.nextSibling;
        const date = text.querySelectorAll("p");
        const from = date[0];
        const to = date[1];

        if(this.className.includes("taskbox-right-div")){
            const rDateFrom = addOneToMonth(to.innerText, true);
            from.innerText = formatNumDate(addOneToMonth(findRelativeDate(rDateFrom,1)));
            to.innerText = formatNumDate(addOneToMonth(findRelativeDate(rDateFrom,7)));

        }
        else{
            const rDateTo = addOneToMonth(from.innerText, true);
            to.innerText = formatNumDate(addOneToMonth(findRelativeDate(rDateTo,-1)));
            const rDateFrom = addOneToMonth(to.innerText, true);
            from.innerText = formatNumDate(addOneToMonth(findRelativeDate(rDateFrom,-6)));
        }
        //clicking on arrows to generate new squares from singleRowCal
        if(document.querySelector(".hidden-onerow-weekly")===null)newDateSquaresWeek()
    }
}
function arrowMonthlyFunc(left,right){
    [left,right].forEach(btn=>{btn.addEventListener("click", incrDecrMonth);})
    function incrDecrMonth(){
       const text = left.nextSibling;
       const dateText = text.innerText.split(" ");
       const date = new Date(`1 ${dateText[0]} ${dateText[1]}`);
       this.className.includes("taskbox-right-div")?calc(1, 11, "January"):calc(-1, 0, "December");

        function calc(num, month, str){
            date.getMonth()!==month?text.innerText = 
            `${returnMonth(date.getMonth() + num)} ${date.getFullYear()}`: text.innerText = `${str} ${Number(dateText[1])+num}`;
       }
       if(document.querySelector(".hidden-onerow-monthly")===null)newDateSquaresMonth()
    }

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