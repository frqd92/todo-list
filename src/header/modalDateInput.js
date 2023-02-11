const compareArr = ["ja","f" ,"mar", "ap", "may", "jun", "jul", "au", "s", "oc", "n", "d"];
const autoArr = ["January", "February", "March","April","May", "June", "July", "August", "September", "October", "November", "December"];
const date = new Date();

export function modalDateInputFunc(input){
    autoCompleteMonth(input);
    clickEnter(input)
}



function clickEnter(input){
    input.addEventListener("keydown", renderDate);

    function renderDate(e){
        let getYear = date.getFullYear();
        if(e.key==="Enter"){
            const inputArr = this.value.split(" ");
            let formatObj = [];
            inputArr.forEach((elem)=>{
                const word = elem.split("");
                if(elem==="of"){return}; 
                let bool = checkForOrdinal(elem); //ex. 12th of january
                if(!bool){
                    if(!isNaN(elem) && (elem>0 && elem<32)){
                        let day = checkDay(elem);
                        formatObj.day = day;
                    }
                };
                if(/^[,;.-]+/.test(word[word.length-1])){
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
                if(!/[^\d{4}$]/.test(elem)){ //year check
                        console.log(elem)
                        formatObj.year = Number(elem);            
                }
            });



            if(formatObj.year===undefined){
                formatObj.year=getYear;
            }

            //let checkValidity = checkIfValid(formatObj);

            console.log(formatObj)


            function checkForOrdinal(val){
                let bool = false;
                let ordinal = ["th", "rd", "st", "nd"];
                ordinal.forEach(elem=>{
                    if(val.includes(elem)){
                        let num = val.replace(elem, "");
                        const dayFormat = checkDay(num);
                        if(dayFormat!==undefined){
                            formatObj.day = Number(dayFormat);
                            bool = true;
                        }
                    }
                })
                return bool;
            }

        }
    }

}


function checkIfValid(obj){
    let getDay = date.getDay();
    let getMonth = date.getMonth();
    let getYear = date.getFullYear();
    let validDay = true;
    let validMonth = true;
    let validYear = true;
    console.log(getDay, getMonth, getYear)       
    console.log(obj)     
}


function checkDay(num){
    if(num.length===1){
        num = "0" + num;
    }
    if(num>0 && num<32){
        return num;
    }
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


