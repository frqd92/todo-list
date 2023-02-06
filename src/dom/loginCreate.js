import { elementCreator, imageCreator } from "../utilities/elementCreator";
import googleLogo from "/src/assets/images/google-logo.png";
import iOutline from "/src/assets/images/i-outline.png";
import '/src/styles/login.css'

export function loginCreate(){
    document.body.classList.add("body-login")
    const mainDiv = elementCreator("div", ["class", "login-main-div"], false, document.body);

    const googleDiv = elementCreator("div", ["class", "login-google-div"], false, mainDiv);
    const logoDiv = elementCreator("div", ["class", "login-google-logo-div"], false,googleDiv);
    imageCreator(googleLogo, ["class", "login-google-img"], logoDiv);
    elementCreator("p", ["class", "login-google-text"], "Sign in with Google", googleDiv);
    
    elementCreator("p", ["class", "login-or"], "OR", mainDiv);
    
    const loginGuestDiv = elementCreator("div", ["class","login-guest-div"], false, mainDiv);
    
    const loginGuest = elementCreator("p", ["class", "login-guest"], "Login as a guest", loginGuestDiv);
    const iconDiv = elementCreator("div", ["class", "login-i-div"], false, loginGuestDiv);
    const icon = imageCreator(iOutline, ["class", "login-i-img"], iconDiv);
    iconFunctionality(icon);

    document.body.appendChild(mainDiv);
    return [googleDiv,loginGuest];
}

function iconFunctionality(icon){
    const div = elementCreator("div", ["class", "i-div"], false, icon.parentElement);
    elementCreator("p", false, "Data saved in local storage.\nLogin with button above to safely store your data.", div);
    icon.addEventListener("mouseover", ()=>{
        div.style.opacity = "1";

    })
    icon.addEventListener("mouseleave", ()=>{
        div.style.opacity = "0";
    })
}