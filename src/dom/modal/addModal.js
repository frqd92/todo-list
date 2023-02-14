
import { elementCreator} from '/src/utilities/elementCreator'
import {createIcon} from "/src/utilities/iconCreate";
import { modalDateInputFunc } from "/src/header/modal/modalDateInput";
import { quickAddBtnsFunc } from "/src/header/modal/quickAddBtns";
import { calenderFact} from "../calender";
//create each modal in the DOM
export function addModal(content){
    const form = elementCreator("div", ["id", "form"], false, content);
    //title and description
    const titleInput = inputFactory("Title", form);
    const descInput = inputFactory("Description", form);

    //due date div
    const dueDateDiv = elementCreator("div", ["class", "modal-due-div"], false, form);
    const dueDateText = elementCreator("p", ["class", "modal-due-text"], "Due date", dueDateDiv);
    const dueBtn = elementCreator("div", ["class", "modal-due-btn"], "Today", dueDateDiv);
    const dayWeekText = elementCreator("p", ["class", "due-btn-day-text"], false, dueDateDiv);
    const datePickerDiv = elementCreator("div", ["class", "date-picker-div"],false, dueDateDiv);
    createDueDateDiv(datePickerDiv, dueBtn, dayWeekText);
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

//add a date through calender




//factory function for title and description
const inputFactory = (type, form)=>{
    const div = elementCreator("div", ["class", "outer-form-input-div"],false, form)
    const inputDiv = elementCreator("div", ["class", `form-input-div`], false, div);
    const placeholder = elementCreator("div", ["class", "form-placeholder"], `${type}`, inputDiv);
    const input = elementCreator("div", ["class", `form-${type.toLowerCase()}-input`], false, inputDiv);
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




export function errorMsg(value){ //move to dom folder after
    const input = document.querySelector(".enter-date-input");
    const div = document.querySelector(".enter-date-div");
    input.classList.add("date-input-invalid");
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