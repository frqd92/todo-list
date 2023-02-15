export function dueBtnLogic(dueBtn, div){
    dueBtn.addEventListener("click", ()=>{
     if(div.className.includes("hidden-date-picker-div")){
        div.classList.remove("hidden-date-picker-div");
     }
     else{
        div.classList.add("hidden-date-picker-div");

     }
    })
}

export function hideDateAdder(div){
    div.classList.add("hidden-date-picker-div")
}

