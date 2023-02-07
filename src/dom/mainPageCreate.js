import { elementCreator, imageCreator } from "../utilities/elementCreator";
import githubImg from "/src/assets/images/github.png"
import homePng from '/src/assets/images/home.png';
import tasksPng from '/src/assets/images/tasks.png';
import arrowCircle from '/src/assets/images/arrow-circle.png';
import gearPng from '/src/assets/images/gear.png';
import { loggedIn } from "../state";
import { hideMenFunc } from "../nav/hideMenu";
import searchPng from '/src/assets/images/search.png'
import bulbPng from '/src/assets/images/bulb.png'
import overviewPng from '/src/assets/images/task-overview.png';
import { bulbFunc } from "../header/lightBulb";
import { createCalIcon } from "./calender";
import addPng from '/src/assets/images/plus.png'
import profilePng from '/src/assets/images/empty-user.png'
import '/src/styles/nav.css'
import '/src/styles/mobile/nav-mobile.css'
import '/src/styles/header.css'
import '/src/styles/mobile/header-mobile.css'
import '/src/styles/calender.css'

export function createMainPage(){
   createNav();
   createHeader();


}

//--------------------------------------------------header------------------------------------------------------

function createHeader(){
    const header = elementCreator("header", false, false, document.body);

    const searchDiv = elementCreator("div", ["class", "searchbar-div"], false, header);
    const searchImg = imageCreator(searchPng, ["class", "header-search-img"], searchDiv);
    const input = elementCreator("input", ["id", "header-input"], false, searchDiv);
    window.innerWidth>420?headerOptions():headerOptionsMobile();

    function headerOptions(){
        const headerOptionsDiv = elementCreator("div", ["class", "header-options-div"], false, header);
        const bulbDiv = elementCreator("div", ["class", "bulb-div"], false, headerOptionsDiv);

        const bulbBrightness = elementCreator("div", ["class", "bulb-brightness"], false, bulbDiv);
        const bulb = imageCreator(bulbPng, ["class", "bulb-img"], bulbDiv);
        bulbFunc(bulbDiv);

        const optionsMiddle = elementCreator("div",["class", "header-options-middle"], false, headerOptionsDiv)
        const addBtn = imageCreator(addPng, ["class", "header-add-btn"], optionsMiddle)
        const calenderBtn = createCalIcon(optionsMiddle); 
        const tastOverviewBtn = imageCreator(overviewPng, ["class", "header-overview-btn"], optionsMiddle)

        const profileImg = imageCreator(profilePng, ["class", "header-profile"], headerOptionsDiv)

    }
    function headerOptionsMobile(){

    }

    //window.addEventListener("resize", ()=>{window.innerWidth<420?headerOptionsMobile():headerOptions();})


}



//----------------------------------------------------nav--------------------------------------------------------
function createNav(){
    const nav = elementCreator("nav", false, false, document.body);
    const title = elementCreator("h1", ["class", "nav-title"], "Todoer", nav);
    const navItems = elementCreator("div", ["class", "nav-items"], false, nav);
    makeNavItems(navItems);
    const gitLogo = imageCreator(githubImg,["class", "nav-github"], nav);
    const hideNavBtn = elementCreator("p", ["class", "nav-hide-btn"],"Hide Menu", nav);
    hideMenFunc(hideNavBtn, nav);
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

    elementCreator("li", false, "items", ul);
    elementCreator("li", false, "items", ul);
    elementCreator("li", false, "items", ul);

    const settingsDivBtn = elementCreator("div", ["class", "nav-item"], false, div);
    const settingsIcon = imageCreator(gearPng, ["class", "nav-icon", "nav-icon-settings"], settingsDivBtn);
    const settingsText = elementCreator("p", false, "Settings", settingsDivBtn)
    navSelectMenu(arrowDropDown, tasksSubDiv,settingsDivBtn );
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