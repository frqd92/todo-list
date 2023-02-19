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
    console.log(taskArray);
}

export function updateDataServer(){

}