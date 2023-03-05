import { elementCreator } from "../../utilities/elementCreator";
import './singleCal.css'

export function OneRowCalFact(type, parentDiv){
    const mainDiv = elementCreator("div", ["class", `onerow-cal-${type}`], false, parentDiv);
    const hideBtn = elementCreator("div", ["class", "onerow-hide-btn"], "Hide calendar", mainDiv);
    hideBtnFunc(hideBtn, mainDiv, type);


    return {mainDiv};
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
            all.forEach(elem=>{elem.classList.add("onerow-allHide")})
            div.classList.add("hidden-onerow");

        }
        else{
            all.forEach(elem=>{elem.classList.remove("onerow-allHide")})
            div.classList.remove("hidden-onerow");
            div.style.top="0px";
        }
    }

    function relocateShowCal(){
        const headHeight = getComputedStyle(tbHead).height;
        div.style.top = headHeight;
    }
}