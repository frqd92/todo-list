export function hideMenFunc(btn, nav){
    const allNav = document.querySelectorAll("nav *")
    btn.addEventListener("click", hide);


    function hide(e){
        allNav.forEach(elem=>{
            elem.classList.add("hidden-nav-items")
        });
        nav.classList.add("hidden-nav");
        e.stopPropagation();

        document.querySelector(".hidden-nav").addEventListener("click", show);
    }


    function show(e){
        allNav.forEach(elem=>{
            elem.classList.remove("hidden-nav-items")
        });
        nav.classList.remove("hidden-nav");
        e.stopPropagation();
    }








}
