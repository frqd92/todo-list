import { isHomeFunc, loggedIn, userN, displayUsername} from '/src/state';
import '/src/styles/homePage.css';
import { elementCreator, imageCreator } from '../../utilities/elementCreator';
import { chooseTimeframeFunc } from '/src/home/homeLogic' 
import TaskBoxFact from './taskBoxFact';





export default function createHomePage(main){
    if(!loggedIn){displayUsername("guest user")} //when logged in, login-page/authen.js
    isHomeFunc(true); 
    const homeDiv = elementCreator("div", ["id", "main-home-div"], false, main)
    createHomeHead(homeDiv);

}

function createHomeHead(div){
    const headDiv = elementCreator("div", ["class", "home-head-div"], false, div);
    elementCreator("div", ["class", "home-welcome"], `Welcome ${userN}`, headDiv);
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

}

