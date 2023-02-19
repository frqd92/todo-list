import { isHomeFunc } from '../state';
import { updateDataLocal,updateDataServer, loggedIn} from '../state';
import '/src/styles/homePage.css';

export default function createHomePage(main){
    isHomeFunc(true);
    main.innerHTML = "";
    loggedIn?updateDataServer():updateDataLocal();

}

