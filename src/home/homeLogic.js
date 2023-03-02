import { homeViewChoice, viewChoice } from '/src/state';
let userViewChoice;
//selected timeframe effect thing
let pickedDiv;
let timeframeBtns;
let daily, weekly, monthly;

export function chooseTimeframeFunc(div){
    pickedDiv = div.querySelector(".picked-timeframe");
    timeframeBtns = div.querySelectorAll(".home-timeframe-btn");
    [daily, weekly, monthly] = timeframeBtns;
    getFromLocalStorage();

    timeframeBtns.forEach(elem=>{
        elem.addEventListener("click", timeframeBtnFunc);
    })

    function timeframeBtnFunc(e){
        saveToLocalStorage(e)
        userViewChoice = e.target;
        pickedDiv.style.width = `calc(${getWidth(e.target)} + 10px)` ;
        pickedDiv.style.left = (e.target.offsetLeft - 5) + "px";
        e.target.classList.add("picked-timeframe-elem");
        timeframeBtns.forEach(elem=>{
            if(elem!==e.target){
                elem.classList.remove("picked-timeframe-elem")
            }
        })
    }
    //when window is resized, the "picked div" follows the button options as they change position
    window.addEventListener("resize", relocatePickedDiv);
    function relocatePickedDiv(){
        pickedDiv.style.width = `calc(${getWidth(timeframeUserChoice())} + 10px)` ;
        pickedDiv.style.left = (timeframeUserChoice().offsetLeft - 5) + "px";
    }
    //when user/guest enters website, their last picked item is saved. "picked div" follows that item
    function userDefaultViewOptions(followDiv){
        let choice = timeframeUserChoice();
        //console.log(choice);
        choice.classList.add("picked-timeframe-elem")
        followDiv.style.width = `calc(${getWidth(choice)} + 10px)` ;
        followDiv.style.left = (choice.offsetLeft - 5) + "px";
    }
    function saveToLocalStorage(e){
        localStorage.setItem("task-timeframe", e.target.innerText.toLowerCase())
        viewChoice(e.target.innerText.toLowerCase())
    }
    function getFromLocalStorage(){
        localStorage.getItem("task-timeframe")?viewChoice(localStorage.getItem("task-timeframe")):viewChoice("daily");
        userDefaultViewOptions(pickedDiv);
    }
}

//last case the position of the timeframe buttons might change is if user hides nav bar
//nav/hideMenu.js
export function relocatePickedDivNavMenu(){
    let choice = timeframeUserChoice();
    pickedDiv.style.width = `calc(${getWidth(choice)} + 10px)` ;
    pickedDiv.style.left = (choice.offsetLeft - 5) + "px";
}



function timeframeUserChoice(){
    switch (homeViewChoice){
        case "daily": return daily;
        case "weekly": return weekly;
        case "monthly": return monthly;
    }
}

function getWidth(elem){
    return getComputedStyle(elem).width;
}

