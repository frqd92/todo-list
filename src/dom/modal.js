import { elementCreator } from "../utilities/elementCreator";
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
                calenderModal(content);
                break;
            case "header-overview-btn":
                classListLogic(true, "overview", outerDiv, arrow, content);
                taskOverview(content);
            }
        })
    });
    window.addEventListener("click",(e)=>removeModal(e, outerDiv, arrow, content));
};


//create each modal in the DOM
function addModal(content){
    const form = elementCreator("form", false, false, content);

    const inputFactory = (type)=>{
        const div = elementCreator("div", ["class", "outer-form-input-div"],false, form)
        const inputDiv = elementCreator("div", ["class", `form-input-div`], false, div);
        const placeholder = elementCreator("div", ["class", "form-placeholder"], `${type}`, inputDiv);
        const input = elementCreator("div", ["class", `form-${type.toLowerCase()}-input`], false, inputDiv);
        input.setAttribute("contenteditable", "true");
        input.addEventListener("input", formInputLogic);
        let invalidLength;
        if(type==="Title") invalidLength=100;
        if(type==="Description") invalidLength=150;
        const errorMsg = elementCreator("p", ["class", `form-invalid-length-msg`], false, div);

        function formInputLogic(){
            if(this.innerText.length>0){
                placeholder.innerText= "";
            }
            else{
                placeholder.innerText=type;
            }
            if(inputDiv.offsetHeight>97){
                inputDiv.classList.add("overflown-input");
            }
            else{
                inputDiv.classList.remove("overflown-input");
            }
            if(type==="Title"){
                invalidInput(invalidLength);
    
            }
            else if(type==="Description"){
                invalidInput(invalidLength);
            }
            function invalidInput(num){
                if(input.innerText.length>0){
                    errorMsg.style.display="block";
                    errorMsg.innerText = `Characters: ${input.innerText.length} / ${invalidLength}`;
                }
                else{
                    errorMsg.style.display="none";
                }
                if(input.innerText.length>num){
                    inputDiv.classList.add("modal-invalid-input");
                    errorMsg.classList.add("form-invalid-over");
                }
                else{
                    inputDiv.classList.remove("modal-invalid-input");
                    errorMsg.classList.remove("form-invalid-over");

                }
            }

        }
        
        return Object.assign({}, inputDiv)
    }

    const titleInput = inputFactory("Title");
    const descInput = inputFactory("Description");

    const dueDateDiv = elementCreator("div", ["class", "modal-due-div"], false, form);
    
    const dueDateText = elementCreator("p", ["class", "modal-due-text"], "Due date ", dueDateDiv);
    const dueBtn = elementCreator("div", ["class", "modal-due-btn"], "Today", dueDateDiv);


}


function calenderModal(div, arrow, content){




}

function taskOverview(div, arrow, content){


}











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