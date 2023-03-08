import { isHomeFunc, loggedIn, userN, displayUsername, homeViewChoice} from '/src/state';
import '/src/styles/homePage.css';
import { elementCreator, imageCreator } from '../../utilities/elementCreator';
import { chooseTimeframeFunc } from '/src/home/homeLogic' 
import TaskBoxFact from './taskBoxFact';





export default function createHomePage(main){
    if(!loggedIn){displayUsername("guest user")} //when logged in, login-page/authen.js
    isHomeFunc(true); 
    const homeDiv = elementCreator("div", ["id", "main-home-div"], false, main)
    createHomeHead(homeDiv);
    const displayedTasks = elementCreator("div", ["class", "disp-task-div"],false, homeDiv)
    resizeTaskDiv();
}
export function resizeTaskDiv(){
    const taskDiv = document.querySelector(".disp-task-div");
    const height = getComputedStyle(taskDiv).height;
    if(homeViewChoice==="daily"){
        taskDiv.style.maxHeight = "650px";
    }
    else{
        if(document.querySelector(`.hidden-onerow-${homeViewChoice}`)!==null){
            taskDiv.style.maxHeight="700px";
        }
        else{
            taskDiv.style.maxHeight="560px";
        }
    }

}



function createHomeHead(div){
    const headDiv = elementCreator("div", ["class", "home-head-div"], false, div);
    const chooseTimeframeDiv = elementCreator("div", ["class", "home-timeframe-div"], false, headDiv);
    elementCreator("div", ["class", "picked-timeframe"], false,chooseTimeframeDiv)
    const nameArr = ["Daily", "Weekly", "Monthly"];
    for(let i=0;i<3;i++){
        elementCreator("div", ["class", "home-timeframe-btn"], nameArr[i], chooseTimeframeDiv)
        if(i!==2){
            elementCreator("span", false, "/", chooseTimeframeDiv)
        }
    }
    const container = elementCreator("div", ["id", "home-taskbox-container"], false, document.getElementById("main-home-div"))
    const subContainer = elementCreator("div", ["id", "taskbox-sub-container"], false, container);
    const dailyBox = TaskBoxFact("daily");
    const weeklyBox = TaskBoxFact("weekly");
    const monthlyBox = TaskBoxFact("monthly");
    chooseTimeframeFunc(chooseTimeframeDiv);
    //absolute positioned, so this adds a window event resize listener to adjust the divs height to window width
    resizableMainPage();
    resizeAbs();

}

function resizableMainPage(){
    window.addEventListener("resize", resizeAbs)
    document.querySelectorAll(".home-timeframe-btn").forEach(btn=>{
        btn.addEventListener("click",resizeAbs);
    })

}


export function resizeAbs(){
  
    let headHeight;
    let calHeight;
    switch(homeViewChoice){
        case "daily": 
            headHeight = document.querySelector(".taskbox-head-daily");
            calHeight = null;
            break;
        case "weekly":
            headHeight = document.querySelector(".taskbox-head-weekly");
            calHeight = document.querySelector(".onerow-cal-weekly");
            break;
        case "monthly":
            headHeight = document.querySelector(".taskbox-head-monthly");
            calHeight = document.querySelector(".onerow-cal-monthly");
    }
    const heightH = getComputedStyle(headHeight).height;
    const heightC = calHeight?getComputedStyle(calHeight).height:"0px";
    document.getElementById("home-taskbox-container").style.height = `calc(${heightH} + ${heightC} + 10px)`
}