let eachProject = document.querySelectorAll('#eachProject');

function openLinkInNewTab(element){
    if(event.type ===  "keydown"){
        if(event.keyCode === 13){
            window.open(element.innerText, '_blank')
        }
    }
    if(event.type === 'click'){
        window.open(element.innerText, '_blank')
    }
}

function addEventListenerForAllLinks(){
    for(let index=0; index<eachProject.length; index++){
        if(eachProject[index]);
        let eachProjectChildren = eachProject[index].children;
        if(eachProjectChildren){
            let linkElememt = eachProjectChildren[2];
            addListeneres(linkElememt);
        }
    }
}

function addListeneres(element){
    // Event listener click event 
    element.addEventListener('click', ()=>openLinkInNewTab(element));

    // Event listener keydown event 
    element.addEventListener('keydown', ()=>openLinkInNewTab(element));
}

addEventListenerForAllLinks();

