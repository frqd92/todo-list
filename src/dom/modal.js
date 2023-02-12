import { elementCreator } from "../utilities/elementCreator";
import {createIcon} from "/src/utilities/iconCreate";
import { modalDateInputFunc } from "../header/modalDateInput";
import { quickAddBtnsFunc } from "../header/quickAddBtns";
import '/src/styles/modal-nav.css';

export function makeModal(btnArr){
    const outerDiv = elementCreator("div", ["class", "modal-div"], false,btnArr[0].parentElement)
    const arrow = elementCreator("div", ["class", "triangle"], false, outerDiv);
    const content = elementCreator("div", ["class", "modal-content"], false,outerDiv);
    btnArr.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            switch(e.target.className){
             case "header-add-btn":
                classListLogic(true, "add", outerDiv, arrow, content);
                addModal(content);
                break;
            case "calender-click-div":
                classListLogic(true, "calender", outerDiv, arrow, content);
                calenderModal(content);
                break;
            case "header-overview-btn":
                classListLogic(true, "overview", outerDiv, arrow, content);
                taskOverview(content);
            }
        })
    });
    window.addEventListener("click",(e)=>removeModal(e, outerDiv, arrow, content));
};


//create each modal in the DOM
function addModal(content){
    const form = elementCreator("div", ["id", "form"], false, content);
    const titleInput = inputFactory("Title", form);
    const descInput = inputFactory("Description", form);

    const dueDateDiv = elementCreator("div", ["class", "modal-due-div"], false, form);
    
    const dueDateText = elementCreator("p", ["class", "modal-due-text"], "Due date", dueDateDiv);
    const dueBtn = elementCreator("div", ["class", "modal-due-btn"], "Today", dueDateDiv);
    const dayWeekText = elementCreator("p", ["class", "due-btn-day-text"], false, dueDateDiv);
    const datePickerDiv = elementCreator("div", ["class", "date-picker-div"],false, dueDateDiv);
    //input to enter a date-------------------------------------------
    const enterDateDiv = elementCreator("div", ["class", "enter-date-div"], false, datePickerDiv);
    const enterDateInput = elementCreator("input", ["class", "enter-date-input"], false, enterDateDiv);
    enterDateInput.placeholder="Write your date & press enter";
    modalDateInputFunc(enterDateInput, dueBtn, dayWeekText);
    const iconDiv = elementCreator("div", ["class", "modal-icon-div"], false, enterDateDiv )
    createIcon(iconDiv, "Hello", ["modal-i-div","modal-i-img", "modal-i-img-div"]);

    // buttons where you quick add a due date-------------------------
    const dateBtnsDiv = elementCreator("div", ["class", "date-picker-btn-div"], false,datePickerDiv);
    const btnArray = [
        {none:"None"}, {today:"Today"}, {tomorrow:"Tomorrow"}, 
        {afterTomorrow:"After Tomorrow"},{week:"Next week"}, {month:"Next month"}
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

}





function calenderModal(content){
    const test = elementCreator("div", false, "fsdfkjdsflajflkadsjfas", content)



}

function taskOverview(div, arrow, content){


}





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
















// Logic dom stuff

function removeModal(e, outerDiv, arrow, content){
    if(!document.querySelector(".header-options-middle").contains(e.target)){
        outerDiv.classList.add("modal-opacity");
        setTimeout(()=>{
            classListLogic(false, false, outerDiv, arrow, content);
             outerDiv.classList.remove("modal-opacity");
        }, 180);
    }
}

function classListLogic(bool, elem, div, arrow, content){
        div.classList.remove(div.classList[1]);
        arrow.classList.remove(arrow.classList[1]);
        content.classList.remove(content.classList[1]);
    if(bool){
        content.innerHTML ="";
        let classlistArr = [
            ["modal-div-show-add", "triangle-add", "content-add"],
            ["modal-div-show-calender", "triangle-calender", "content-calender"],
            ["modal-div-show-overview", "triangle-overview", "content-overview"]
        ]
        let currentArr = [];
        if(elem==="add"){currentArr = classlistArr[0];}
        else if(elem==="calender"){currentArr = classlistArr[1];}
        else if(elem==="overview"){currentArr = classlistArr[2];}
        div.classList.add(currentArr[0])
        arrow.classList.add(currentArr[1]);
        content.classList.add(currentArr[2]);
    }
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