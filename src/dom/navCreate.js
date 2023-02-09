import { elementCreator, imageCreator } from "../utilities/elementCreator";
import githubImg from "/src/assets/images/github.png"
import homePng from '/src/assets/images/home.png';
import tasksPng from '/src/assets/images/tasks.png';
import arrowCircle from '/src/assets/images/arrow-circle.png';
import gearPng from '/src/assets/images/gear.png';
import { hideMenFunc } from "../nav/hideMenu";
import taskPage from "./taskPageCreate";
import createHomePage from "./homeCreate";
import { isHome, isHomeFunc } from "../state";
import '/src/styles/nav.css'
import '/src/styles/mobile/nav-mobile.css'

export default function createNav(main){
    const nav = elementCreator("nav", false, false, document.body);
    elementCreator("h1", ["class", "nav-title"], "Todoer", nav);
    const navItems = elementCreator("div", ["class", "nav-items"], false, nav);
    makeNavItems(navItems, main);
    const hideNavBtn = elementCreator("p", ["class", "nav-hide-btn"],"Hide Menu", nav);
    hideMenFunc(hideNavBtn, nav);
    const gitButton = imageCreator(githubImg,["class", "nav-github"], nav);
}

function makeNavItems(div, main){
    const homeDivBtn = elementCreator("div", ["class", "nav-item"], false, div);
    imageCreator(homePng, ["class", "nav-icon", "nav-icon-home"], homeDivBtn);
    elementCreator("p", false, "Home", homeDivBtn);

    const tasksDiv = elementCreator("div", ["class", "nav-item"], false, div);
    const tasksDivBtn = elementCreator("div", ["class", "nav-item"], false, tasksDiv)
    imageCreator(tasksPng, ["class","nav-icon","nav-icon-tasks"], tasksDivBtn);
    elementCreator("p", false, "Tasks", tasksDivBtn);
    const arrowDropDown = imageCreator(arrowCircle, ["class", "tasks-arrow"], tasksDiv);
    const tasksSubDiv = elementCreator("div", ["class", "nav-tasks-sub"], false, div);
    const ul = elementCreator("ul", false, false, tasksSubDiv);

    elementCreator("li", ["class", "li-title"], "items", ul);
    elementCreator("li", ["class", "li-title"], "items", ul);
    elementCreator("li", ["class", "li-title"], "items", ul);



    const settingsDivBtn = elementCreator("div", ["class", "nav-item"], false, div);
    imageCreator(gearPng, ["class", "nav-icon", "nav-icon-settings"], settingsDivBtn);
    elementCreator("p", false, "Settings", settingsDivBtn)
    navSelectMenu(arrowDropDown, tasksSubDiv,settingsDivBtn );
    tasksDiv.addEventListener("click", (e)=>{
        if(!e.target.className.includes("tasks-arrow") && isHome){
            taskPage(main);
        }
    });
    homeDivBtn.addEventListener("click", (e)=>{
        if(!isHome){
            createHomePage(main)
        }
    });
}

const makeTasks=()=>{ //not in DOM folder though, move it to a task.js outside of dom

}

function navSelectMenu(arrowBtn, div, settingsBtn){
    arrowBtn.addEventListener("click", ()=>{
        arrowBtn.classList.toggle("arrow-rotate")
        div.classList.toggle("hidden-select");
        settingsBtn.classList.toggle("nav-icon-settings-margin")
    })
}