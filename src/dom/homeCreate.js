import { elementCreator, imageCreator } from '/src/utilities/elementCreator';
import { isHomeFunc } from '../state';
import '/src/styles/homePage.css';

export default function createHomePage(main){
    isHomeFunc(true);
    main.innerHTML = "";
    elementCreator("p", false, "Home", main);
    dateTimeBox();

}

function dateTimeBox(){


}