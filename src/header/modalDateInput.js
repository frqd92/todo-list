const compareArr = ["ja","fe" ,"mar", "ap", "may", "jun", "jul", "au", "se", "oc", "no", "de"];
const autoArr = ["January", "February", "March","April","May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();

export function modalDateInputFunc(input){
    autoCompleteMonth(input);
    clickEnter(input)
}



function clickEnter(input){
    input.addEventListener("keydown", renderDate);

    function renderDate(e){
        if(e.key==="Enter"){
            const inputArr = this.value.split(" ");




            if(inputArr[inputArr.length-1]===""){
                inputArr.pop()
            }
            let formatObj = [];
            inputArr.forEach((elem)=>{
                const word = elem.split("");
                let bool = checkForOrdinal(elem,formatObj); //ex. 12th of january
                if(!bool){
                    if(!isNaN(elem) && (elem>0 && elem<32)){
                        let day = checkDay(elem);
                        formatObj.day = day;
                    }
                };
                if(/^[,;.-\s]+/.test(word[word.length-1])){
                    word.pop();
                }
                let wordTest = word.every((elem)=>/[a-zA-Z]/.test(elem));
                if(wordTest){ //month check if word
                    let month = word;
                    month[0] = month[0].toUpperCase();
                    if(autoArr.includes(month.join(""))){
                        const monthInNum = autoArr.indexOf(month.join(""))+1
                        formatObj.month = monthInNum; 
                    }
                }
                if(/^\d{4}$/.test(elem)){ //year check
                        formatObj.year = Number(elem);            
                }
            });

            if(formatObj.year===undefined){
                formatObj.year=date.getFullYear();
                if(!checkIfValid(formatObj)){
                    formatObj.year=date.getFullYear() + 1;
                }

            }
            let checkValidity = checkIfValid(formatObj);
            if(checkValidity){
                processDate(formatObj);
            }
        }
    }

}

function processDate(obj){ //if it passes all the checks
    console.log(obj);
}
function errorMsg(value){ //move to dom folder after

}



function checkIfValid(obj){
    let getDay = date.getDate();
    let getMonth = date.getMonth() + 1;
    let getYear = date.getFullYear();

    if(obj.year < getYear){
        errorMsg("Check year");
        return false;
    };
    if(getYear===obj.year){
        if(obj.month < getMonth){
            errorMsg("Check month");
            return false;
        }
        if(obj.month ===getMonth){
            if(obj.day < getDay){
            errorMsg("Check day");
            return false;
            }
        }
    }
    return true;

};







function checkDay(num){
    if(num.length===1){
        num = "0" + num;
    }
    if(num>0 && num<32){
        return num;
    }
}


function checkForOrdinal(val, obj){
    let bool = false;
    let ordinal = ["th", "rd", "st", "nd"];
    ordinal.forEach(elem=>{
        if(val.includes(elem)){
            let num = val.replace(elem, "");
            const dayFormat = checkDay(num);
            if(dayFormat!==undefined){
                obj.day = Number(dayFormat);
                bool = true;
            }
        }
    })
    return bool;
}


function autoCompleteMonth(input){
    input.addEventListener("input", autoComp);
    function autoComp(e){

        if(e.inputType!=="deleteContentBackward"){
            const wordArray = this.value.toLowerCase().split(" ");
            const lastWord = wordArray[wordArray.length-1].split("");
            if(compareArr.includes(lastWord.join(""))){
                const index = compareArr.indexOf(lastWord.join(""));
                this.value = this.value.toLowerCase().replace(compareArr[index], autoArr[index]);
            }
        }
    } 

}


