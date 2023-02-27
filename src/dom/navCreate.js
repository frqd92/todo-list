import { elementCreator, imageCreator } from "../utilities/elementCreator";
import githubImg from "/src/assets/images/github.png"
import homePng from '/src/assets/images/home.png';
import groupsPng from '/src/assets/images/layers.png';
import arrowCircle from '/src/assets/images/arrow-circle.png';
import taskExplorerImg from '/src/assets/images/explore.png';
import { hideMenFunc } from "../nav/hideMenu";
import taskPage from "/src/dom/taskPage/taskPageCreate";
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

    const groupsDiv = elementCreator("div", ["class", "nav-item"], false, div);
    const groupsDivBtn = elementCreator("div", ["class", "nav-item"], false, groupsDiv)
    imageCreator(groupsPng, ["class","nav-icon","nav-icon-groups"], groupsDivBtn);
    elementCreator("p", false, "Groups", groupsDivBtn);
    const arrowDropDown = imageCreator(arrowCircle, ["class", "groups-arrow"], groupsDiv);
    const groupsSubDiv = elementCreator("div", ["class", "nav-groups-sub"], false, div);
    const ul = elementCreator("ul", false, false, groupsSubDiv);

    elementCreator("li", ["class", "li-title"], "items", ul);
    elementCreator("li", ["class", "li-title"], "items", ul);
    elementCreator("li", ["class", "li-title"], "items", ul);



    const taskExplorerBtn = elementCreator("div", ["class", "nav-item"], false, div);
    imageCreator(taskExplorerImg, ["class", "nav-icon", "nav-icon-task-explorer"], taskExplorerBtn);
    elementCreator("p", false, "Task Explorer", taskExplorerBtn)
    navSelectMenu(arrowDropDown, groupsSubDiv);
    groupsDiv.addEventListener("click", (e)=>{
        if(!e.target.className.includes("groups-arrow") && isHome){
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

function navSelectMenu(arrowBtn, div){
    arrowBtn.addEventListener("click", ()=>{
        arrowBtn.classList.toggle("arrow-rotate")
        div.classList.toggle("hidden-select");
    })
}