import createNav from "./navCreate";
import createHeader from "./headerCreate";
import createHomePage from "/src/dom/homePage/homeCreate";
import { elementCreator, imageCreator } from "../utilities/elementCreator";
import { testShit } from "../state";
import { updateDataLocal, loggedIn, taskArray} from '../state';
import { readUserGroups, readUserTasks } from "../rtDatabase";
import '/src/styles/homePage.css'
import arrow from '/src/assets/images/arrow-empty.png';




export function createMainPage(){
   document.body.classList.remove("body-login");
   const main = elementCreator("main", false, false, document.body);
   createNav(main);
   createHeader();
   createHomePage(main);
   testShit()

   //move this after
   if(loggedIn){
      readUserTasks();
      readUserGroups();
   }
   else{
      updateDataLocal();
      emptyDOM(); //if logged in, emptyDOM is called from rtDatabase.js/readUserTasks
   }

}

export function emptyDOM(){
   if(taskArray.length<1){
      const options = document.querySelector(".header-options-middle");

      const noTasksDiv = elementCreator("div", ["class","no-tasks-div"], false, options);
      elementCreator("p", ["class","no-task-text"], "Click on add button to create a new task", noTasksDiv);
      imageCreator(arrow, ["class", "empty-arrow"], noTasksDiv);
      document.querySelector(".header-add-btn").addEventListener("click", ()=>{
         noTasksDiv.remove();
      }, {once:true});
   }

}