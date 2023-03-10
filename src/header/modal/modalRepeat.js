
import { inputOnlyNum, traverseNumInputWithArrows, isOverflown } from "../../utilities/inputUtils";
import { hideDiv } from "./showHideAdder";
import { createRepeatOptions } from "../../dom/modal/addModal";
import { elementCreator } from "../../utilities/elementCreator";
import CalFactory from "../../dom/calenderFact/calFactory";
let dueDateAdder;
let arr, men, effectBtnText, btnfor, btnun,btnTim, dropdownDiv, otherText;
export function repeatLogic(repeatDiv){
    inputLogic(repeatDiv);
    tabOptions(repeatDiv);
    effectiveDiv(repeatDiv);
    saveBtns(repeatDiv);
    repeatBtnCloseCal();

}
// save and no repeat btns--------------------------------------------------
function repeatBtnCloseCal(){
    const repeatMainBtn = document.querySelector(".modal-repeat-btn");
    //repeatMainBtn.addEventListener("click", removeCal, {once:true});
    function removeCal(){
        //if(document.querySelector(".cal-effective-div")!==null){
            // document.querySelector(".cal-effective-div").remove();
            //repeatMainBtn.addEventListener("click", removeCal, {once:true});
        //}
    }


}
function saveBtns(div){
    const saveBtn = div.querySelector(".repeat-save-btn");
    const noRepeatBtn = div.querySelector(".no-repeat-btn");

    saveBtn.addEventListener("click", saveRepeatData);
    noRepeatBtn.addEventListener("click", noRepeatFunc)
    function saveRepeatData(e){
        const summary = div.querySelectorAll(".repeat-summary-div p");
        let summaryArr = [];
        summary.forEach((elem, i)=>{
            if(i!==0){
                summaryArr.push(elem.innerText);
            }
        })
        document.querySelector(".modal-repeat-btn").innerText = "every " + summaryArr.join(" ");
        console.log(summaryArr.join(" "));
        hideDiv(div, "hidden-repeat-div");
        resizeDiv();
        e.stopPropagation()
    }
    function noRepeatFunc(e){
        document.querySelector(".modal-repeat-btn").innerText = "No repeat";
        hideDiv(div, "hidden-repeat-div")
        e.stopPropagation()
    }
    function resizeDiv(){
        const mainRepeatBtn = document.querySelector(".modal-repeat-btn");
        const btnHeight = getComputedStyle(mainRepeatBtn).height.replaceAll(/[a-z]/g, "");
        let difference = Number(btnHeight) - 20;
        const divHeight = 22 + difference;
        div.style.top = divHeight + "px";

    }
}


