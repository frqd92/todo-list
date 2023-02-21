import { isHomeFunc } from '../state';
import '/src/styles/homePage.css';

export default function createHomePage(main){
    isHomeFunc(true);
    main.innerHTML = "";


}

