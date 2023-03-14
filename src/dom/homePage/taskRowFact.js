import { homeViewChoice } from "../../state";
import { resizeTaskDiv } from "./homeCreate";
import { returnMonth, findRelativeDate, textDateToNum, formatNumDate, numDateToDispFormat } from "../../utilities/dateUtils";
import { elementCreator, imageCreator } from "../../utilities/elementCreator";
import { sortByDate } from "../../utilities/sortTasks";
import smallCalPng from '/src/assets/images/calendar-small.png'
import repeatPng from '/src/assets/images/refresh.png';
import notebookPng from '/src/assets/images/notebook.png';
import layersPng from '/src/assets/images/layers.png';
import collapsePng from "/src/assets/images/collapse-arrows.png";
import expandPng from '/src/assets/images/expand-arrows.png';
import binPng from '/src/assets/images/bin.png';
import './taskRow.css'
//actually makes the task row in the dom
function TaskrowFact(taskObj, parent){
    const taskDiv = elementCreator("div", ["class", "home-task-row"], false, parent);
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
    resizeTaskDiv();
}

function renderTaskRows(tasks){
    const dispTaskDiv = document.querySelector(".disp-task-div");
    let taskDispDates = [];
    let taskDivDates = [];
    const dispOptions = createDispOptions(dispTaskDiv);    
    const taskByDate = sortByDate(tasks, true);
    taskByDate.forEach(elem=>{
        const displayedDate = `${elem.due[0]}/${elem.due[1]}/${elem.due[2]}`;
        if(taskDispDates.length<1){
            const div = elementCreator("div", ["class", "disp-group"], false, dispTaskDiv)
            taskDispDates.push(displayedDate);
            taskDivDates.push(div);
            const taskDateDiv = taskDateFunc(taskDivDates[0], taskDispDates[0], div);
            const taskRow = TaskrowFact(elem, taskDivDates[0]);
            if(homeViewChoice==="daily")taskDateDiv.remove();
        }
        else{
            if(taskDispDates[taskDispDates.length-1]!==displayedDate){
                const div = elementCreator("div", ["class", "disp-group"], false, dispTaskDiv)
                taskDispDates.push(displayedDate);
                taskDivDates.push(div);
                const taskDateDiv = taskDateFunc(taskDivDates[taskDivDates.length-1], taskDispDates[taskDispDates.length-1], div);
            }
            const taskRow = TaskrowFact(elem, taskDivDates[taskDivDates.length-1]);
        }
    })
}

//creates the options menu in the home page disp
function createDispOptions(parent){
    const optionsAllDiv = elementCreator("div", ["class", "to-all-div"], false, parent)
    //menu btn
    const menuBtn = elementCreator("div", ["class", "to-menu-btn-div"], false, optionsAllDiv);
    const actualBtn = elementCreator("div", ["class", "to-menu-btn"], false, menuBtn)
    for(let i=0;i<3;i++){elementCreator("div", ["class", `op-line-${i}`], false, actualBtn)};
    //options menu
    const optionsMenu = elementCreator("div", ["class", "to-menu"], false, menuBtn);
    const detachBtn = detachFunc(optionsMenu);
    const title = elementCreator("div", ["class", "to-title"], "Task options", optionsMenu);
    const xClose = elementCreator("span", ["class", "to-close"], "X", optionsMenu);
    //collapse/expand Div
    const collExpDiv = elementCreator("div", ["class", "to-collExp-div"],false, optionsMenu);
    const collapseDiv = elementCreator("div", ["class", "to-collapse"], false, collExpDiv);
    elementCreator("p", false, "Collapse All", collapseDiv);
    imageCreator(collapsePng, ["class", "to-collapse-img"], collapseDiv);
    elementCreator("span", false, false, collExpDiv);
    const expandDiv = elementCreator("div", ["class", "to-expand"], false, collExpDiv);
    elementCreator("p", false, "Expand All", expandDiv);
    imageCreator(expandPng, ["class", "to-collapse-img"], expandDiv);
    //hide div
    const hideDiv = elementCreator("div", ["class", "to-hide-div"], false, optionsMenu);
    const hideLeft = elementCreator("div", ["class", "to-hide-left"], false, hideDiv);
    elementCreator("p", false, "Hide", hideLeft);

    const hideRight = elementCreator("div", ["class", "to-hide-right"], false, hideDiv);
    const completedTasks = giveMeAnEye(hideRight, "Completed");
    const incompleteTasks = giveMeAnEye(hideRight, "Incomplete");
    const repeatedTasks = giveMeAnEye(hideRight, "Repeated");
    const past = giveMeAnEye(hideRight, "Past");

    const priorities = elementCreator("div", ["class", "to-check-prio"], false, hideRight);
    const normal = giveMeAnEye(priorities, "Normal Priority", "rgba(182, 137, 53, 0.9)");
    const high = giveMeAnEye(priorities, "High Priority", "rgba(225, 85, 46, 0.9)");
    const highest = giveMeAnEye(priorities, "Highest Priority", "rgba(202, 42, 42, 0.9)");

/*
binPng
*/
    menuBtnEffect(actualBtn, optionsMenu, xClose);
    return optionsAllDiv
}


