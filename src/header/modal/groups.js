import { elementCreator } from "../../utilities/elementCreator";
import { hideDiv } from "./showHideAdder";
let emptyDiv, optionsDiv,inputDiv,addBtn, noneBtn, mainDiv, btns;
export function adderOptionsFunc(div){
    mainDiv=div;
    [emptyDiv, optionsDiv, inputDiv, btns] = div.childNodes;
    [noneBtn, addBtn] = btns.childNodes;
    noneBtn.addEventListener("click", noGroupAdd);
    addBtn.addEventListener("click", newGroupAdd);
    optionsQuickBtnsFunc(inputDiv);
}

function newGroupAdd(){
    const input = inputDiv.querySelector("input");
    input.addEventListener("keydown",e=>{
        if(e.key==="Enter" && input.value.trim("").length>1){
            addElementAndHide(input)    ;
        }
    })
    if(input.value.trim("").length>0){
        addElementAndHide(input)
    }
    //add an if statement after to reword hidden classlist logic when you have firebase/localstorage set up
    else{
        inputDiv.style.display="block";
    }
    input.focus();
}

function noGroupAdd(){
    document.querySelector(".modal-group-btn").innerText = "None";
    hideDiv(document.querySelector(".modal-group-options"), "hidden-options-div");
}

function optionsQuickBtnsFunc(div){
    const quickAddBtns = div.querySelectorAll(".quick-add-btn");
    const input = inputDiv.querySelector("input");
    quickAddBtns.forEach(elem=>{
        elem.addEventListener("click", (e)=>{
            input.value=e.target.innerText;
            addElementAndHide(input)
        })
    })
}

function addElementAndHide(input){
    let checker = true;
    let text="";
    const allOptions = optionsDiv.querySelectorAll(".options-element");
    allOptions.forEach(elem=>{
        if(elem.innerText.toLowerCase().trim()===input.value.toLowerCase().trim()){
            checker=false;
            text = input.value;
            errorMsgPlaceholder(`${text} already exists`, input);
            return;
        }
    })
    if(checker){
        inputDiv.style.display="none";
        const group = elementCreator("div", ["class", "options-element"], input.value, optionsDiv);
        input.value="";
        emptyDiv.style.display="none";
        group.addEventListener("click", ()=>{
            document.querySelector(".modal-group-btn").innerText = group.innerText;
            hideDiv(document.querySelector(".modal-group-options"), "hidden-options-div");

        });

    };
}

function errorMsgPlaceholder(msg, input){
    input.value="";
    input.placeholder= msg;
    input.classList.add("invalid-group-options");
    setTimeout(()=>{
        input.classList.remove("invalid-group-options");
        input.placeholder= "Type your new group name or quick add from the left";
    }, 1500);
}