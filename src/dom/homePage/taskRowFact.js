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
    const upperDiv = elementCreator("div", ["class", "tr-upper-part"], false, taskDiv);

    const titleDiv = elementCreator("div", ["class", "tr-title"], false, upperDiv);
    elementCreator("p", false, taskObj.title, titleDiv)

    const dueDateDiv = elementCreator("div", ["class", "tr-due-div"], false, upperDiv);
    const dueCalIcon = imageCreator(smallCalPng, false, dueDateDiv);
    const dueTextDiv = elementCreator("div", false, false, dueDateDiv )
    const dueDate = taskRowDueDateFormat(taskObj.due, dueTextDiv);
    otherTaskElements(upperDiv, taskObj);    
    checkBtnFunc(upperDiv, taskObj, taskDiv);

    lowerDivFunc(upperDiv, taskDiv, taskObj);

    return {taskDiv}
}
// lower Div---------------------------------------------------------------------------------------------

function createLowerDiv(mainDiv, obj){
    const div = elementCreator("div", ["class", "tr-lower-part", "tr-lower-effect"], false, mainDiv);
    setTimeout(()=>{div.classList.remove("tr-lower-effect")}, 1);

    const btnsDiv = elementCreator("div", ["class", "lower-btns"], false, div);
    const editBtn = elementCreator("div", false, "Edit", btnsDiv);
    const deleteBtn = elementCreator("div", false, "Delete", btnsDiv);

    const title = elementCreator("div", ["class", "lower-title"], false, div);
    elementCreator("p", false, obj.title, title);

    const description = elementCreator("div", ["class", "lower-description"], false, div);
    const descriptionText = !obj.description?"No description":obj.description;
    const descP = elementCreator("p", false, descriptionText, description);
    if(!obj.description){
        descP.classList.add("lower-no-desc");
    }
    




}


//logic to create/delete lowerdiv and apply the height effect.
function lowerDivFunc(upperDiv, mainDiv, obj){
    upperDiv.addEventListener("click", lowerFunc);
    function lowerFunc(e){
        if(e.target.closest(".tr-check-div")) return;
        if(mainDiv.querySelector(".tr-lower-part")===null){
            collapseAll()
            createLowerDiv(mainDiv, obj);
            mainDiv.classList.add("home-task-row-uncollapsed");
            window.addEventListener("click", collapseFromWindow)
        }
        else{
            mainDiv.classList.remove("home-task-row-uncollapsed");
            mainDiv.querySelector(".tr-lower-part").classList.add("tr-lower-effect");
            setTimeout(()=>{mainDiv.querySelector(".tr-lower-part").remove();}, 100)
        }
    }
    function collapseFromWindow(e){
        if(!e.target.closest(".disp-task-div")){
            collapseAll();
            window.removeEventListener("click", collapseFromWindow)
        }
    }
    function collapseAll(){
        if(document.querySelector(".tr-lower-part")!==null){
            const otherOpened = document.querySelector(".tr-lower-part");
            otherOpened.classList.add("tr-lower-effect");
            const otherRow = otherOpened.parentElement;
            const upperDiv = otherRow.querySelector(".tr-upper-part");
            otherRow.classList.remove("home-task-row-uncollapsed");
            setTimeout(()=>{otherOpened.remove()}, 100)
        }
    }
}




