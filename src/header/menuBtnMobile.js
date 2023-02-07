export function menuButtonFunc(btn, div){
   btn.addEventListener("click", ()=>{
    if(document.querySelector(".mobile-menu-div-show")===null){
        div.classList.add("mobile-menu-div-show");
        setTimeout(()=>{div.style.display = "flex";}, 100);
    }
    else{
        hide(div);

    }
   });
   window.addEventListener("click", (e)=>{
    if((e.target!==btn && div !== e.target) && !div.contains(e.target) ){
        hide(div);
    }
   });

   function hide(div){
        div.classList.remove("mobile-menu-div-show");
        setTimeout(()=>{div.style.display = "none";}, 100);
   }


}
