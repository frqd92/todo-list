import { homeViewChoice } from "../../state";
import { returnMonth, findRelativeDate, textDateToNum, formatNumDate } from "../../utilities/dateUtils";
import { elementCreator, imageCreator } from "../../utilities/elementCreator";
import smallCalPng from '/src/assets/images/calendar-small.png'
import './taskRow.css'
//actually makes the task row in the dom
export function TaskrowFact(taskObj){

    const taskDiv = elementCreator("div", ["class", "home-task-row"], false, document.querySelector(".disp-task-div"));
    const titleDiv = elementCreator("div", ["class", "tr-title"], false, taskDiv);
    elementCreator("p", false, taskObj.title, titleDiv)

    const dueDateDiv = elementCreator("div", ["class", "tr-due-div"], false, taskDiv);
    const dueCalIcon = imageCreator(smallCalPng, false, dueDateDiv);
    const dueDate = formatNumDate(`${taskObj.due[0]}/${taskObj.due[1]}/${taskObj.due[2]}`)
    const dueText = elementCreator("p", false, dueDate, dueDateDiv )


    return {taskDiv}
}

export function clearTasksHome(){
    const allRows = document.querySelectorAll(".disp-task-div > *")

    allRows.forEach(elem=>elem.remove())
}








//tasks-------------------------------------------------------------------------------------------
//takes the array from taskboxDateArray and compares it to the user's task array due date, compares the dates and if they match adds the task to array tasksToDisplay
export function homeTaskDisplay(taskObj){
    clearTasksHome();
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

