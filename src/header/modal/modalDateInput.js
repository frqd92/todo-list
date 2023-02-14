import { daysInMonth, chosenDayFunc } from "../../utilities/dateUtils";
import { elementCreator} from '/src/utilities/elementCreator'
import { errorMsg} from '/src/dom/modal/addModal';
const compareArr = ["ja","fe" ,"mar", "ap", "may", "jun", "jul", "au", "se", "oc", "no", "de"];
export const autoArr = ["January", "February", "March","April","May", "June", "July", "August", "September", "October", "November", "December"];

const date = new Date();


export function modalDateInputFunc(input, btn, dayBtnText){
    autoCompleteMonth(input);
    clickEnter(input, btn,dayBtnText)
}

function clickEnter(input, btn){
    input.addEventListener("keydown", renderDate);
    let formatObj = {};
    function renderDate(e){
        if(e.key==="Enter"){
            let invalid=false;
            formatObj.day="";formatObj.month="";formatObj.year="";
            const isDateNum = formatDateNum(this, formatObj);

            if(!isDateNum){ //if date is in number format
                let isDateText = formatDateText(this, formatObj);
                if(!isDateText){
                    invalid=true;
                }
            }
            if(!invalid){ //if date in input passes all the checks
                console.log("works")
                processDate(formatObj, btn);
                
            }
            else{ //if date format is wrong
                errorMsg("Error in date format")
            }
        }
    }
}


function processDate(obj, btn){ //if it passes all the checks
    let addZero = [obj.day, obj.month].map(elem=>elem<10?"0"+Number(elem):Number(elem));
    let value = `${addZero[0]}/${addZero[1]}/${obj.year}`;
    btn.textContent = value;
    let day = chosenDayFunc(obj.month,obj.day,obj.year);
    document.querySelector(".due-btn-day-text").innerText = day;

}



function formatDateNum(input, formatObj){
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
            if(dateArray.length==1)return false
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
                else if((dateArray[0].length===2 && dateArray[1].length===2 && dateArray[2].length===2) && dateArray.length===3){
                    day = dateArray[0];
                    month = dateArray[1];
                    year = "20" + dateArray[2];
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
                if(day===undefined){
                    if((date.getMonth() +1) === Number(month)){
                        formatObj.day = date.getDate() + 1;
                    }
                    else{
                        formatObj.day = 1;
                    }
                    formatObj.month = month;
                    formatObj.year = year;
                }
                else if (year===undefined){
                    if((date.getMonth() +1) === Number(month)){
                        if(day<date.getDate()){
                            formatObj.year = date.getFullYear() + 1;
                        }
                        else{
                            formatObj.year = date.getFullYear();
                        }
                    }   
                    else if((date.getMonth() +1) > Number(month)){
                        formatObj.year = date.getFullYear() + 1;
                    }
                    else{
                        formatObj.year = date.getFullYear();
                    }
                    formatObj.day = day;
                    formatObj.month = month;
                }
                else{
                    formatObj.day = day;
                    formatObj.month = month;
                    formatObj.year = year;
                }

                if(checkIfValid(formatObj)){
                    return [day,month,year]
                }

            }
        }
}

function formatDateText(input, formatObj){
    const inputArr = input.value.split(" ");
    let monthCount=0, dayCount=0, yearCount=0;
    if(inputArr[inputArr.length-1]===""){
        inputArr.pop()
    };
    inputArr.forEach((elem)=>{
        const word = elem.split("");
        let bool = checkForOrdinal(elem,formatObj); //ex. 12th of january
        if(bool){
            dayCount++
        }
        else{
            if(!isNaN(elem) && (elem>0 && elem<32)){
                let day = checkDay(elem);
                formatObj.day = Number(day);
                dayCount++;
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
                monthCount++;
                const monthInNum = autoArr.indexOf(month.join(""))+1
                formatObj.month = monthInNum; 
            }
        }
        if(/^\d{4}$/.test(elem)){ //year check
            formatObj.year = Number(elem);
            yearCount++;
           
        }
    });
    if(formatObj.year===""){
        if(formatObj.month === date.getMonth()+1){
            if(formatObj.day< date.getDate()){
                formatObj.year=date.getFullYear() + 1;
            }
            else{
                formatObj.year=date.getFullYear();
            }
        }
        if(formatObj.month > date.getMonth()+1){
            formatObj.year=date.getFullYear();
        }
        else if(formatObj.month < date.getMonth()+1){
            formatObj.year=date.getFullYear() + 1;
        }
        yearCount++;

    }
    if(dayCount>1 ||monthCount>1 || yearCount>1){
        return false;
    }
    if(checkIfValid(formatObj)){
        return true;
    }
    else {
        return false;
    }
}

function checkIfValid(obj){
    let getDay = date.getDate();
    let getMonth = date.getMonth() + 1;
    let getYear = date.getFullYear();
    let day = Number(obj.day);
    let month = Number(obj.month);
    let year = Number (obj.year);
    let daysInChosenMonth = daysInMonth(obj.month, obj.year);
    if(!daysInChosenMonth){
        errorMsg("Invalid Date Format");
        return false
    }
    if(day>daysInChosenMonth || day<1){
        errorMsg(`Days must be less than ${daysInChosenMonth} or greater than 0`);
        return false;
    }

    else if(month>12 || month<1) {
        errorMsg("Months must be between 1-12");
        return false;
    }
    else if(year<getYear){
        errorMsg("No time traveling");
        return false;
    }
    else if(year===getYear && (month===getMonth) && day<getDay){
        errorMsg("No time traveling");
        return false;
    }

    else{
        if(year < getYear){
            errorMsg("Check year");
            return false;
        };
        if(getYear===year){
            if(month < getMonth){
                errorMsg("Check month");
                return false;
            }
            if(month ===getMonth){
                if(day < getDay){
                errorMsg("Check day");
                return false;
                }
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
        this.classList.remove("date-input-invalid");
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