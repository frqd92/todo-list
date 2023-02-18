import { hideDiv } from "./showHideAdder";
export function modalNotesLogic(input, btn){
    btn.addEventListener("click", ()=>{
        if(input.value.trim("")===""){
            document.querySelector(".modal-notes-btn").innerText="No notes";
        }
        else{
            document.querySelector(".modal-notes-btn").innerText=input.value;
        }
        hideDiv(input.parentElement, "hidden-notes-div");

    })
}

