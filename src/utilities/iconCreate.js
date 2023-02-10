import { elementCreator, imageCreator } from "./elementCreator";
import iOutline from '/src/assets/images/i-outline.png';
export function createIcon(parent, text, classList){
    const iconDiv = elementCreator("div", ["class", classList[0]], false, parent);
    const icon = imageCreator(iOutline, ["class", classList[1]], iconDiv);
    const div = elementCreator("div", ["class", classList[2]], false, icon.parentElement);
    elementCreator("p", false, text, div);
    icon.addEventListener("mouseover", ()=>{
        div.style.opacity = "1";

    })
    icon.addEventListener("mouseleave", ()=>{
        div.style.opacity = "0";
    })
    return iconDiv;
}