// Effective div
function effectiveDiv(div){
    const btn = div.querySelector(".effective-btn");
    const menu = div.querySelector(".effective-dropdown-div");
    const otherT = div.querySelector(".effective-other-text");
    otherText = otherT;
    dropdownDiv = menu;
    effectBtnText = document.querySelector(".effective-btn-text");
    men = menu;
    const arrow = div.querySelector(".effective-arrow");
    arr=arrow;
    const [btnforever, btnUntil, btnTimes] = div.querySelectorAll(".effective-dropdown-row");
    btnTim = btnTimes;
    btnfor = btnforever;
    btnun = btnUntil;

    btn.addEventListener("click", showHideSelect);
    div.addEventListener("click", hideSelectDiv);
    function hideSelectDiv(e){
        if(!e.target.closest(".dropdown-div-shown") && !e.target.closest(".effective-btn")){
            hideSelect();
        }
    }
    function showHideSelect(){
        arrow.classList.toggle("effective-arrow-toggle");
        menu.classList.toggle("dropdown-div-shown");
        if(document.querySelector(".cal-effective-div")!==null) document.querySelector(".cal-effective-div").remove()
        removeSelectedAndAdd()
    };

    btnUntil.addEventListener("click", generateCal);
    function generateCal(){
        removeSelectedAndAdd(btnUntil);
        otherText.style.visibility="visible";
        otherText.innerText="";
        if(document.querySelector(".cal-effective-div")===null){
            const cal = CalFactory(btnUntil, btnUntil, otherText, true, false, true, false,"effective", menu);
            //(mainBtn, appendTo, textElem, returnInput, returnQuickBtns, returnCal, returnDay, userClass, toClose)

        }

    }
    btnforever.addEventListener("click", foreverClick);
    function foreverClick(){
        document.querySelector(".summary-text-3").innerText='forever';
        removeSelectedAndAdd(btnforever);
        changeEffectiveBtn("forever");
        otherText.style.visibility="hidden";
        if(document.querySelector(".cal-effective-div")){
            document.querySelector(".cal-effective-div").remove()
        }
    }
    btnTimes.addEventListener("click", timesClick);

}
function timesClick(){
    if(document.querySelector(".effective-times-input-div")===null){
        removeSelectedAndAdd(btnTim);
        const inputDiv = elementCreator("div", ["class", "effective-times-input-div", "effective-times-hidden"], false, dropdownDiv);
        const input = elementCreator("input", false, "1-99", inputDiv, false, true);
        const btn = elementCreator("div", false, "Enter", inputDiv);
        input.focus()
        if(document.querySelector(".cal-effective-div")){
            document.querySelector(".cal-effective-div").remove()
        }
        input.addEventListener("input", (e)=>{inputOnlyNum(e, input, [1,99])});
        btn.addEventListener("click", addTimes);
        input.addEventListener("keydown", hitEnter);
        function hitEnter(e){
            if(e.key==="s")addTimes(false) 
        }
        function addTimes(e){
            if(Number(input.value)>0 && Number(input.value)<100){
                otherText.style.visibility="hidden";
                otherText.innerText="";
                effectBtnText.innerText = `x${input.value}`;
                let timeOrTimes = Number(input.value)>1?"times":"time";
                document.querySelector(".summary-text-3").innerText = `${input.value} ${timeOrTimes}`
                document.querySelector(".effective-times-input-div").remove()
                hideSelect();
                if(e)e.stopPropagation();
            }
        }
    };
    document.addEventListener("click", removeTimes);
    function removeTimes(e){
        if(!e.target.closest(".effective-times-input-div") && e.target!==btnTim){
            if(document.querySelector(".effective-times-input-div")!==null){
                document.querySelector(".effective-times-input-div").remove()
                document.removeEventListener("click", removeTimes);
            }
        }
    }
}

function removeSelectedAndAdd(btn){
    const arr = [btnfor, btnun, btnTim];
    arr.forEach(elem=>{
        elem.classList.remove("selected-effective-row")
    })
    if(btn)btn.classList.add("selected-effective-row");
}




export function changeEffectiveBtn(value){
    effectBtnText.innerText=value;
    hideSelect()
}
export function hideSelect(){
    arr.classList.remove("effective-arrow-toggle");
    men.classList.remove("dropdown-div-shown");
    removeSelectedAndAdd()
}



export function dueDateVal(val){
    dueDateAdder = val
    let dayText = document.querySelector(".due-btn-day-text").innerText;
    dayText = dayText.split("").slice(0,3).join("");
    renderWeek(document.querySelector(".modal-repeat-options"), dayText);
    updateText2(document.querySelector(".summary-text-2"));
}

function renderWeek(div, day){
    div.innerHTML="";
    createRepeatOptions(div);
    const btns = div.querySelectorAll(".repeat-check-btn-div");
    const text = div.querySelector(".summary-text-2");
    btns.forEach(btn=>{
        const p = btn.querySelector("span");
        const check = btn.querySelector(".repeat-checked");
        if(p.innerText===day){
            check.classList.add("repeat-checked-visible")
            btn.classList.add("repeat-checked-noclick")
        }
        else{
            btn.addEventListener("click", weekBtnsFunc);
        }
    })
    function weekBtnsFunc(){
        const check = this.querySelector(".repeat-checked");
        check.classList.toggle("repeat-checked-visible");
        updateText2(text);
    };
}





function updateText2(text){
    let arr = [];
    const mainCheckDiv = document.querySelectorAll(".repeat-check-btn-div");
    mainCheckDiv.forEach((elem, index)=>{
        const checked =elem.querySelector(".repeat-checked-visible");
        const week = elem.querySelector("span").innerText;
        if(checked){arr.push(week.toLowerCase())};
    })
    let string;
    if(arr.length===1){
        string = arr[0];
    }
    else if(arr.length===2){
        string = arr[0] + " and " + arr[1] +" ";
    }
    else{
        for(let i=0;i<arr.length;i++){
            if(i===arr.length-2){
                string+=`${arr[i]} and `;
            }
            else if(i===arr.length-1){
                string+=`${arr[i]}`;
            }
            else{
                string+=`${arr[i]}, `;
            }
        }
    }
    //fix weird bug, first day is always undefinedDAY, can't figure out why
    if (arr.length>0){
        let fixBugArr = string.split(" ");
        fixBugArr[0] = fixBugArr[0].replace("undefined", "");
        string = fixBugArr.join(" ");
        text.innerText = 'on ' + string;
        resizeTextField(text.parentElement)
    }

}

