export function hideMenFunc(btn, nav){
    const allNav = document.querySelectorAll("nav *")
    btn.addEventListener("click", hide);


    function hide(e){
        allNav.forEach(elem=>{
            elem.classList.add("hidden-nav-items")
        });
        document.querySelector(".nav-github").style.display="none";
        nav.classList.add("hidden-nav");
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
        e.stopPropagation();
    }








}
