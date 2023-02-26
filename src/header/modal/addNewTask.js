import { getToday } from "/src/utilities/dateUtils";
import { loggedIn, taskArray } from "../../state";
import { writeUserTasks } from "../../rtDatabase";
import { sucessMsgTask } from "../../dom/modal/addModal";
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
    repeat = processRepeat(values[5].innerText);
    //values[5].innerText==="No repeat"?repeat=false:repeat=values[5].innerText;
    values[6].innerText==="No notes"?notes=false:notes=values[6].innerHTML;



    obj.title=values[0].innerText;
    obj.description=desc;
    obj.due=day;
    obj.group=group;
    obj.priority= values[4].innerText;
    //obj.repeat = ;
    obj.notes = notes;
    obj.isPast = false;
    taskArray.push(obj)
    loggedIn?pushToServer(taskArray):pushToLocal(taskArray);
    //document.getElementById("form").remove()
    sucessMsgTask();
}

function pushToLocal(arr){
    localStorage.setItem("task-array", JSON.stringify(arr));
}
function pushToServer(taskArray){
    writeUserTasks(taskArray)
}

function processRepeat(val){
    const obj = {};
    if (val==="No repeat") return false;
    const arr = val.split(" ");
    console.log(val);
    if((arr.includes("day") || arr.includes("days")) && (!arr.includes("month") && !arr.includes("months"))){
        obj.every = "day";
        !isNaN(Number(arr[1]))?obj.numRepeatsEvery = Number(arr[1]):obj.numRepeatsEvery = 1;
        
    }
    if(arr[1]==="week" || arr[2]==="weeks"){
        obj.every="week"
        const weekArr = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        const  weekDaysArr = []
        arr.forEach(elem=>{
            elem = elem.replace(",", "");
            if(weekArr.includes(elem)){
                weekDaysArr.push(elem)
            }
        })
        obj.numRepeatsEvery = arr[2]==="weeks"?Number(arr[1]):1;

        obj.everyData = weekDaysArr;
    }
    else if(arr.includes("month") || arr.includes("months")){
        let monthArr = [];
        obj.every="month";
        obj.numRepeatsEvery = arr[1]==="month"?1:Number(arr[1]);
        let dayIndex = arr[1]==="month"?4:5;
        let day = Number(arr[dayIndex].replaceAll(/[a-z]/g, ""));
        if(arr[5]==="day" || arr[6]==="day"){
            monthArr[0] = day;
        }
        else{
            monthArr[0] = day;
            monthArr[1] = arr[dayIndex+1].slice(0,3).toLowerCase();
        }
        obj.everyData= monthArr;
    }
    else if(arr.includes("year") || arr.includes("years")){
        obj.every="year";
        obj.numRepeatsEvery = isNaN(arr[1])?1:Number(arr[1]);
    }

    if(arr.includes("forever")){
        obj.repeatFactor = "forever";
    }
    else if(arr.includes("until")){
        obj.repeatFactor = "until";
        obj.untilDate = arr[arr.length-1];
    }
    else if(arr.includes("time") || arr.includes("times")){
        obj.repeatFactor = "times";
        obj.repeatNumOfTimes = Number(arr[arr.length-2]);
    }
    console.log(obj);
}