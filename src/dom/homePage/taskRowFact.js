import { homeViewChoice } from "../../state";
import { returnMonth, findRelativeDate, textDateToNum, formatNumDate } from "../../utilities/dateUtils";
import { elementCreator, imageCreator } from "../../utilities/elementCreator";
import smallCalPng from '/src/assets/images/calendar-small.png'
import repeatPng from '/src/assets/images/refresh.png';
import notebookPng from '/src/assets/images/notebook.png';
import layersPng from '/src/assets/images/layers.png';
import './taskRow.css'
//actually makes the task row in the dom
export function TaskrowFact(taskObj){

    const taskDiv = elementCreator("div", ["class", "home-task-row"], false, document.querySelector(".disp-task-div"));
    const titleDiv = elementCreator("div", ["class", "tr-title"], false, taskDiv);
    elementCreator("p", false, taskObj.title, titleDiv)

    const dueDateDiv = elementCreator("div", ["class", "tr-due-div"], false, taskDiv);
    const dueCalIcon = imageCreator(smallCalPng, false, dueDateDiv);

    const dueTextDiv = elementCreator("div", false, false, dueDateDiv )
    const dueDate = taskRowDueDateFormat(taskObj.due, dueTextDiv);

    otherTaskElements(taskDiv, taskObj);    


    checkBtnFunc(taskDiv, taskObj);

    return {taskDiv}
}

function checkBtnFunc(parentDiv, obj){
    const checkOuter = elementCreator("div", ["class", "tr-check-div"], false, parentDiv);
    const checkInner = elementCreator("p", false, false, checkOuter);
    checkInner.innerHTML = "&#x2713";
    if(obj.isComplete){

    }
    else{

    }
}





function otherTaskElements(parentDiv, obj){
    const otherDiv = elementCreator("div", ["class", "tr-other-div"], false, parentDiv);
    //priority
    const priorityImg = elementCreator("div", ["class", "tr-priority"], false, otherDiv);
    priorityImg.style.backgroundColor = priorityColor(obj.priority);

    //repeat
    const repeatImgDiv = elementCreator("div", ["class", "tr-repeat"], false, otherDiv);
    imageCreator(repeatPng, false, repeatImgDiv);
    elementCreator("span",["class", "tr-x"], "X", repeatImgDiv);
    trRepeatImgFunc(repeatImgDiv, obj.repeat);

    //notes
    const notesDiv = elementCreator("div", ["class", "tr-notes"], false, otherDiv);
    imageCreator(notebookPng, false, notesDiv);
    elementCreator("span", ["class", "tr-x"], "X", notesDiv);

    //groups
    const groupsDiv = elementCreator("div", ["class", "tr-groups"], false, otherDiv);
    imageCreator(layersPng, false, groupsDiv);
    elementCreator("span", ["class", "tr-x"], "X", groupsDiv);

}

function trRepeatImgFunc(div, isRepeat){
    console.log(isRepeat);
    const [img, xImg] = div.childNodes;
    if(isRepeat){
        xImg.style.display = "none";
    }
    else{
        xImg.style.display = "block";
    }
}

function priorityColor(priority){
    const colors = ["rgba(182, 137, 53, 0.9)", "rgba(225, 85, 46, 0.9)", "rgba(202, 42, 42, 0.9)"];
    switch(priority){
        case "Normal": return colors[0];
        case "High": return colors[1];
        case "Highest": return colors[2];
    }
}

export function clearTasksHome(){
    const allRows = document.querySelectorAll(".disp-task-div > *")

    allRows.forEach(elem=>elem.remove())
}



//due date format
function taskRowDueDateFormat(date, parentDiv){
    let fDate =  formatNumDate(`${date[0]}/${date[1]}/${date[2]}`).split("/");
    const div = document.createElement("div");
    for(let i=0;i<3;i++){
        const p = elementCreator("p", false, fDate[i], div);
        if(i!==2){
            elementCreator("span", false, "/", div)
        }
    }
    parentDiv.appendChild(div);
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