function detachFunc(menu){
    const detachDiv = elementCreator("div", ["class", "to-detach-div"], false, menu);
    const innerDiv = elementCreator("div", false, false, detachDiv);
    const lowerSquare = elementCreator("div", ["class", "to-detach-lower"],false, innerDiv);
    const upperSquare = elementCreator("div", ["class", "to-detach-upper"], false, innerDiv)
    upperSquare.innerHTML ='&#8599';
    const text = elementCreator("p", false, "Detach window", innerDiv);
    let isDrag=false;
    makeDrag(menu);
    detachDiv.addEventListener("click", detach);
    function detach(){
        if(!menu.className.includes("to-detached")){
            menu.classList.add("to-detached");
            upperSquare.style.transform = 'rotate(180deg)';
            menu.style.left = "50px";
            menu.style.top = "10px";
            text.innerText = "Reattach window";
            isDrag=true;
            window.addEventListener("resize", posWhenResize);
        }
        else{
            menu.classList.remove("to-detached");
            text.innerText = "Detach window";
            isDrag=false;
            menu.style.left = "42px";
            menu.style.top = "0px";
            menu.classList.add("flying-menu")
            setTimeout(()=>{menu.classList.remove("flying-menu")},300)
            upperSquare.style.transform = 'rotate(0deg)';
            window.removeEventListener("resize", posWhenResize);

        }
    }

    function posWhenResize(){
        const taskDiv = document.querySelector(".disp-task-div");
        console.log("hsdhs");
        if (menu.getBoundingClientRect().right  > (taskDiv.getBoundingClientRect().right + 10)) {
            menu.style.left = "0px"
        }
        if(menu.offsetTop < -5){
           
        }
        else if(menu.getBoundingClientRect().bottom > taskDiv.getBoundingClientRect().bottom){
            const height = menu.getBoundingClientRect().height/2;
            menu.style.top = taskDiv.getBoundingClientRect().bottom - menu.offsetTop - 70 + "px";
        }
    }
    function makeDrag(object){
        let initX, initY, firstX, firstY;
        const taskDiv = document.querySelector(".disp-task-div");
        object.addEventListener('mousedown',move, false);
        function move(e){
            e.preventDefault();
            initX = this.offsetLeft;
            initY = this.offsetTop;
            firstX = e.pageX;
            firstY = e.pageY;
            this.addEventListener('mousemove', dragIt, false);
            window.addEventListener('mouseup', function() {
                object.removeEventListener('mousemove', dragIt, false);
            }, false);

        }
        function dragIt(e){
            if(!isDrag) return;
            if(this.offsetLeft < 1){
                this.style.left = "1px";
            }
            else if (this.getBoundingClientRect().right  > (taskDiv.getBoundingClientRect().right + 10)) {
                this.style.left = taskDiv.getBoundingClientRect().right - this.offsetLeft + "px";
            }
            else{
                this.style.left = initX+e.pageX-firstX + 'px';
            }
            if(this.offsetTop < -5){
                this.style.top = "0px";
            }
            else if(this.getBoundingClientRect().bottom > taskDiv.getBoundingClientRect().bottom){
                const height = this.getBoundingClientRect().height/2;
                this.style.top = taskDiv.getBoundingClientRect().bottom - this.offsetTop - 70 + "px";
            }
            else{
                // console.log(taskDiv.getBoundingClientRect().right- this.offsetLeft-10)
                this.style.top = initY+e.pageY-firstY + 'px';
            }

        }
    }

    



    detachDiv.addEventListener("mouseover", showDetachText);
    function showDetachText(){
        text.style.display = "block";
        detachDiv.removeEventListener("mouseover", showDetachText);
        detachDiv.addEventListener("mouseleave", hideDetachText);
    }
    function hideDetachText(){
        text.style.display = "none";
        detachDiv.addEventListener("mouseover", showDetachText);
        detachDiv.removeEventListener("mouseleave", hideDetachText);
    }
}




