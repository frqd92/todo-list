import { getToday } from "../../utilities/dateUtils";
export function saveBtnLogic(btn){
    btn.addEventListener("click", validateForm);
}

function validateForm(){
    const values = document.querySelectorAll(".adder-value");
    if(values[0].innerText.length<1){
        document.querySelector(".form-placeholder").innerText="Mandatory field";
        document.querySelector(".form-placeholder").classList.add("placeholder-red")
        setTimeout(()=>{
            document.querySelector(".form-placeholder").innerText="Title*";
            document.querySelector(".form-placeholder").classList.remove("placeholder-red")
        },1500)
        return;
    }
    const obj = {};
    let day
    values[2].innerText==="Today"?day = getToday():day=values[2].innerText;
    
    obj.title=values[0].innerText;
    obj.description=values[1].innerText;
    obj.due=day;
    obj.group=values[3].innerText;
    obj.priority= values[4].innerText;
    obj.repeat = values[5].innerText;
    obj.notes = values[6].innerText;
    console.log(obj);



}