import { turnBulb, isBulb } from "../state";

export function bulbFunc(bulb){
    const [brightness, img] = bulb.children;
    bulb.addEventListener("click", ()=>{
        if(isBulb){
            turnBulb(false);
            brightness.style.opacity="0";
            img.classList.remove("bulb-on")
        }
        else{
            turnBulb(true);
            brightness.style.opacity="1";
            img.classList.add("bulb-on")
        }
    })
};