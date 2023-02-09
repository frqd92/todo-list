import { loggedIn, savedTheme, themeFunc  } from "../state";
import '/src/styles/themes.css';
let bulbState = "light-theme";

export function bulbFunc(bulb){
    const [brightness, img] = bulb.children;

    if(loggedIn){} //firebase logic
    if(!loggedIn){ 
        if(localStorage.getItem('theme')===null){
            setTheme("light-theme");
        }
        else{
            const theme = localStorage.getItem('theme');
            setTheme(theme)
        }
    }

    bulb.addEventListener("click",()=>{
        //add firebase later
        if(localStorage.getItem('theme')==="dark-theme"){
            setTheme("light-theme");
        }
        else{
            setTheme("dark-theme");
        }
    })

    function setTheme(theme){
        if(theme==="dark-theme"){
            brightness.style.opacity="1";
            img.classList.add("bulb-on");
        }
        else if(theme==="light-theme"){
            brightness.style.opacity="0";
            img.classList.remove("bulb-on")
        }
        themeFunc(theme);
        if(!loggedIn){
            localStorage.setItem('theme', theme); //add later for firebase
        }
        document.documentElement.className = theme;
    }

};


