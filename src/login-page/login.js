import { loginCreate } from "../dom/loginCreate";
import { isSignedIn } from "../state";
import clearBody from "../utilities/clearBody";
import { createMainPage } from "../dom/mainPageCreate";
export function loginPage(){
    const [googleBtn, guestBtn] = loginCreate();
    googleBtn.addEventListener("click", loginGoogle);
    guestBtn.addEventListener("click", loginAsGuest);

}

function loginAsGuest(){
    isSignedIn(false);
    clearBody(document.querySelectorAll("body > *"), "body-login");
    createMainPage();

};

function loginGoogle(){
    isSignedIn(true);
    clearBody(document.querySelectorAll("body > *"), "body-login");
    createMainPage();
};