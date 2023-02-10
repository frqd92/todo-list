export function modalDateInputFunc(input){
    autoCompleteMonth(input)

}

function autoCompleteMonth(input){
    input.addEventListener("input", autoComp);
    function autoComp(e){
        arrMagic(this, "nuary", ["j"], "a");
        arrMagic(this, "bruary", ["f"], "e");
        arrMagic(this, "ch", ["m","a"], "r");
        arrMagic(this, "ril" , ["a"], "p");
        arrMagic(this, "e" , ["j","u"], "n");
        arrMagic(this, "y" , ["j","u"], "l");
        arrMagic(this, "gust" ,["a"], "u");
        arrMagic(this, "ptember" ,["s"],"e");
        arrMagic(this, "tober", ["o"], "c");
        arrMagic(this, "mber", ["n","o", "v"], "e");
        arrMagic(this, "cember", ["d"], "e");


   

        function arrMagic(input, string, prevArr, val){
            const inputArrChar = input.value.split("");
            const inputArrWord = input.value.split(" ");
            const word = inputArrWord[inputArrWord.length-1].split("");
            console.log(word)
            const prevChar = inputArrChar[inputArrChar.length-2];
            const prevPrevChar = inputArrChar[inputArrChar.length-3];
            let equal = false;
            if(e.data===val && input.value.length>0){
                for(let i=0;i<word.length;i++){
                    if(i!==word.length-1){
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
            console.log(equal)
        }  
    }
}


// function autoCompleteMonth(input){
//     input.addEventListener("input", autoComp);
//     function autoComp(e){
//         const inputArrChar = this.value.split("");

//         const prevChar = inputArrChar[inputArrChar.length-2];
//         const prevPrevChar = inputArrChar[inputArrChar.length-3];
//         const prevPrevPrevChar =  inputArrChar[inputArrChar.length-4];
//         if(e.data==="l" || e.data==="n" ){
//             console.log(e.data)
//             if(prevChar.toLowerCase()==="u"){
//                 if(prevPrevChar===" " ||prevPrevChar===undefined){
//                     //e.data==="l"?arrMagic("y", this):arrMagic("n", this);
//                 }
//             }
//         }
//         function arrMagic(string, input){
//             input.value += string;
//             const inputArrWordEdit = input.value.split(" ");
//             const lastWord = inputArrWordEdit[inputArrWordEdit.length-1].split("");
//             lastWord[0]=lastWord[0].toUpperCase();
//             inputArrWordEdit[inputArrWordEdit.length-1] = lastWord[0];
//             inputArrWordEdit[inputArrWordEdit.length-1] = lastWord.join("");
//             input.value = inputArrWordEdit.join(" ");
//         }  
//     }
// }
