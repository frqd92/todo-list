import { readUserTasks } from "./rtDatabase";

//authen
export let loggedIn = false;
export let userN ="";
export function isSignedIn(bool){
    loggedIn = bool?true:false;
}
export function displayUsername(val){
    userN = val;
}


//website location and choices
export let isHome = true;
export let homeViewChoice = "daily";
export function isHomeFunc(bool){
    isHome = bool?true:false;
}
export function viewChoice(val){
    homeViewChoice=val;
}

//theme
export let savedTheme = "light-theme";

export function themeFunc(theme){
    savedTheme = theme;
}


//homepage taskbox autohide
export let isAutoHide = "autohide";
export function changeAutoHide(val){
    isAutoHide = val;
}

//task obj
export let groupArray = [];
export let taskArray = [];
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
        // console.log("logged in: ", loggedIn);
        //console.log("view choice: ", homeViewChoice);
    })
}
