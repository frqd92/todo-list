import { modalDateInputFunc } from "./modalDateInput";


export function modalRepeatLogic(infoTextDiv, input, every, inEffect, inEffectOther, times){
    const [,firstText, secondText] = infoTextDiv.childNodes;

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
                    modalDateInputFunc(inEffectOther)

                }
                else if(text==="until"){
                    inEffect.innerText= "times";
                    times.classList.remove("ineffect-invisible");
                    inEffectOther.classList.add("ineffect-invisible")
                }
                else if(text==="times"){
                    inEffect.innerText= "forever";
                    inEffectOther.classList.add("ineffect-invisible");
                    times.classList.add("ineffect-invisible");
                }
            })
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