// check btn---------------------------------------------------------------------------------------------
function checkBtnFunc(parentDiv, obj, taskDiv){
    const checkDiv = elementCreator("div", ["class", "tr-check-div"], false, parentDiv)
    const checkInner = elementCreator("p", ["class", "tr-inner-check"], false, checkDiv);
    checkInner.innerHTML = "&#x2713";
    checkDiv.addEventListener("click", isCompleteFunc);
    checkDiv.addEventListener("mouseover", showCheckHov);
    function showCheckHov(e){
        let text = obj.isComplete?"Mark incomplete": "Mark complete";
        elementCreator("div", ["class", "tr-check-hov"], text, document.body);
        checkDiv.addEventListener("mouseleave", removeCheckHov);
        checkDiv.addEventListener("mousemove", followMouse);
        checkDiv.removeEventListener("mouseover", showCheckHov);
        e.stopPropagation();
    }
    function removeCheckHov(){
        document.querySelector(".tr-check-hov").remove()
        checkDiv.removeEventListener("mousemove", followMouse);
        checkDiv.addEventListener("mouseover", showCheckHov);
        checkDiv.removeEventListener("mouseleave", removeCheckHov);
    }

    function isCompleteFunc(e){ 
        if(!obj.isComplete){
            checkInner.classList.add("tr-check-checked");
            obj.isComplete = true;
            document.querySelector(".tr-check-hov").innerText="Mark incomplete";
            followMouse(e);
            taskDiv.classList.add("task-completed");
        }
        else{
            checkInner.classList.remove("tr-check-checked");
            obj.isComplete = false;
            document.querySelector(".tr-check-hov").innerText="Mark complete";
            followMouse(e);
            taskDiv.classList.remove("task-completed");
        }
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
    repeatImgDiv.appendChild(trXCreate());
    trFunc(repeatImgDiv, obj.repeat)
    //notes
    const notesDiv = elementCreator("div", ["class", "tr-notes"], false, otherDiv);
    imageCreator(notebookPng, false, notesDiv);
    notesDiv.appendChild(trXCreate());
    trFunc(notesDiv, obj.notes)


    //groups
    const groupsDiv = elementCreator("div", ["class", "tr-group"], false, otherDiv);
    imageCreator(layersPng, false, groupsDiv);
    groupsDiv.appendChild(trXCreate());
    trFunc(groupsDiv, obj.group)

    function trXCreate(){
        const div =document.createElement("div");
        div.classList.add("tr-x");
        elementCreator("div", false, false, div);
        return div;
    }

    otherHoverEffect([priorityImg, repeatImgDiv, notesDiv, groupsDiv]);

    function otherHoverEffect(btns){
        btns.forEach(btn=>{
            btn.addEventListener("mouseover", createHov);
        })

        function createHov(){
            if(!document.querySelector(".tr-hov")){
                const currentHover = this.className.slice(3);
                const objElement = obj[currentHover];
                let text;
                if(!objElement){
                    text = "No " + currentHover;
                }
                else if(currentHover==="priority"){
                    text = obj.priority + " priority";
                }
                else if(currentHover!=="repeat"){
                    text = objElement;
                }
                else if(currentHover==="repeat"){
                    text =  "Repeat " +  objElement.fullString;
                }
                const div = elementCreator("div", ["class", "tr-hov"], text, document.body);
                this.addEventListener("mouseleave", removeHov);
            }
            this.addEventListener("mousemove", followMouse);

        }
        function removeHov(){
            document.querySelector(".tr-hov").remove();
            this.removeEventListener("mouseleave", removeHov);
            this.addEventListener("mouseover", createHov);
            this.removeEventListener("mousemove", followMouse);

        }

    }
}

function followMouse(e){
    let box;
    if(document.querySelector(".tr-hov")){
        box = document.querySelector(".tr-hov");
    }
    else{
        box = document.querySelector(".tr-check-hov");
    }
    const boxWidth = getComputedStyle(box).width;
    box.style.left = `calc(${e.pageX}px - ${boxWidth} - 10px)`
    box.style.top = e.pageY + 10 + "px";
}


function trFunc(div, isTrue){
    const [img, xImg] = div.childNodes;
    if(isTrue){
        xImg.style.display = "none";
    }
    else{
        xImg.style.display = "flex";
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
    let fDate =  formatNumDate(`${date[0]}/${date[1]+1}/${date[2]}`).split("/");
    const div = document.createElement("div");
    for(let i=0;i<3;i++){
        const p = elementCreator("p", false, fDate[i], div);
        if(i!==2){
            elementCreator("span", false, false, div)
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