function giveMeAnEye(div, text, isPrio){
    const field = elementCreator("div", ["class", "to-check-field"], false, div);
    const eyeDiv = elementCreator("div", ["class", "eye-div"], false, field);
    const iris = elementCreator("div", ["class", "eye-iris"], false, eyeDiv);
    if(isPrio){
        field.classList.add("prio-check-field");
        iris.style.background = isPrio;
    }
    const slash = elementCreator("div", ["class", "eye-slash"], false, eyeDiv);
    const textPart = elementCreator("p", false, text, field);
    field.addEventListener("click", eyeCheck);
    function eyeCheck(){
        if(!eyeDiv.className.includes("eye-div-on")){
            eyeDiv.classList.add("eye-div-on");
            slash.style.display="block";
            textPart.classList.add("to-hidden-text");
        }
        else{
            eyeDiv.classList.remove("eye-div-on");
            slash.style.display="none";
            textPart.classList.remove("to-hidden-text");
        }
    }
    return field;
}



//stupid effect on menu click
function menuBtnEffect(btn, optionsMenu, closeBtn){
    const lineArr = btn.childNodes;
    const cList = ["op-line-0-show", "op-line-1-show", "op-line-2-show"];
    btn.addEventListener("click", eff);
    closeBtn.addEventListener("click", eff, {once:true})
    function eff(){
        if(!btn.className.includes("to-menu-on")){
            btn.classList.add("to-menu-on");
            triggerEffect(true);
            optionsMenu.style.display="flex";

        }
        else{
            btn.classList.remove("to-menu-on");
            triggerEffect(false);
            optionsMenu.style.display="none";
            if(this.className==="to-close"){closeBtn.addEventListener("click", eff, {once:true})}
        }
    };




    function triggerEffect(isAdd){
        for(let i=0;i<3;i++){
            isAdd?lineArr[i].classList.add(cList[i]):lineArr[i].classList.remove(cList[i]);
        }
    }
}


//hides and shows the grouped by date tasks------------------------------------------------------------
function taskDateFunc(div, date, group){
    const formattedDate = numDateToDispFormat(date)
    const dateDiv = elementCreator("div", ["class", "disp-date-div"], false, div);

    elementCreator("p", ["class", "disp-date-text"], formattedDate, dateDiv);
    const arrowDiv = elementCreator("div", ["class", "disp-arrow-div"], false, dateDiv);
    const arrow = elementCreator("div", ["class", "disp-arrow"], "<", arrowDiv);

    dateDiv.addEventListener("click", toggleArrow);
    return dateDiv;
    function toggleArrow(){
        arrow.classList.toggle("disp-arrow-hide");
        arrow.className.includes("disp-arrow-hide")?showHide(false):showHide(true);
    }
    function showHide(isHide){
        const allRows = group.querySelectorAll(".home-task-row");
        const action = isHide?"block":"none";
        const border = !isHide?"1px solid rgba(255, 255, 255, 0.086)":"none";
        allRows.forEach(row=>{
            row.style.display=action;
            group.style.borderBottom=border;
        });
    }
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







// lower Div---------------------------------------------------------------------------------------------

function createLowerDiv(mainDiv, obj){
    const div = elementCreator("div", ["class", "tr-lower-part", "tr-lower-effect"], false, mainDiv);
    setTimeout(()=>{div.classList.remove("tr-lower-effect")}, 1);

    const btnsDiv = elementCreator("div", ["class", "lower-btns"], false, div);
    const editBtn = elementCreator("div", false, "Edit", btnsDiv);
    const deleteBtn = elementCreator("div", false, "Delete", btnsDiv);

    const title = elementCreator("div", ["class", "lower-title"], false, div);
    elementCreator("p", false, obj.title, title);
    const description = createLowerRow("description", obj.description, "No description");


    const group = createLowerRow("group", obj.group, "Task not grouped");
    const groupStatic = elementCreator("div", false, false, group, true);
    imageCreator(layersPng, false, groupStatic);
    elementCreator("p", false, "Group: ", groupStatic);

    const repeat = createLowerRow("repeat", obj.repeat, "Task not repeated");
    const repeatStatic = elementCreator("div", false, false, repeat, true);
    imageCreator(repeatPng, false, repeatStatic);
    elementCreator("p", false, "Repeat: ", repeatStatic);

    const notes = createLowerRow("notes",obj.notes, "No notes");
    const notesStatic = elementCreator("div", false, false, notes, true);
    imageCreator(notebookPng, false, notesStatic);
    elementCreator("p",false, "Notes: ", notesStatic)
    if(obj.notes){
        notes.classList.add("lower-notes-true")
    }


    function createLowerRow(elem, val, str){
        const element = elementCreator("div", ["class","lower-row",`lower-${elem}`], false, div);
        const elementText = elem!=="repeat"?(!val?str:val):(!val?str:val.fullString);
        const elementP = elementCreator("p", false, elementText, element);
        if(!val){elementP.classList.add("lower-none")}
        return element
    }


    const priority = elementCreator("div", ["class", "lower-priority"], false, div);
    elementCreator("p", false, `${obj.priority} priority`, priority)
    priority.style.backgroundColor =priorityColor(obj.priority);




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
    xImg.style.display = isTrue?"none":"flex";
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



