import { readUserTasks } from "./rtDatabase";



export let loggedIn = false;
export let savedTheme = "light-theme";
export let isHome = true;
export let groupArray = [];
export let taskArray = [];


export function isSignedIn(bool){
    loggedIn = bool?true:false;
}

export function themeFunc(theme){
    savedTheme = theme;
}

export function isHomeFunc(bool){
    isHome = bool?true:false;
}

export function updateDataLocal(){
    const tasks = JSON.parse(localStorage.getItem("task-array"));
    const groups= JSON.parse(localStorage.getItem("groups"));
    if(groups!==null){
        groupArray=groups;
    }
    if(tasks!==null){
        taskArray=tasks;
    }

}

export function updateDataServer(taskFromSer, groupFromSer){
    let arrFromServer;
    if(taskFromSer){//for tasks
        arrFromServer = taskFromSer;
        if(arrFromServer.length>0){
            taskArray=arrFromServer;
         }
    }
    else{//for groups
        arrFromServer = groupFromSer;
        if(arrFromServer.length>0){
            groupArray=arrFromServer;
         }
    }


}


//for testing in mainPageCreate.js
export function testShit(){
    document.querySelector(".nav-title").addEventListener("click", ()=>{
        console.log("task array: ", taskArray);
        console.log("group array: ", groupArray);
        console.log("logged in: ", loggedIn);
    })
}
