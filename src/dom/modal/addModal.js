import { elementCreator} from '/src/utilities/elementCreator'
import { closeDivLogic} from '../../header/modal/showHideAdder';
import { adderOptionsFunc } from '../../header/modal/groups';
import { hideDiv } from '../../header/modal/showHideAdder';
import { repeatLogic } from '../../header/modal/modalRepeat';
import { modalNotesLogic } from '../../header/modal/modalNotes';
import addNewTask from '/src/header/modal/addNewTask';
import { getCurrentDateText, addSuffixToDay, whichWeekDayOfMonth } from '../../utilities/dateUtils';
import CalFactory from '../calenderFact/calFactory';

export function addModal(content){
    const form = elementCreator("div", ["id", "form"], false, content);
    //title and description
    const titleInput = inputFactory("Title", form);
    const descInput = inputFactory("Description", form);

    //due date div
    const dueDateDiv = elementCreator("div", ["class", "modal-due-div"], false, form);
    const dueDateText = elementCreator("p", ["class", "modal-due-text"], "Due date", dueDateDiv);
    const dueBtn = elementCreator("div", ["class", "modal-due-btn", "adder-value"], "Today", dueDateDiv);
    const dayWeekText = elementCreator("p", ["class", "due-btn-day-text"], getCurrentDateText("day"), dueDateDiv);
    dueBtn.addEventListener("click", showHideAdderCal);
    function showHideAdderCal(){
        if(document.querySelector(".cal-adder-div")===null){
            const cal = CalFactory(dueBtn, document.getElementById("form"), dueBtn, true, true, true, true,"adder", false);
        }   
        else{
            document.querySelector(".cal-adder-div").remove();
        }

    }

    //Add to group div
    const groupDiv = elementCreator("div", ["class", "modal-group-div"], false, form);
    const groupText = elementCreator("div", ["class", "modal-group-text"], "Group", groupDiv);
    const groupBtn = elementCreator("div", ["class", "modal-group-btn","adder-value"], "None", groupDiv);
    const groupOptions = elementCreator("div", ["class", "modal-group-options", "hidden-options-div"], false, groupDiv);
    createGroupOptions(groupOptions);

    //priority div;
    const priorityDiv = elementCreator("div", ["class", "modal-priority-div"], false, form);
    const priorityText = elementCreator("div", ["class", "modal-priority-text"], "Priority", priorityDiv);
    const priorityBtn = elementCreator("div", ["class", "modal-priority-btn", "adder-value"], "Normal", priorityDiv);
    const colorCircle = elementCreator("div", ["class", "priority-circle"], false, priorityBtn);

    const priorityOptions = elementCreator("div", ["class", "modal-group-priorities", "hidden-priorities-div"], false, priorityDiv);
    createPrioritiesOptions(priorityOptions,priorityBtn);

    //repeat div
    const repeatDiv = elementCreator("div", ["class", "modal-repeat-div"], false, form);
    const repeatText = elementCreator("div", ["class", "modal-repeat-text"], "Repeat", repeatDiv);
    const repeatBtn = elementCreator("div", ["class", "modal-repeat-btn", "adder-value"], "No repeat", repeatDiv);
    const repeatOptions = elementCreator("div", ["class", "modal-repeat-options", "hidden-repeat-div"], false, repeatDiv);
    createRepeatOptions(repeatOptions);

    //notes div
    const notesDiv = elementCreator("div", ["class", "modal-notes-div"], false, form);
    const notesText = elementCreator("div", ["class", "modal-notes-text"], "Add notes", notesDiv);
    const notesBtn = elementCreator("div", ["class", "modal-notes-btn", "adder-value"], "No notes", notesDiv);
    const notesOptions = elementCreator("div", ["class", "modal-notes-options", "hidden-notes-div"], false, notesDiv);
    createNotesOptions(notesOptions,notesBtn);

    //save button
    const saveAdderBtn = elementCreator("button", ["class", "save-adder-btn"], "Save task", form)
    addNewTask(saveAdderBtn);
    //logic to close/open the divs
    const infoArray = [
        //[dueBtn, datePickerDiv, "date-picker-div", "hidden-date-picker-div"],
        [groupBtn, groupOptions, "modal-group-options", "hidden-options-div",],
        [priorityBtn, priorityOptions, "modal-group-priorities","hidden-priorities-div"],
        [repeatBtn, repeatOptions, "modal-repeat-options","hidden-repeat-div"],
        [notesBtn, notesOptions, "modal-notes-options", "hidden-notes-div"]
    ];
    closeDivLogic(form, infoArray);
}

