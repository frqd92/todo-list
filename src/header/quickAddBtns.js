const date = new Date();



export function quickAddBtnsFunc(btn){

    btn.addEventListener("click", ()=>{
        textToDate(btn.innerText)
        test1()
    })
}

function textToDate(text){
    switch(text){
        case "Today":
  
            break;
    }
}

function test1(){

    const today = new Date();
    const tomorrow = new Date(today);
    const afterTomorrow = new Date(today);
    const nextWeek= new Date(today);
    const nextMonth = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);
    nextWeek.setDate(nextWeek.getDate()+(((1 + 7 - nextWeek.getDay()) % 7) || 7));
    nextMonth.setMonth(nextMonth.getMonth() + 1 ,1);


    // console.log(today);
    // console.log(tomorrow)
    // console.log(afterTomorrow);
}   