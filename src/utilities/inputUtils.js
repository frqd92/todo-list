
//makes input only accept numbers in a specific range used with input event listener
// ex.  inputOnlyNum(e, this, [1,99]) -> only allows users to type numbers 1-99
export function inputOnlyNum(e, inp, arr){
    let input;
    !inp?input = this:input=inp;
    const [min, max] = arr;
    if(/[a-z\W]/i.test(e.data)){
        input.value = input.value.replaceAll(e.data,"");
    };
    if(Number(input.value)>max || Number(input.value)<min){
        input.value="";
    }
}


//in a number input you can increment or decrement with arrows
export function traverseNumInputWithArrows(e, inp, arr){
    let input;
    !inp?input = this:input=inp;
    const [min, max] = arr;
    if(e.key==="ArrowLeft" || e.key==="ArrowDown"){
        if(Number(input.value)===min){
            input.value=min;
            return;
        }
        input.value=Number(input.value) - 1;
    };
    if(e.key==="ArrowRight" || e.key==="ArrowUp"){
        if(Number(input.value)===max){
            input.value=max;
            return;
        }
        input.value=Number(input.value) + 1;
    }

}

//checks if a text flied (not input) is overflow, returns true/false
export function isOverflown(field){
    const overflowCheck = field.style.overflow;
    if (!overflowCheck || overflowCheck === "visible"){
        field.style.overflow = "hidden";
    }
    const isOverflow = field.clientWidth < field.scrollWidth || field.clientHeight < field.scrollHeight;
    field.style.overflow = overflowCheck;
    return isOverflow;
}