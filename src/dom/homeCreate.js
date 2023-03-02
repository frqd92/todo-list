import { isHomeFunc, loggedIn, userN, displayUsername} from '../state';
import '/src/styles/homePage.css';
import { elementCreator, imageCreator } from '../utilities/elementCreator';
import { chooseTimeframeFunc } from '/src/home/homeLogic' 

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
    chooseTimeframeFunc(chooseTimeframeDiv);
    //const dailyBox = TaskBoxFact("daily");
}

const TaskBoxFact = (type)=>{

    const container = elementCreator("div", ["class", "home-taskbox-container"], false, document.getElementById("main-home-div"))
    const containerHead = elementCreator("div", ["class", "taskbox-head"], false, container);
    const arrowLeft = createArrow(containerHead, true);
    const date = elementCreator("p", false, "Monday, 28th of February 2023", containerHead)
    const arrowRight= createArrow(containerHead);
    arrowEffect([arrowLeft, arrowRight]);
    return { container }
}





function createArrow(div, isLeft){
    const arrow = isLeft?"<":">";
    const arrowDiv = elementCreator("div", ["class", "taskbox-arrow-div"], false, div);
    for(let i=0;i<3;i++){elementCreator("p", ["class", `arrow-${arrow}`], arrow, arrowDiv);}
    return arrowDiv
}
function arrowEffect(btns){
    btns.forEach(btn=>{
        btn.addEventListener("mouseover", arrowHover);
        btn.addEventListener("click", arrowHover);
    })

    function arrowHover(e){
        const arrows = this.querySelectorAll("p");
        const arrowDirection = this.childNodes[0].className.split("").pop();
        const isLeft = arrowDirection==="<"?true:false;
        let timer = 0; 
        if(isLeft){for(let i=arrows.length-1;i>=0;i--){callTimer(i)}}
        else{for(let i=0;i<arrows.length;i++){callTimer(i)}}
        function callTimer(i){
            timeFunc(timer, arrows[i]);
            timer+=100; 
        }
        function timeFunc(timer, elem){
            setTimeout(()=>{elem.classList.add("taskbox-animate");}, timer);
            setTimeout(()=>{elem.classList.remove("taskbox-animate");}, timer + 300)
        }
    }

}