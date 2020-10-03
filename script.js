let projectLink1 = document.getElementById('projectlink1');


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

// Event listener click event 
projectLink1.addEventListener('click', ()=>openLinkInNewTab(projectLink1));

// Event listener keydown event 
projectLink1.addEventListener('keydown', ()=>openLinkInNewTab(projectLink1));