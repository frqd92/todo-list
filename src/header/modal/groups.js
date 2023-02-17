import { elementCreator } from "../../utilities/elementCreator";
import { hideDiv } from "./showHideAdder";
let emptyDiv, optionsDiv,inputDiv,addBtn, mainDiv;
export function adderOptionsFunc(div){
    mainDiv=div;
    [emptyDiv, optionsDiv, inputDiv, addBtn] = div.childNodes;

    addBtn.addEventListener("click", newGroupAdd);
    optionsQuickBtnsFunc(inputDiv);
}

function newGroupAdd(){
    const input = inputDiv.querySelector("input");
    input.addEventListener("keydown",e=>{
        if(e.key==="Enter" && input.value.length>0){
            addElementAndHide(input)
        }
    })
    if(input.value.length>0){
        addElementAndHide(input)
    }
    //add an if statement after to reword hidden classlist logic when you have firebase/localstorage set up
    else{
        inputDiv.style.display="block";
    }
    input.focus();

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
            input.value="";
            input.placeholder= `${text} already exists`;
            input.classList.add("invalid-group-options");
            setTimeout(()=>{
                input.classList.remove("invalid-group-options");
                input.placeholder= "Type your new group name or quick add from the left";
            }, 1500);
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