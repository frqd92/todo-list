import { loginCreate } from "../dom/loginCreate";
import { isSignedIn } from "../state";
import clearBody from "../utilities/clearBody";
import { createMainPage } from "../dom/mainPageCreate";
import { firebaseAuthen } from "./authen";
export function loginPage(){
    const [googleBtn, guestBtn] = loginCreate();
    googleBtn.addEventListener("click", loginGoogle);
    guestBtn.addEventListener("click", loginAsGuest);

}

function loginAsGuest(){
    createMain(false)
};

function loginGoogle(){
    firebaseAuthen();
}


export function createMain(isSigned){
    isSignedIn(isSigned);
    clearBody(document.querySelectorAll("body > *"), "body-login");
    createMainPage();
}
