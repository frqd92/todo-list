import { elementCreator, imageCreator } from "../utilities/elementCreator";
import searchPng from '/src/assets/images/search.png'
import bulbPng from '/src/assets/images/bulb.png'
import overviewPng from '/src/assets/images/task-overview.png';
import { bulbFunc } from "../header/lightBulb";
import { createCalIcon } from "./calender";
import addPng from '/src/assets/images/plus.png'
import profilePng from '/src/assets/images/empty-user.png'
import { searchLoupe } from "../header/searchLogic";
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
    window.innerWidth>420?headerOptions():headerOptionsMobile();

    function headerOptions(){
        const headerOptionsDiv = elementCreator("div", ["class", "header-options-div"], false, header);

        const bulbDiv = elementCreator("div", ["class", "bulb-div"], false, headerOptionsDiv);
        elementCreator("div", ["class", "bulb-brightness"], false, bulbDiv);
        imageCreator(bulbPng, ["class", "bulb-img"], bulbDiv);
        bulbFunc(bulbDiv);

        const optionsMiddle = elementCreator("div",["class", "header-options-middle"], false, headerOptionsDiv)
        imageCreator(addPng, ["class", "header-add-btn"], optionsMiddle)
        createCalIcon(optionsMiddle); 
        imageCreator(overviewPng, ["class", "header-overview-btn"], optionsMiddle)

        imageCreator(profilePng, ["class", "header-profile"], headerOptionsDiv)
        

    }
    function headerOptionsMobile(){

    }

    //window.addEventListener("resize", ()=>{window.innerWidth<420?headerOptionsMobile():headerOptions();})


}
