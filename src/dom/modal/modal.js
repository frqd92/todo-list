import { elementCreator} from "../../utilities/elementCreator";
import { taskOverview } from '/src/dom/modal/taskModal';
import { calModal } from '/src/dom/modal/calModal';
import{ addModal } from "/src/dom/modal/addModal" ;
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
                calModal(content);
                break;
            case "header-overview-btn":
                classListLogic(true, "overview", outerDiv, arrow, content);
                taskOverview(content);
            }
        })
    });
    window.addEventListener("click",(e)=>removeModal(e, outerDiv, arrow, content));
};








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