function resizeTextField(field){
    const allChecked = document.querySelectorAll(".repeat-checked-visible");
    if(allChecked.length>5){
        field.style.fontSize = "8.2px"
    }
    else if(allChecked.length>3){
        field.style.fontSize = "9px";
    }
    else if(allChecked.length<3){
        field.style.fontSize = "11.5px";
    }
}




// tab options---------------------------------------------------
function tabOptions(div){
    const tabBtns =  div.querySelectorAll(".repeat-tab-btn");
    const numText = div.querySelector(".repeat-num-text");
    const input = div.querySelector(".repeat-num-input");
    const weekDiv = div.querySelector(".repeat-week-div");
    const monthDiv = div.querySelector(".repeat-month-div");
    const summaryText1 = div.querySelector(".summary-text-1");
    const summaryText2 = div.querySelector(".summary-text-2");

    
    tabBtns.forEach(btn=>{
        btn.addEventListener("click", tabTraversal);
    })

    function tabTraversal(){
        input.focus();
        numText.innerText=this.innerText.toLowerCase();
        checkPlural(input, numText);
        selectTab(this);
        this.innerText==="Week"?weekDiv.classList.add("show-week-repeat"):weekDiv.classList.remove("show-week-repeat");
        this.innerText==="Month"?monthDiv.classList.add("show-month-repeat"):monthDiv.classList.remove("show-month-repeat");
        if(this.innerText==="Month"){
            summaryText2.style.display="block";
            monthFunc(summaryText2);
        }
        if(this.innerText==="Week"){
            summaryText2.style.display="block"
            updateText2(summaryText2);
        }
        if(this.innerText==="Day" || this.innerText==="Year"){
            summaryText2.style.display="none"
            summaryText2.innerText="";
        }
        updateSummary(summaryText1, input.value, numText.innerText)

    }
    function selectTab(btn){
        btn.classList.add("repeat-chosen-tab");
        tabBtns.forEach(elem=>{
            if(elem!==btn){
                elem.classList.remove("repeat-chosen-tab");
            }
        })
    }
};

function monthFunc(text2){
    const repeatLeft = document.querySelector(".repeat-left");
    const repeatRight = document.querySelector(".repeat-right");
    repeatLeft.addEventListener("click", toggleMonthRepeat);
    repeatRight.addEventListener("click", toggleMonthRepeat);
    text2.innerText="on " + repeatLeft.innerText;
    function toggleMonthRepeat(){
        if(this.className.includes("repeat-left")){
            repeatRight.classList.remove("chosen-month-repeat");
        }
        else{
            repeatLeft.classList.remove("chosen-month-repeat");
        }
        text2.innerText="on " + this.innerText
        this.classList.add("chosen-month-repeat");
        resizeWithMonth();
    };
    function resizeWithMonth(){
        const div = document.querySelector(".repeat-summary-div")
        if(isOverflown(div)){
            div.style.fontSize = "11px";
        }
        else{
            div.style.fontSize = "12px";
        }
    }
}
// numInput logic--------------------------------------------------

function inputLogic(div){
    const numInput = div.querySelector(".repeat-num-input");
    numInput.focus();
    numInput.addEventListener("input", numInputFunc);
    numInput.addEventListener("keydown", numInputFuncKey);
}

function numInputFunc(e){
    this.addEventListener("focusout", ()=>{
        if(this.value===""){
            this.value=1;
        }
    }, {once:true});
    
    inputOnlyNum(e, this, [1,99]);
    const numText = e.target.nextSibling;
    checkPlural(this, numText);
    updateSummary(document.querySelector(".summary-text-1"),this.value,this.nextSibling.innerText)

}
function numInputFuncKey(e){
    traverseNumInputWithArrows(e, this, [1, 99]);
}

function checkPlural(input, textField){
    const inputVal = input.value;
    let arr = textField.innerText.split("");

    if(Number(inputVal)>1){
        if(arr[arr.length-1]!=="s"){
            textField.innerText+="s"
        }
    }
    else{
        if(arr[arr.length-1]==="s"){
            arr.pop();
            textField.innerText=arr.join("");
        }
    }
}


function updateSummary(text1, inputVal, numText){
    let num = Number(inputVal)>1?inputVal:"";
    text1.innerText = `${num} ${numText}`; 
}









