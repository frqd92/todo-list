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
            const isDateNum = formatDateNum(this);
        
        if(isDateNum){ //if date is in number format
            const [day,month,year] = isDateNum;
            console.log(day,month,year);
        }
        else{   //if date is in text format
            formatDateText(this);
        }
        }
    }
}

function processDate(obj){ //if it passes all the checks
    console.log(obj);
}
function errorMsg(value){ //move to dom folder after
    console.log(value)
}


function formatDateNum(input){
      const separators = ["/", ".", "-"];
      let isNum = true;
        let arr = input.value.split("");
        arr=arr.filter(elem=> elem!==" ");
        arr.forEach((elem,index)=>{
            if(separators.includes(elem))arr[index] = " ";
        })
        let dateArray = arr.join("").split(" ");
        let day,month,year;
        dateArray.forEach((elem, index)=>{
            if(elem.length===1)dateArray[index]= "0"+elem;
            if(isNaN(elem))isNum = false;
        })
        if(isNum===false)return false;
        else{
            if(dateArray.length>2){
                if((dateArray[0].length===2 && dateArray[2].length===4) && dateArray.length===3){
                    day = dateArray[0];
                    month = dateArray[1];
                    year = dateArray[2];
                }
                else if((dateArray[0].length===4 && dateArray[2].length===2) && dateArray.length===3){
                    day = dateArray[2];
                    month = dateArray[1];
                    year = dateArray[0];
                }
            }
            else{
                if((dateArray[0].length===4) && dateArray.length===2){
                    month = dateArray[1];
                    year = dateArray[0];
                }
                else if(dateArray[1].length===4 && dateArray.length===2){
                    month = dateArray[0];
                    year = dateArray[1];
                }
                else if(dateArray.length===2 ){
                    day = dateArray[0];
                    month = dateArray[1];
                }
            }

            if(day===undefined && month===undefined){
                return false;
            }
            else{
                return [day,month,year]
            }
        }
}





/*

*/


function formatDateText(input){
    const inputArr = input.value.split(" ");
    if(inputArr[inputArr.length-1]===""){
        inputArr.pop()
    };
    let formatObj = [];
    inputArr.forEach((elem)=>{
        const word = elem.split("");
        let bool = checkForOrdinal(elem,formatObj); //ex. 12th of january
        if(!bool){
            if(!isNaN(elem) && (elem>0 && elem<32)){
                let day = checkDay(elem);
                formatObj.day = Number(day);
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
            let wordArray = this.value.toLowerCase().split(" ");
            wordArray.forEach((word, indexWord)=>{
                compareArr.forEach((month, indexMonth)=>{
                    if(word.toLowerCase().includes(month) && (word[0].toLowerCase() === month[0])){
                        wordArray[indexWord]=autoArr[indexMonth];
                    }
                })
            })
            this.value = wordArray.join(" ");
        }
    } 

}


// if(e.inputType!=="deleteContentBackward"){
//     const wordArray = this.value.toLowerCase().split(" ");
//     const lastWord = wordArray[wordArray.length-1].split("");
//     console.log(lastWord);
//     if(compareArr.includes(lastWord.join(""))){
//         const index = compareArr.indexOf(lastWord.join(""));
//         this.value = this.value.toLowerCase().replace(compareArr[index], autoArr[index]);
//     }
// }