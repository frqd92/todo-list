import { getToday } from "/src/utilities/dateUtils";
import { loggedIn, taskArray } from "../../state";
import { writeUserTasks } from "../../rtDatabase";
export default function addNewTask(btn){
    btn.addEventListener("click", formatForObj);
}

function formatForObj(){
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
    let day, desc, group,repeat, notes;
    values[1].innerText===""?desc=false:desc=values[1].innerText;
    values[2].innerText==="Today"?day=getToday():day=values[2].innerText;
    values[3].innerText==="None"?group=false:group=values[3].innerText;
    values[5].innerText==="No repeat"?repeat=false:repeat=values[5].innerText;
    values[6].innerText==="No notes"?notes=false:notes=values[6].innerHTML;

    obj.title=values[0].innerText;
    obj.description=desc;
    obj.due=day;
    obj.group=group;
    obj.priority= values[4].innerText;
    obj.repeat = repeat;
    obj.notes = notes;
    taskArray.push(obj)
    console.log(taskArray);
    loggedIn?pushToServer(taskArray):pushToLocal(taskArray);

}

function pushToLocal(arr){
    localStorage.setItem("task-array", JSON.stringify(arr));
}
function pushToServer(taskArray){
    writeUserTasks(taskArray)
}