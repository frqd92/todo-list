export function modalDateInputFunc(input){
    autoCompleteMonth(input);
    clickEnter(input)
}



function clickEnter(input){
    input.addEventListener("keydown", renderDate);

    function renderDate(e){
        if(e.key==="Enter"){
            const inputArr = input.value.split(" ");
            let formatObj = [];
            inputArr.forEach((elem,index)=>{

            if(elem==="of"){};
            let bool = checkForOrdinal(elem);
            if(!bool){
                if(!isNaN(elem) && (elem>0 && elem<32)){
                    formatObj.day 
                }
            }

            });
            console.log(formatObj);
            function checkForOrdinal(val){
                let bool = false;
                let ordinal = ["th", "rd", "st", "nd"];
                ordinal.forEach(elem=>{
                if(val.includes(elem)){
                    let num = val.replace(elem, "");
                    if(num.length===1){
                        num = "0" + num;
                    }
                    if(num>0 && num<32){
                        formatObj.day = num;
                        bool = true;
                    }
                }
                })
                return bool;

            }
            function checkDay(num){
                if(num.length===1){
                    num = "0" + num;
                }
                if(num>0 && num<32){
                    return num;
                }
            }








        }
    }

}








function autoCompleteMonth(input){
    input.addEventListener("input", autoComp);
    function autoComp(e){
        if(e.inputType!=="deleteContentBackward"){
            const wordArray = this.value.toLowerCase().split(" ");
            const lastWord = wordArray[wordArray.length-1].split("");
            const compareArr = ["ja","f" ,"mar", "ap", "may", "jun", "jul", "au", "s", "oc", "n", "d"];
            const autoArr = ["January", "February", "March","April","May", "June", "July", "August", "September", "October", "November", "December"];
            if(compareArr.includes(lastWord.join(""))){
                const index = compareArr.indexOf(lastWord.join(""));
                this.value = this.value.toLowerCase().replace(compareArr[index], autoArr[index]);
            }
        }
    } 
}



//holy fuck this way was stupid
function autoCompleteMonthzz(input){
    input.addEventListener("input", autoComp);
    function autoComp(e){
        console.log(this.value.split(""))
        switch(e.data){
            case "a":
                arrMagic(this, "nuary", ["j"],"a");
                break;
            case "e":
                arrMagic(this, "bruary", ["f"],"e");
                arrMagic(this, "ptember", ["s"],"e");
                arrMagic(this, "cember", ["d"],"e");
                break;
            case "r":
                arrMagic(this, "ch", ["m","a"],"r");
                break;
            case "p":
                arrMagic(this, "ril", ["a"],"p");
                break;
            case "n":
                arrMagic(this, "e", ["j","u"],"n");
                break;
            case "l":
                arrMagic(this, "y", ["j","u"],"l");
                break;
            case "u":
                arrMagic(this, "gust", ["a"],"u");
                break;
            case "c":
                arrMagic(this, "tober", ["o"],"c");
                break;
            case "v":
                arrMagic(this, "ember", ["n","o"],"v");
                break;
        }
        function arrMagic(input, string, prevArr, val){
            const inputArrWord = input.value.split(" ");
            const word = inputArrWord[inputArrWord.length-1].split("");
            let equal = false;
            if(e.data===val && input.value.length>0){
                for(let i=0;i<word.length;i++){
                    if(i!==word.length-1){
                        console.log(word[i])
                        console.log(prevArr[i])
                        equal = word[i]===prevArr[i]?true:false;
                    }
                }
            }
            if(equal){
                input.value += string;
                const inputArrWordEdit = input.value.split(" ");
                const lastWord = inputArrWordEdit[inputArrWordEdit.length-1].split("");
                lastWord[0]=lastWord[0].toUpperCase();
                inputArrWordEdit[inputArrWordEdit.length-1] = lastWord[0];
                inputArrWordEdit[inputArrWordEdit.length-1] = lastWord.join("");
                input.value = inputArrWordEdit.join(" ");
            }
        }  
    }
}


