import { elementCreator, imageCreator } from "../utilities/elementCreator";
import searchPng from '/src/assets/images/search.png'
import bulbPng from '/src/assets/images/bulb.png'
import overviewPng from '/src/assets/images/task-overview.png';
import { bulbFunc } from "../header/lightBulb";
import { createCalIcon } from "./calender";
import addPng from '/src/assets/images/plus.png';
import profilePng from '/src/assets/images/empty-user.png';
import menuPng from '/src/assets/images/menu-line.png';
import { searchLoupe, importBehaviour, inputBehaviour } from "../header/searchLogic";
import githubPng from '/src/assets/images/github.png'
import { menuButtonFunc } from "../header/menuBtnMobile";
import { makeModal } from "./modal";
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
    inputBehaviour(input)
    const headerOptionsDiv = elementCreator("div", false, false, header);
    window.innerWidth>650?headerOptions():headerOptionsMobile();

    window.addEventListener("resize", ()=>{
        window.innerWidth>650?headerOptions():headerOptionsMobile();
    
    })



    function headerOptions(){
        headerOptionsDiv.classList.remove("header-options-div-small");
        if(document.querySelector(".header-options-div")===null){
            headerOptionsDiv.innerHTML="";
            headerOptionsDiv.classList.add("header-options-div");
            const optionsMiddle = elementCreator("div",["class", "header-options-middle"], false, headerOptionsDiv)
            const addBtn = imageCreator(addPng, ["class", "header-add-btn"], optionsMiddle)
            const calBtn = createCalIcon(optionsMiddle); 
            const overviewBtn = imageCreator(overviewPng, ["class", "header-overview-btn"], optionsMiddle);
            imageCreator(profilePng, ["class", "header-profile"], headerOptionsDiv);
            createBulb(headerOptionsDiv);
            makeModal([addBtn, calBtn, overviewBtn]);

        }
    }

    function headerOptionsMobile(){
        headerOptionsDiv.classList.remove("header-options-div");
        if(document.querySelector(".header-options-div-small")===null){
            headerOptionsDiv.innerHTML="";
            headerOptionsDiv.classList.add("header-options-div-small");
            createBulb(headerOptionsDiv);
            const menuBtn = imageCreator(menuPng, ["class", "menu-icon"], headerOptionsDiv);
            const menuDiv = elementCreator("div", ["class", "mobile-menu-div"], false, headerOptionsDiv);
            imageCreator(profilePng, ["class", "header-profile-mobile"], menuDiv);
            const optionsMiddle = elementCreator("div",["class", "header-options-middle-mobile"], false, menuDiv)
            const addBtn = imageCreator(addPng, ["class", "header-add-btn-mobile"], optionsMiddle)
            createCalIcon(optionsMiddle); 
            imageCreator(overviewPng, ["class", "header-overview-btn-mobile"], optionsMiddle);
            imageCreator(githubPng, ["class", "github-mobile"], menuDiv);
            menuButtonFunc(menuBtn, menuDiv);
        }
    }


}

function createBulb(div){
    const bulbDiv = elementCreator("div", ["class", "bulb-div"], false, div);
    elementCreator("div", ["class", "bulb-brightness"], false, bulbDiv);
    imageCreator(bulbPng, ["class", "bulb-img"], bulbDiv);
    bulbFunc(bulbDiv);
    return bulbDiv;
}
