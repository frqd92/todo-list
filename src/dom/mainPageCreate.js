import createNav from "./navCreate";
import createHeader from "./headerCreate";
import createHomePage from "./homeCreate";
import { elementCreator } from "../utilities/elementCreator";
import { testShit } from "../state";
export function createMainPage(){
   document.body.classList.remove("body-login");
   const main = elementCreator("main", false, false, document.body);
   createNav(main);
   createHeader();
   createHomePage(main);
testShit()
}

