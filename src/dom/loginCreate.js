import { elementCreator, imageCreator } from "../utilities/elementCreator";
import googleLogo from "/src/assets/images/google-logo.png";
import iOutline from "/src/assets/images/i-outline.png";
import {createIcon} from "../utilities/iconCreate";
import '/src/styles/themes.css'
import '/src/styles/login.css'

export function loginCreate(){
    document.body.classList.add("body-login");
    const mainDiv = elementCreator("div", ["class", "login-main-div"], false, document.body);
    setLoginTheme();
    const googleDiv = elementCreator("div", ["class", "login-google-div"], false, mainDiv);
    const logoDiv = elementCreator("div", ["class", "login-google-logo-div"], false,googleDiv);
    imageCreator(googleLogo, ["class", "login-google-img"], logoDiv);
    elementCreator("p", ["class", "login-google-text"], "Sign in with Google", googleDiv);
    
    elementCreator("p", ["class", "login-or"], "OR", mainDiv);
    
    const loginGuestDiv = elementCreator("div", ["class","login-guest-div"], false, mainDiv);
    
    const loginGuest = elementCreator("p", ["class", "login-guest"], "Login as a guest", loginGuestDiv);

    createIcon(loginGuestDiv, "Data saved in local storage.\nLogin with button above to safely store your data.", ["login-i-div","i-img", "i-div"]);

    return [googleDiv,loginGuest];
}



function setLoginTheme(){
    if(localStorage.getItem("theme")!==null){
        const theme = localStorage.getItem("theme");
        document.documentElement.className = theme;
    }

}