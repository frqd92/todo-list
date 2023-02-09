import { elementCreator } from "../utilities/elementCreator";
import '/src/styles/modal-nav.css';
export function makeModal(btnArr){
    const outerDiv = elementCreator("div", ["class", "modal-div"], false,btnArr[0].parentElement)
    const arrow = elementCreator("div", ["class", "triangle"], false, outerDiv);
    const content = elementCreator("div", ["class", "add-modal-content"], false,outerDiv);
    
    btnArr.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            switch(e.target.className){
             case "header-add-btn":
                createAddForm(outerDiv, arrow);
                break;
            case "calender-click-div":
                createCalenderModal(outerDiv, arrow);
                break;
            case "header-overview-btn":
                createTaskOverview(outerDiv, arrow);
            }
        })
    });

    window.addEventListener("click", removeModal);
    function removeModal(e){
        const btnNames = ["header-add-btn", "calender-click-div", "header-overview-btn"];
        if(!btnNames.includes(e.target.className)){
                outerDiv.classList.remove(outerDiv.classList[1])
                arrow.classList.remove(arrow.classList[1]);
        }
    }
    

}






function createAddForm(div, arrow){
    if(div.classList[1]!==undefined){
        div.classList.remove(div.classList[1]);
        arrow.classList.remove(arrow.classList[1]);
    }
    div.classList.add("modal-div-show-add")
    arrow.classList.add("triangle-add");
}

function createCalenderModal(div, arrow){
    if(div.classList[1]!==undefined){
        div.classList.remove(div.classList[1]);
        arrow.classList.remove(arrow.classList[1]);
    }
    div.classList.add("modal-div-show-calender");
    arrow.classList.add("triangle-calender");

}

function createTaskOverview(div, arrow){
    if(div.classList[1]!==undefined){
        div.classList.remove(div.classList[1]);
        arrow.classList.remove(arrow.classList[1]);
    }
    div.classList.add("modal-div-show-overview");
    arrow.classList.add("triangle-overview");


}






export function formCreator(labelName, type, id, parent){
    const input = elementCreator("input", ["id", id], false, parent);
    input.type = type;

    const label = elementCreator("label", false, labelName, parent);
    label.setAttribute("for", id);
 
}