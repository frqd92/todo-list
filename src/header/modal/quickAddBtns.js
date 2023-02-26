import { chosenDayFunc } from "/src/utilities/dateUtils";
import { hideDiv } from "./showHideAdder";

export function quickAddBtnsFunc(btn, userClass){
    quickBtnHover(btn);

    btn.addEventListener("click", (e)=>{
        btnToDate(btn.innerText, userClass)
        e.stopPropagation()
    })
}

function btnToDate(text, userClass){
    const mainBtn = document.querySelector(".modal-due-btn");
    if(text!=="None"){
        const [date, [dd,mm,yy]] = textToDate(text);
        let day = chosenDayFunc(yy,mm-1,dd);
        document.querySelector(".due-btn-day-text").innerText = day;
        mainBtn.innerText = date;
        document.querySelector(`.cal-${userClass}-div`).remove();
        document.querySelector(`.cal-due-btn-hover-div`).remove();
    }
    else{
        document.querySelector(".due-btn-day-text").innerText = "";
        mainBtn.innerText = "None";
    }

}

function textToDate(text){
    if(text==="None") return;
    const today = new Date();
    const formatDate = new Date(today);
    switch(text){
        case "Tomorrow":
            formatDate.setDate(formatDate.getDate() + 1); break;
        case "After tomorrow":
            formatDate.setDate(formatDate.getDate() + 2); break;
        case "Next week":
            formatDate.setDate(formatDate.getDate()+(((1 + 7 - formatDate.getDay()) % 7)|| 7)); break;
        case "Next month":
            formatDate.setMonth(formatDate.getMonth() + 1 ,1); break;
    }
    const formattedDay = formatDate.getDate()<10?'0'+formatDate.getDate():formatDate.getDate();
    const formattedMonth = (formatDate.getMonth()+1)<10?"0"+(formatDate.getMonth()+1):formatDate.getMonth()+1;
    return [`${formattedDay}/${formattedMonth}/${formatDate.getFullYear()}`, [formatDate.getDate(), formatDate.getMonth()+1, formatDate.getFullYear()]];
}   

function quickBtnHover(btn){
    if(btn.innerText==="None")return;
    const hoverDiv = document.querySelector(".cal-due-btn-hover-div");
    const [dayDiv, dateDiv] =  document.querySelectorAll(".cal-due-btn-hover-div p");
    btn.addEventListener("mouseover", makeVisible, {once:true});


    function makeVisible(){
        const [date, [dd,mm,yy]] = textToDate(btn.innerText);
        let day = chosenDayFunc(yy,Number(mm)-1,dd);
        hoverDiv.style.display="flex";
        dayDiv.innerText = day;
        dateDiv.innerText= date;


        btn.addEventListener("mouseleave", makeInvisible, {once:true});
        btn.addEventListener("mousemove", followMouse);

        function makeInvisible(){
            hoverDiv.style.display="none";
            btn.addEventListener("mouseover", makeVisible, {once:true});
            btn.removeEventListener("mousemove", followMouse);

        }
    
    function followMouse(e){
        hoverDiv.style.top= (e.pageY - 18)+"px";
        hoverDiv.style.left= (e.pageX + 12)+"px";
    }
    

    }


}