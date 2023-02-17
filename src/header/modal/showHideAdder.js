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
     }
     else{
        div.classList.add(classN);
        form.removeEventListener("click", hide);
     }
     function hide(e){
        if(!e.target.closest(`.${divClass}`) && e.target!==mainBtn){
            hideDiv(div, classN)
       }
     }
};

export function hideDiv(div, className){
    div.classList.add(className)
};
