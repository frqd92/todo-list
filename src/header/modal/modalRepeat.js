
import { inputOnlyNum, traverseNumInputWithArrows, isOverflown } from "../../utilities/inputUtils";
import { createRepeatOptions } from "../../dom/modal/addModal";
import { getToday, getCurrentDateText } from '/src/utilities/dateUtils';
let dueDateAdder;

export function repeatLogic(repeatDiv){
    inputLogic(repeatDiv);
    tabOptions(repeatDiv);
}

export function dueDateVal(val){
    dueDateAdder = val
    let dayText = document.querySelector(".due-btn-day-text").innerText;
    dayText = dayText.split("").slice(0,3).join("");
    clearRepeat(document.querySelector(".modal-repeat-options"), dayText);
    // weekLogic(document.querySelector(".modal-repeat-options"), dayText);
    updateText2(document.querySelector(".summary-text-2"));
}

function clearRepeat(div, day){
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






//week check btns
function weekLogic(div, chosenDay){
    const btns = div.querySelectorAll(".repeat-check-btn-div");
    const text = div.querySelector(".summary-text-2");
    btns.forEach(btn=>{
        const p = btn.querySelector("span");
        const check = btn.querySelector(".repeat-checked");
        if(p.innerText===chosenDay){
            check.classList.add("repeat-checked-visible")
        }
        else{
            btn.addEventListener("click", weekBtnsFunc);
        }

    })


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
        field.style.fontSize = "9.5px"
    }
    else if(allChecked.length>3){
        field.style.fontSize = "11px";
    }
    else if(allChecked.length<3){
        field.style.fontSize = "13px";
    }
}




// tab options---------------------------------------------------
function tabOptions(div){
    const tabBtns =  div.querySelectorAll(".repeat-tab-btn");
    const numText = div.querySelector(".repeat-num-text");
    const input = div.querySelector(".repeat-num-input");
    const weekDiv = div.querySelector(".repeat-week-div");
    const summaryText1 = div.querySelector(".summary-text-1");

    
    tabBtns.forEach(btn=>{
        btn.addEventListener("click", tabTraversal);
    })

    function tabTraversal(){
        input.focus();
        numText.innerText=this.innerText.toLowerCase();
        checkPlural(input, numText);
        selectTab(this);
        this.innerText==="Week"?weekDiv.classList.add("show-week-repeat"):weekDiv.classList.remove("show-week-repeat");
        if(this.innerText==="Month") monthFunc()
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

function monthFunc(){
    const date = new Date();
    let day;
    if(dueDateAdder==="Today"){
        day = date.getDate();
    }
    else{
        day = dueDateAdder.slice(0, 2)
    }
    console.log(day);
    if(day>28){

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












// export function modalRepeatLogic(infoTextDiv, input, every, inEffect, inEffectOther, times, saveBtn, noRepeatBtn){
//     const [everyText,firstText, secondText] = infoTextDiv.childNodes;

//     everyTextFunc(every, firstText, input);
//     inEffectFunc(inEffect, secondText, inEffectOther, times);
//     input.addEventListener("input", (e)=>{

//         if(Number(input.value)>1){
//             every.innerText=word;
//             firstText.innerText = input.value + " " + every.innerText;
//         }
//         else{
//             const word = checkPlural(false,every.innerText.split(""));
//             every.innerText=word;
//             input.addEventListener("focusout", ()=>{input.value=1}, {once:true})
//             firstText.innerText = every.innerText;
//         }
//     })
//     saveBtn.addEventListener("click", ()=>{
//         document.querySelector(".modal-repeat-btn").innerText= `${everyText.innerText} ${firstText.innerText} ${secondText.innerText}`;
//         hideDiv(document.querySelector(".modal-repeat-options"), "hidden-repeat-div")
//     })
//     noRepeatBtn.addEventListener("click", ()=>{
//         document.querySelector(".modal-repeat-btn").innerText= "No repeat";
//         hideDiv(document.querySelector(".modal-repeat-options"), "hidden-repeat-div");

//     })
// }

//     function everyTextFunc(every, firstText, input){
//         every.addEventListener("click", ()=>{
//             const arrSing = ["week", "month", "year", "day"];
//             const arrPlur = ["weeks", "months", "years", "days"];
//             let arr="";
//             Number(input.value)>1?arr=arrPlur:arr=arrSing;
//             if(arr.indexOf(every.innerText)!==3){
//                 every.innerText = arr[arr.indexOf(every.innerText)+1];
//             }
//             else{
//                 every.innerText = arr[0];
//             }
//             let textArr = firstText.innerText.split(" ");
//             if(textArr.length>1){
//                 textArr[1]= every.innerText;
//             }
//             else{
//                 textArr[0] = every.innerText;
//             }
//             let newVal = textArr.join(" ");

//             firstText.innerText = newVal;
//         })
//     }
    
//     function inEffectFunc(inEffect, secondText, inEffectOther, times){
//             inEffect.addEventListener("click", ()=>{
//                 let text = inEffect.innerText;
//                 if(text==="forever"){
//                     inEffect.innerText= "until";
//                     times.classList.add("ineffect-invisible");
//                     inEffectOther.classList.remove("ineffect-invisible");
//                     modalDateInputFunc(inEffectOther);
//                     inEffectOther.addEventListener("keydown",inputCheckUntil);
//                 }
//                 else if(text==="until"){
//                     inEffectOther.value="";
//                     inEffectOther.removeEventListener("keydown",inputCheckUntil);
//                     inEffect.innerText= "times";
//                     times.classList.remove("ineffect-invisible");
//                     inEffectOther.classList.add("ineffect-invisible");
//                     times.addEventListener("keydown", inputCheckTimes);
//                     times.addEventListener("input", checkNumTimes);

//                 }
//                 else if(text==="times"){
//                     times.value= "";
//                     times.removeEventListener("keydown", inputCheckTimes);
//                     inEffect.innerText= "forever";
//                     inEffectOther.classList.add("ineffect-invisible");
//                     times.classList.add("ineffect-invisible");
//                     secondText.innerText="forever";
//                 }
//             })
//             function inputCheckTimes(e){
//                 if(e.key==="Enter" && Number(times.value)>0){
//                     secondText.innerText=`x${times.value}`
//                 }
//             }
//             function checkNumTimes(e){
//                 if(/[a-z\W]/i.test(e.data)){
//                     this.value = this.value.replaceAll(e.data,"");
//                 };
//                 if(this.value.split("").length>3){
//                     this.value="";
//                     this.placeholder="1-999"
//                 }
//             }
//             function inputCheckUntil(e){
//                 if(e.key==="Enter" && inEffectOther.value.length!==0){
//                     secondText.innerText=`until ${inEffectOther.value}`
//                 }
//             }
//     }

