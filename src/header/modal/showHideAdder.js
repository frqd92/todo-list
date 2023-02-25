import { dueDateVal} from "./modalRepeat";

export function closeDivLogic(form, arr){
    for(let i=0;i<arr.length;i++){
        const [mainBtn, selectDiv, divClass, hiddenClass] = arr[i];
        mainBtn.addEventListener("click", e=>{
            forBtns(selectDiv, hiddenClass, form, divClass, mainBtn)
        })
    }
};

function forBtns(div, classN, form, divClass, mainBtn){
    if(div.className.includes(classN)){
        div.classList.remove(classN);
        form.addEventListener("click", hide);
        //focus the repeat input in repeat option when opened so it's clear it's an input because it doesn't look like one
        if(div.className.includes("modal-repeat-options")){
            dueDateVal(document.querySelector(".modal-due-btn").innerText)
        }
     }
     else{
        div.classList.add(classN);
        form.removeEventListener("click", hide);
     }
     function hide(e){
        //remove third && after rework logic
        if(!e.target.closest(`.${divClass}`) && e.target!==mainBtn && !e.target.closest(".cal-general-div")){
            if(!e.target.closest(".cal-effective-div")){
                hideDiv(div, classN);
                if(document.querySelector(".cal-effective-div"))document.querySelector(".cal-effective-div").remove()
            }
       }
     }
};

export function hideDiv(div, className){
    div.classList.add(className)
};
