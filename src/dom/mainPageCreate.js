import { elementCreator, imageCreator } from "../utilities/elementCreator";
import githubImg from "/src/assets/images/github.png"
import homePng from '/src/assets/images/home.png';
import tasksPng from '/src/assets/images/tasks.png';
import arrowCircle from '/src/assets/images/arrow-circle.png';
import gearPng from '/src/assets/images/gear.png';
import { loggedIn } from "../state";



import '/src/styles/nav.css'
import '/src/styles/mobile/nav-mobile.css'
export function createMainPage(){
   createNav();
}

function createNav(){
    const nav = elementCreator("nav", false, false, document.body);
    const title = elementCreator("h1", ["class", "nav-title"], "Todoer", nav);
    const navItems = elementCreator("div", ["class", "nav-items"], false, nav);
    makeNavItems(navItems);
    const gitLogo = imageCreator(githubImg,["class", "nav-github"], nav);
    const hideNavBtn = elementCreator("p", ["class", "nav-hide-btn"],"Hide Menu", nav);
}

function makeNavItems(div){
    const homeDivBtn = elementCreator("div", ["class", "nav-item"], false, div);
    const homeIcon = imageCreator(homePng, ["class", "nav-icon", "nav-icon-home"], homeDivBtn);
    const homeText = elementCreator("p", false, "Home", homeDivBtn);

    const tasksDiv = elementCreator("div", ["class", "nav-item"], false, div);
    const tasksDivBtn = elementCreator("div", ["class", "nav-item"], false, tasksDiv)
    const tasksIcon = imageCreator(tasksPng, ["class","nav-icon","nav-icon-tasks"], tasksDivBtn);
    const tasksText = elementCreator("p", false, "Tasks", tasksDivBtn);
    const arrowDropDown = imageCreator(arrowCircle, ["class", "tasks-arrow"], tasksDiv);
    const tasksSubDiv = elementCreator("div", ["class", "nav-tasks-sub"], false, div);
    const ul = elementCreator("ul", false, false, tasksSubDiv);

    elementCreator("li", false, "farts", ul);
    elementCreator("li", false, "farts", ul);
    elementCreator("li", false, "farts", ul);
    elementCreator("li", false, "farts", ul);
    elementCreator("li", false, "farts", ul);
    elementCreator("li", false, "farts", ul);
    const settingsDivBtn = elementCreator("div", ["class", "nav-item"], false, div);
    const settingsIcon = imageCreator(gearPng, ["class", "nav-icon", "nav-icon-settings"], settingsDivBtn);
    const settingsText = elementCreator("p", false, "Settings", settingsDivBtn)
    navSelectMenu(arrowDropDown, tasksSubDiv,settingsDivBtn );
}

const makeTasks=()=>{


}

function navSelectMenu(arrowBtn, div, settingsBtn){
    arrowBtn.addEventListener("click", ()=>{
        arrowBtn.classList.toggle("arrow-rotate")
        div.classList.toggle("hidden-select");
        settingsBtn.classList.toggle("nav-icon-settings-margin")
    })
}