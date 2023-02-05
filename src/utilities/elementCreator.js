export function elementCreator(type, selector,text, parent){
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
        element.innerText = text;
    }
    parent.appendChild(element);
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