import { elementCreator} from '/src/utilities/elementCreator'
import {createIcon} from "/src/utilities/iconCreate";
import { modalDateInputFunc } from "/src/header/modal/modalDateInput";
import { quickAddBtnsFunc } from "/src/header/modal/quickAddBtns";
import { calenderFact} from "../calender";
import { closeDivLogic} from '../../header/modal/showHideAdder';
import { adderOptionsFunc } from '../../header/modal/groups';
import { hideDiv } from '../../header/modal/showHideAdder';
import { modalRepeatLogic } from '../../header/modal/modalRepeat';
import { modalNotesLogic } from '../../header/modal/modalNotes';
import { saveBtnLogic } from './saveBtn';
//create each modal in the DOM
export function addModal(content){
    const form = elementCreator("div", ["id", "form"], false, content);
    //title and description
    const titleInput = inputFactory("Title", form);
    const descInput = inputFactory("Description", form);

    //due date div
    const dueDateDiv = elementCreator("div", ["class", "modal-due-div"], false, form);
    const dueDateText = elementCreator("p", ["class", "modal-due-text"], "Due date", dueDateDiv);
    const dueBtn = elementCreator("div", ["class", "modal-due-btn", "adder-value"], "Today", dueDateDiv);
    const dayWeekText = elementCreator("p", ["class", "due-btn-day-text"], false, dueDateDiv);
    const datePickerDiv = elementCreator("div", ["class", "date-picker-div", "hidden-date-picker-div"],false, dueDateDiv);
    createDueDateDiv(datePickerDiv, dueBtn, dayWeekText);

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
    createRepeatOptions(repeatOptions, repeatBtn);

    //notes div
    const notesDiv = elementCreator("div", ["class", "modal-notes-div"], false, form);
    const notesText = elementCreator("div", ["class", "modal-notes-text"], "Add notes", notesDiv);
    const notesBtn = elementCreator("div", ["class", "modal-notes-btn", "adder-value"], "No notes", notesDiv);
    const notesOptions = elementCreator("div", ["class", "modal-notes-options", "hidden-notes-div"], false, notesDiv);
    createNotesOptions(notesOptions,notesBtn )

    //save button
    const saveAdderBtn = elementCreator("button", ["class", "save-adder-btn"], "Save task", form)
    saveBtnLogic(saveAdderBtn);
    //logic to close/open the divs
    const infoArray = [
        [dueBtn, datePickerDiv, "date-picker-div", "hidden-date-picker-div"],
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

function createRepeatOptions(div,mainBtn){
    const repeatInputsDiv = elementCreator("div", ["class", "repeat-inputs-div"], false,div);
    elementCreator("span", false, "Every", repeatInputsDiv);
    const numInput = elementCreator("input", ["class", "repeat-input"],"1", repeatInputsDiv);
    numInput.placeholder = "1-100";
    const every = elementCreator("div", ["class", "repeat-select"], "week",repeatInputsDiv);
    const inEffectDiv = elementCreator("div", ["class", "ineffect-div"], false, div);
    elementCreator("span", false, "In effect", inEffectDiv);
    const times = elementCreator("input", ["class", "ineffect-until", "ineffect-invisible"], false, inEffectDiv);
    times.placeholder="x";
    const inEffect = elementCreator("div", ["class", "repeat-ineffect"], "forever", inEffectDiv);
    const inEffectOther = elementCreator("input", ["class", "ineffect-other", "ineffect-invisible"], false, inEffectDiv);
    inEffectOther.placeholder="Type date & click Enter";
    const infoTextDiv = elementCreator("div", ["class", "repeat-info-text"], false, div);
    elementCreator("span", false, "Every", infoTextDiv);
    elementCreator("span", ["class", "info-text-1"], "week", infoTextDiv);
    elementCreator("span", ["class", "info-text-2"], "forever", infoTextDiv);
    const btnDiv= elementCreator("div", ["class", "repeat-btn-div"], false, div)
    const noRepeatBtn = elementCreator("button", false, "No repeat", btnDiv);
    const saveBtn = elementCreator("button", false, "Save", btnDiv);
    modalRepeatLogic(infoTextDiv, numInput, every, inEffect, inEffectOther, times, saveBtn, noRepeatBtn);

}




function createPrioritiesOptions(div, btn){
    const priorityText = ["Normal", "High", "Highest"];
    for(let i=0;i<3;i++){
        const column= elementCreator("div", ["class", "priority-column"], priorityText[i], div)
        column.addEventListener("click",(e)=>{
            btn.innerText = e.target.innerText;
            const colorCircle = elementCreator("div", ["class", "priority-circle", `circle-${e.target.innerText.toLowerCase()}`], false, btn);
            hideDiv(div, "hidden-priorities-div")
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


//due date div: date-input, quick buttons and calender to pick date
function createDueDateDiv(datePickerDiv, dueBtn, dayWeekText){
    //input to enter a date-------------------------------------------
    const enterDateDiv = elementCreator("div", ["class", "enter-date-div"], false, datePickerDiv);
    const enterDateInput = elementCreator("input", ["class", "enter-date-input"], false, enterDateDiv);
    enterDateInput.placeholder="Write your date & press enter";
    modalDateInputFunc(enterDateInput, dueBtn, dayWeekText);
    const iconDiv = elementCreator("div", ["class", "modal-icon-div"], false, enterDateDiv )
    createIcon(iconDiv, "Hello", ["modal-i-div","modal-i-img", "modal-i-img-div"]);

    // buttons where you quick add a due date-------------------------
    const dateBtnsDiv = elementCreator("div", ["class", "date-picker-btn-div"], false,datePickerDiv);
    if(document.querySelector(".due-btn-hover-div")===null){
        const hoverDiv = elementCreator("div",["class", "due-btn-hover-div"], false,document.body);
        elementCreator("p", false, false, hoverDiv);
        elementCreator("p", false, false, hoverDiv);
    }

    const btnArray = [
        {none:"None"}, {today:"Today"}, {tomorrow:"Tomorrow"}, 
        {afterTomorrow:"After tomorrow"},{week:"Next week"}, {month:"Next month"}
    ]
    btnArray.forEach((elem)=>{   
        for(const key in elem){
            if (elem.hasOwnProperty(key)) {
                const value = elem[key];
                const btn = elementCreator("div", ["class", "due-btn", `due-btn-${key}`],value, dateBtnsDiv);
                quickAddBtnsFunc(btn);
              }
        }
    })
    //calender from calender factory 
    const pickDateCal = calenderFact(datePickerDiv, "small");
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