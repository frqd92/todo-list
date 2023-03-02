import { relocatePickedDivNavMenu } from "../home/homeLogic";
export function hideMenFunc(btn, nav){
    const allNav = document.querySelectorAll("nav *");
    btn.addEventListener("click", hide);

    function hide(e){
        allNav.forEach(elem=>{
            elem.classList.add("hidden-nav-items")
        });
        document.querySelector(".nav-github").style.display="none";
        nav.classList.add("hidden-nav");
        document.body.classList.add("hidden-nav-body");
        relocatePickedDivNavMenu()
        e.stopPropagation();
        document.querySelector(".hidden-nav").addEventListener("click", show);

    }
    function show(e){
        setTimeout(()=>{
            allNav.forEach(elem=>{
                elem.classList.remove("hidden-nav-items")
            });
            document.querySelector(".nav-github").style.display="block";
        }, 100)
        nav.classList.remove("hidden-nav");
        document.body.classList.remove("hidden-nav-body");
        relocatePickedDivNavMenu()
        e.stopPropagation();
    }

    

}

