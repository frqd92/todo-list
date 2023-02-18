export function elementCreator(type, selector,text, parent, isPrepend){
    const element = document.createElement(type);
    if(selector){
        if(selector[0]==="class"){
            for(let i=1;i<selector.length;i++)
            element.classList.add(selector[i])
        }
        else if(selector[0]==="id"){
            element.id=selector[1];
        }
    }
    if(text){
        if(type==="input"){
            element.value = text;
        }
        else{
            element.innerText = text;

        }
    }
    !isPrepend?parent.appendChild(element):parent.prepend(element);

    return element;
}

export function imageCreator(source, selector, parent){
    const img = document.createElement("img");
    img.src = source;
    if(selector){
        if(selector[0]==="class"){
            for(let i=1;i<selector.length;i++)
            img.classList.add(selector[i])
        }
        else if(selector[0]==="id"){
            img.id=selector[1];
        }
    }
    parent.appendChild(img)
    return img;
}