function createNotesOptions(div, mainBtn){

    const textArea = elementCreator("textarea", ["class", "notes-textarea"], false, div);
    textArea.setAttribute("contenteditable","true");
    textArea.setAttribute("maxlength", "600")
    const saveBtn = elementCreator("button", ["class", "notes-save-btn"], "Save", div);
    modalNotesLogic(textArea,saveBtn);
}

export function createRepeatOptions(div){
    const choices = ["Day", "Week", "Month", "Year"];
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const tabDiv = elementCreator("div", ["class", "repeat-tab-div"], false, div);
    for(let i=0;i<4;i++){
        const btn = elementCreator("div", ["class", "repeat-tab-btn"], false, tabDiv);
        if(i===1) btn.classList.add("repeat-chosen-tab");
        elementCreator("p", false, choices[i], btn)
    }
    const repeatNumDiv = elementCreator("div", ["class", "repeat-num-div"], false, div);
    elementCreator("p", false, "Repeat every", repeatNumDiv);
    elementCreator("input", ["class", "repeat-num-input"], "1", repeatNumDiv);
    elementCreator("p", ["class", "repeat-num-text"], "week", repeatNumDiv);

    //hidden unless week tab is chosen, visible in default as week is default tab
    const repeatWeekDiv = elementCreator("div", ["class", "repeat-week-div", "show-week-repeat"], false, div);
    for(let i=0;i<7;i++){
        const checkBtnDiv = elementCreator("div", ["class", "repeat-check-btn-div"], false, repeatWeekDiv);
        elementCreator("span", false, weekDays[i], checkBtnDiv);
        const checkBox = elementCreator("div", ["class", "repeat-check-div"], false, checkBtnDiv);
        elementCreator("p", ["class", "repeat-checked"], "X", checkBox)
    }
    //also hidden unless month blah blah 
    const repeatMonthDiv = elementCreator("div", ["class", "repeat-month-div"], false, div);
    elementCreator("div", ["class", "repeat-left", "chosen-month-repeat"], `every ${getTodayFromBtn()} day`, repeatMonthDiv);
    elementCreator("div", ["class", "repeat-right"], `every ${addSuffixToDay(whichWeekDayOfMonth(document.querySelector(".modal-due-btn").innerText))}  ${document.querySelector(".due-btn-day-text").innerText} `, repeatMonthDiv);
    
    const effectiveDiv = elementCreator("div", ["class", "repeat-effective-div"], false, div);
    elementCreator("p", ["class", "effective-text"], "Effective:", effectiveDiv);
    const effectiveBtnDiv = elementCreator("div", ["class", "effective-btn-div"], false, effectiveDiv);
    const btn = elementCreator("div", ["class", "effective-btn"], false, effectiveBtnDiv);
    elementCreator("p", ["class", "effective-btn-text"], "forever", btn);
    elementCreator("p", ["class", "effective-arrow"], "<", btn);
    elementCreator("div", ["class", "effective-other-text", "effect-other-hidden"], false, effectiveDiv);
    const effectiveDropdown = elementCreator("div", ["class", "effective-dropdown-div"], false, effectiveBtnDiv);
    elementCreator("div", ["class", "effective-dropdown-row"], "forever", effectiveDropdown);
    elementCreator("div", ["class", "effective-dropdown-row"], "until a date", effectiveDropdown);
    elementCreator("div", ["class", "effective-dropdown-row"], "x number of times", effectiveDropdown);

    const summaryDiv = elementCreator("div", ["class", "repeat-summary-div"], false, div);
    elementCreator("p", false ,"Repeat every", summaryDiv);
    elementCreator("p", ["class", "summary-text-1"], "week", summaryDiv);
    elementCreator("p", ["class", "summary-text-2"], "on", summaryDiv);
    elementCreator("p", ["class", "summary-text-3"], "forever", summaryDiv);

    const btnDiv = elementCreator("div", ["class", "repeat-btn-div"], false, div);
    elementCreator("div", ["class", "no-repeat-btn"], "No repeat", btnDiv);
    elementCreator("div", ["class", "repeat-save-btn"], "Save", btnDiv);

    repeatLogic(div);
}


function getTodayFromBtn(){
    const btnText = document.querySelector(".modal-due-btn").innerText;
    const date = new Date();

    if(btnText==="Today"){
        return addSuffixToDay(date.getDate()) ;
    }
    else{
        return addSuffixToDay(btnText.split("").slice(0,2).join(""));
    }

}

