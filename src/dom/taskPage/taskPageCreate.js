import { elementCreator } from "../../utilities/elementCreator";
import { isHomeFunc } from '../../state';

export default function taskPage(main){
    isHomeFunc(false);
    const mainTaskDiv = elementCreator("div", ["class", "main-task-div"], false, document.querySelector("main"));
    
}