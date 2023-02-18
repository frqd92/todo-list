import { modalDateInputFunc } from "./modalDateInput";
import { hideDiv } from '/src/header/modal/showHideAdder';
export function modalRepeatLogic(infoTextDiv, input, every, inEffect, inEffectOther, times, saveBtn){
    const [everyText,firstText, secondText] = infoTextDiv.childNodes;

    everyTextFunc(every, firstText, input);
    inEffectFunc(inEffect, secondText, inEffectOther, times);
    input.addEventListener("input", (e)=>{
        if(/[a-z\W]/i.test(e.data)){
                input.value = input.value.replaceAll(e.data,"");
        };
        if(Number(input.value)>100 || Number(input.value)<1 ){
            input.value="";
        }
        if(Number(input.value)>1){
            const word = checkPlural(true,every.innerText.split(""));
            every.innerText=word;
            firstText.innerText = input.value + " " + every.innerText;
        }
        else{
            const word = checkPlural(false,every.innerText.split(""));
            every.innerText=word;
            input.addEventListener("focusout", ()=>{input.value=1}, {once:true})
            firstText.innerText = every.innerText;
        }
    })
    saveBtn.addEventListener("click", ()=>{
        document.querySelector(".modal-repeat-btn").innerText= `${everyText.innerText} ${firstText.innerText} ${secondText.innerText}`;
        hideDiv(document.querySelector(".modal-repeat-options"), "hidden-repeat-div")

    })
}

    function everyTextFunc(every, firstText, input){
        every.addEventListener("click", ()=>{
            const arrSing = ["week", "month", "year", "day"];
            const arrPlur = ["weeks", "months", "years", "days"];
            let arr="";
            Number(input.value)>1?arr=arrPlur:arr=arrSing;
            if(arr.indexOf(every.innerText)!==3){
                every.innerText = arr[arr.indexOf(every.innerText)+1];
            }
            else{
                every.innerText = arr[0];
            }
            let textArr = firstText.innerText.split(" ");
            if(textArr.length>1){
                textArr[1]= every.innerText;
            }
            else{
                textArr[0] = every.innerText;
            }
            let newVal = textArr.join(" ");

            firstText.innerText = newVal;
        })
    }
    
    function inEffectFunc(inEffect, secondText, inEffectOther, times){
            inEffect.addEventListener("click", ()=>{
                let text = inEffect.innerText;
                if(text==="forever"){
                    inEffect.innerText= "until";
                    times.classList.add("ineffect-invisible");
                    inEffectOther.classList.remove("ineffect-invisible");
                    modalDateInputFunc(inEffectOther);
                    inEffectOther.addEventListener("keydown",inputCheckUntil);
                }
                else if(text==="until"){
                    inEffectOther.value="";
                    inEffectOther.removeEventListener("keydown",inputCheckUntil);
                    inEffect.innerText= "times";
                    times.classList.remove("ineffect-invisible");
                    inEffectOther.classList.add("ineffect-invisible");
                    times.addEventListener("keydown", inputCheckTimes);
                    times.addEventListener("input", checkNumTimes);

                }
                else if(text==="times"){
                    times.value= "";
                    times.removeEventListener("keydown", inputCheckTimes);
                    inEffect.innerText= "forever";
                    inEffectOther.classList.add("ineffect-invisible");
                    times.classList.add("ineffect-invisible");
                    secondText.innerText="forever";
                }
            })
            function inputCheckTimes(e){
                if(e.key==="Enter" && Number(times.value)>0){
                    secondText.innerText=`x${times.value}`
                }
            }
            function checkNumTimes(e){
                if(/[a-z\W]/i.test(e.data)){
                    this.value = this.value.replaceAll(e.data,"");
                };
                if(this.value.split("").length>3){
                    this.value="";
                    this.placeholder="1-999"
                }
            }
            function inputCheckUntil(e){
                if(e.key==="Enter" && inEffectOther.value.length!==0){
                    secondText.innerText=`until ${inEffectOther.value}`
                }
            }
    }


    function checkPlural(isPlural, arr){
        if(isPlural){
            if(arr[arr.length-1]!=="s"){
                arr.push("s")
            }
        }
        else{
            if(arr[arr.length-1]==="s"){
                arr.pop();
            }
        }
        return arr.join("");
    }