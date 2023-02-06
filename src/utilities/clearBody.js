export default function clearBody(elements, nameClass){
    elements.forEach(elem=>{
        elem.remove();
    })
    document.body.classList.remove(nameClass);
}