function createPrioritiesOptions(div, btn){
    const priorityText = ["Normal", "High", "Highest"];
    for(let i=0;i<3;i++){
        const column= elementCreator("div", ["class", "priority-column"], priorityText[i], div)
        column.addEventListener("click",(e)=>{
            btn.innerText = e.target.innerText;
            const colorCircle = elementCreator("div", ["class", "priority-circle", `circle-${e.target.innerText.toLowerCase()}`], false, btn);
            hideDiv(div, "hidden-priorities-div");
        })
    }
}

function createGroupOptions(div){
    //if no groups, show "No groups, add one from below". listofGroups is display:none if noGroupsText is display:block
    const noGroupsText = elementCreator("div", ["class", "empty-group-options"], "Group list empty", div);
    //if present, gets list of groups from firebase , otherwise show noGroupsText
    const listOfGroups = elementCreator("div", ["class", "options-group-list", "options-group-list-hidden"], false, div);
    const inputDiv = elementCreator("div", ["class", "group-input-div"], false, div)
    const input = elementCreator("input", ["class", "group-add-input"], false,inputDiv);
    input.placeholder="Type your new group name or quick add from the left";
    const quickAdder = elementCreator("div", ["class", "group-quick"], false,inputDiv);
    const groupBtnDiv = elementCreator("div", ["class", "modal-group-btn-div"], false, div);
    const noGroupBtn = elementCreator("div", ["class", "no-group-btn"], "None", groupBtnDiv);
    const addNewGroupBtn = elementCreator("div", ["class", "add-group-div"],"+", groupBtnDiv);
    const contentArr = ["Work", "Home", "Fitness", "Finance", "Travel", "Social", "Shopping", "Education", "Personal"];
    for(let group of contentArr){
       elementCreator("button", ["class", "quick-add-btn"], group, quickAdder)
    }
    adderOptionsFunc(div);

}




//factory function for title and description
const inputFactory = (type, form)=>{
    const ph = type==="Title"?"Title*":"Description";
    const div = elementCreator("div", ["class", "outer-form-input-div"],false, form)
    const inputDiv = elementCreator("div", ["class", `form-input-div`], false, div);
    const placeholder = elementCreator("div", ["class", "form-placeholder"], ph, inputDiv);
    const input = elementCreator("div", ["class", `form-${type.toLowerCase()}-input`, "adder-value"], false, inputDiv);
    input.setAttribute("contenteditable", "true");
    input.addEventListener("input", formInputLogic);
    let invalidLength;
    if(type==="Title") invalidLength=100;
    if(type==="Description") invalidLength=150;
    const errorMsg = elementCreator("p", ["class", `form-invalid-length-msg`], false, div);

    function formInputLogic(){
        this.innerText.length>0?placeholder.innerText="":placeholder.innerText=type;
        inputDiv.offsetHeight>97?inputDiv.classList.add("overflown-input"):inputDiv.classList.remove("overflown-input");

        if(type==="Title")invalidInput(invalidLength);
        else if(type==="Description")invalidInput(invalidLength);

        function invalidInput(num){
            if(input.innerText.length>0){
                errorMsg.style.display="block";
                errorMsg.innerText = `Characters: ${input.innerText.length} / ${invalidLength}`;
            }
            else{
                errorMsg.style.display="none";
            }
            if(input.innerText.length>num){
                inputDiv.classList.add("modal-invalid-input");
                errorMsg.classList.add("form-invalid-over");
            }
            else{
                inputDiv.classList.remove("modal-invalid-input");
                errorMsg.classList.remove("form-invalid-over");
            }
        }
    }
    return Object.assign({}, inputDiv)
}




export function errorMsg(value, input){ //move to dom folder after
    const div = input.parentElement;
    input.classList.add("date-input-invalid");
    if(input.className.includes("ineffect-other")){

    }
    else{
        if(document.querySelector(".modal-input-error")===null){
            const errorBox = elementCreator("div", ["class","modal-input-error"], value, div);
            setTimeout(()=>{
                errorBox.style.opacity="0";
            },2300)
            setTimeout(()=>{
                errorBox.remove();
            },2600)
        }
    }

}


export function sucessMsgTask(){
    const div = elementCreator("div", ["class", "sucess-msg-task"], "Task successfully added", document.querySelector(".header-options-middle"));
    div.addEventListener("click", ()=>div.remove(), {once: true});
    setTimeout(()=>{div.classList.add("success-hidden")}, 2000);
    setTimeout(()=>{div.remove()}, 3000);
}