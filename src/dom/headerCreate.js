import { elementCreator, imageCreator } from "../utilities/elementCreator";
import searchPng from '/src/assets/images/search.png'
import bulbPng from '/src/assets/images/bulb.png'
import overviewPng from '/src/assets/images/task-overview.png';
import { bulbFunc } from "../header/lightBulb";
import { createCalIcon } from "./calender";
import addPng from '/src/assets/images/plus.png';
import profilePng from '/src/assets/images/empty-user.png';
import menuPng from '/src/assets/images/menu-line.png';
import { searchLoupe } from "../header/searchLogic";
import githubPng from '/src/assets/images/github.png'
import { menuButtonFunc } from "../header/menuBtnMobile";
import { loggedIn } from "../state";
import '/src/styles/header.css'
import '/src/styles/mobile/header-mobile.css'
import '/src/styles/calender.css'


export default function createHeader(){
    const header = elementCreator("header", false, false, document.body);

    const searchDiv = elementCreator("div", ["class", "searchbar-div"], false, header);

    const loupeImg= imageCreator(searchPng, ["class", "header-search-img"], searchDiv);
    const input = elementCreator("input", ["id", "header-input"], false, searchDiv);
    searchLoupe(loupeImg, input);

    const headerOptionsDiv = elementCreator("div", false, false, header);
    window.innerWidth>1000?headerOptions():headerOptionsMobile();

    window.addEventListener("resize", ()=>{
        window.innerWidth>650?headerOptions():headerOptionsMobile();
    
    })



    function headerOptions(){
        headerOptionsDiv.classList.remove("header-options-div-small");
        if(document.querySelector(".header-options-div")===null){
            headerOptionsDiv.innerHTML="";
            headerOptionsDiv.classList.add("header-options-div");
            const optionsMiddle = elementCreator("div",["class", "header-options-middle"], false, headerOptionsDiv)
            imageCreator(addPng, ["class", "header-add-btn"], optionsMiddle)
            createCalIcon(optionsMiddle); 
            imageCreator(overviewPng, ["class", "header-overview-btn"], optionsMiddle);
            const bulb = createBulb(headerOptionsDiv);
            imageCreator(profilePng, ["class", "header-profile"], headerOptionsDiv)
        }
    }

    function headerOptionsMobile(){
        headerOptionsDiv.classList.remove("header-options-div");
        if(document.querySelector(".header-options-div-small")===null){
            headerOptionsDiv.innerHTML="";
            headerOptionsDiv.classList.add("header-options-div-small");
            const bulb = createBulb(headerOptionsDiv);
            const menuBtn = imageCreator(menuPng, ["class", "menu-icon"], headerOptionsDiv);
            const menuDiv = elementCreator("div", ["class", "mobile-menu-div"], false, headerOptionsDiv);
            imageCreator(profilePng, ["class", "header-profile-mobile"], menuDiv);
            const optionsMiddle = elementCreator("div",["class", "header-options-middle-mobile"], false, menuDiv)
            imageCreator(addPng, ["class", "header-add-btn-mobile"], optionsMiddle)
            createCalIcon(optionsMiddle); 
            imageCreator(overviewPng, ["class", "header-overview-btn-mobile"], optionsMiddle);
            imageCreator(githubPng, ["class", "github-mobile"], menuDiv);
            menuButtonFunc(menuBtn, menuDiv);
        }
    }


    //window.addEventListener("resize", ()=>{window.innerWidth<420?headerOptionsMobile():headerOptions();})


}

function createBulb(div){
    const bulbDiv = elementCreator("div", ["class", "bulb-div"], false, div);
    elementCreator("div", ["class", "bulb-brightness"], false, bulbDiv);
    imageCreator(bulbPng, ["class", "bulb-img"], bulbDiv);
    bulbFunc(bulbDiv);
    return bulbDiv;
}