import { elementCreator } from "../../utilities/elementCreator";
import './singleCal.css'

export function OneRowCalFact(type, parentDiv){
    const mainDiv = elementCreator("div", ["class", `onerow-cal-${type}`], false, parentDiv);
    const hideBtn = elementCreator("div", ["class", "onerow-hide-btn"], "Hide", mainDiv);
    hideBtnFunc(hideBtn, mainDiv, type);
    if(type==="weekly") createWeekCal(mainDiv);
    if(type==="monthly") createMonthCal(mainDiv);


    return {mainDiv};
}

function createWeekCal(div){

    for(let i=0;i<7;i++){
        const square = elementCreator("div", ["class", "week-square"], false,div);
    }
}

function createMonthCal(div){
    
}




function hideBtnFunc(btn, div, type){
    const tbHead = document.querySelector(`.taskbox-head-${type}`)
    btn.addEventListener("click", hideOnerow);
    function hideOnerow(e){
        relocateShowCal()
        hideShow(true)

        window.addEventListener("resize", relocateShowCal);
        e.stopPropagation();
        div.addEventListener("click", makeCalAgain);

    }
    function makeCalAgain(){
        window.removeEventListener("resize", relocateShowCal);
        hideShow(false)
    }
    function hideShow(isHide){
        const all = div.querySelectorAll("div")

        if(isHide){
            all.forEach(elem=>{elem.style.display = "none"})
            div.classList.add("hidden-onerow");
            elementCreator("p", ["class", `hidden-onerow-text`], "Show", div);

        }
        else{
            all.forEach(elem=>{elem.style.display = "flex"})
            div.classList.remove("hidden-onerow");
            div.style.top="0px";
            div.querySelector(".hidden-onerow-text").remove();
        }
    }
    function relocateShowCal(){
        const headHeight = getComputedStyle(tbHead).height;
        div.style.top = headHeight;
    }
}