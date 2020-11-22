let projectData =[
    {
        sno          : 1,
        projectName  : 'Bookmark',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/bookMark/'
    },
    {
        sno          : 2,
        projectName  : 'CountDown',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/custom-countdown/'
    },
    {
        sno          : 3,
        projectName  : 'Ligh Dark Theme',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/Light-Dark-Mode/'
    },
    {
        sno          : 4,
        projectName  : 'Music player',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/music-player/'
    },
    {
        sno          : 5,
        projectName  : 'Video Player',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/video-player/'
    },
    {
        sno          : 6,
        projectName  : 'Infinite Scroll',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/Infinite-Scroll/'
    },
    {
        sno          : 7,
        projectName  : 'Qoute Generator',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/Qoute-Generator/'
    },
    {
        sno          : 8,
        projectName  : 'Joke Teller',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/Joke-Teller/'
    },
    {
        sno          : 9,
        projectName  : 'Picture in Picture',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/Picture-in-Picture/'
    },
    {
        sno          : 10,
        projectName  : 'Navigation \n Hamburger',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/navigation-hamburger/'
    },
    {
        sno          : 11,
        projectName  : 'Calculator',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/Calculator/'
    },
    {
        sno          : 12,
        projectName  : 'To-do list',
        projectLink  : 'https://ayushjain-18.github.io/DOM-manipulation/drag-and-drop/'
    },
    {
        sno          : 12,
        projectName  : 'Youtube downloader',
        projectLink  : 'https://youtubedownloader18.herokuapp.com/'
    },
]

let eachProject         = document.querySelectorAll('#eachProject');
let projectContainer    = document.getElementById('carouselContainer');
let previousButton      = document.getElementById('previousButton'); 
let nextButton          = document.getElementById('nextButton');
let totalNumberOfSlides = Math.ceil(projectData.length/5);
let currentSlideNumber  = 1;
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

function addListeneres(element){
    // Event listener click event 
    element.addEventListener('click', ()=>openLinkInNewTab(element));

    // Event listener keydown event 
    element.addEventListener('keydown', ()=>openLinkInNewTab(element));
}

function createEachProjectDiv(projectData){
    // parrent div
    let projectElement =  document.createElement('div');
    projectElement.id = 'eachProject';
    projectElement.classList.add('eachProject');

    // 1st children div for sno
    let sno =  document.createElement('div');
    sno.classList.add('sno');
    sno.innerText = projectData.sno;


    // 2nd children div for projectName
    let projectName =  document.createElement('div');
    projectName.classList.add('projectName')
    projectName.innerText = projectData.projectName;

    //3rd children div for project link
    let projectlink =  document.createElement('div');
    projectlink.classList.add("projectLink");
    projectlink.tabIndex  = 0;
    projectlink.innerText = projectData.projectLink; 
    addListeneres(projectlink);

    // adding children to parrent element
    projectElement.appendChild(sno);
    projectElement.appendChild(projectName);
    projectElement.appendChild(projectlink);
    return projectElement;
}

function createProjectContainer(){
    let projectsNode = [];
    for(let index =0; index< projectData.length; index++){
        projectsNode.push(createEachProjectDiv(projectData[index]));
    }
    for(let index =0; index< projectsNode.length; index=index+5){
            // create projectData Conatoiner containing 3 projects elements 
            let projectDataConatiner = document.createElement('div');
            // projectDataConatiner -> properties
            projectDataConatiner.id =  index === 0?`projectDataConatiner${index}`:`projectDataConatiner${index/5}`
            projectDataConatiner.classList.add('fade','projectDataConatiner');            
            projectDataConatiner.style.display = index === 0? 'block': 'none';

                        // adding element 1
            projectDataConatiner.appendChild(projectsNode[index])
            
            if(projectsNode[index+1]){
                          // adding element 2
                projectDataConatiner.appendChild(projectsNode[index+1])
            }
            if(projectsNode[index+2]){
                          // adding element 3
                projectDataConatiner.appendChild(projectsNode[index+2])
            }
            if(projectsNode[index+3]){
                        // adding element 4
                projectDataConatiner.appendChild(projectsNode[index+3])
            }
            if(projectsNode[index+4]){
                        // adding element 5
                projectDataConatiner.appendChild(projectsNode[index+4])
            }
            // adding projectContainer to carousel-container
            projectContainer.appendChild(projectDataConatiner); 
    }
}


function onNextButtonClick(){
  let currentProjectContainerNumber = currentSlideNumber-1;
  let currentProjectContainer       = document.getElementById(`projectDataConatiner${currentProjectContainerNumber}`);
    // if next slide available    
  if(currentSlideNumber < totalNumberOfSlides){
    let nextProjectContainer        = document.getElementById(`projectDataConatiner${currentProjectContainerNumber+1}`);
    nextProjectContainer.style.display = 'block';
    currentProjectContainer.style.display = 'none';
    projectContainer.scrollBy(1000,0);
    ++currentSlideNumber;
  }
    // hiding next button   
    if(currentSlideNumber === totalNumberOfSlides){
        nextButton.style.visibility = 'hidden'
    }
    if(currentSlideNumber !== 1){
        previousButton.style.visibility ='visible'
    }
}
function onPreviousButtonClick(){
    let currentProjectContainerNumber = currentSlideNumber-1;
    let currentProjectContainer       = document.getElementById(`projectDataConatiner${currentProjectContainerNumber}`);
    if(currentProjectContainerNumber>0){
        let previousProjectContainer  = document.getElementById(`projectDataConatiner${currentProjectContainerNumber-1}`);

        previousProjectContainer.style.display = 'block';
        currentProjectContainer.style.display = 'none';
        --currentSlideNumber;

            // hiding prev button   
            if(currentSlideNumber === 1){
                previousButton.style.visibility   = 'hidden'; 
            }
            if(currentSlideNumber != totalNumberOfSlides){
                nextButton.style.visibility = 'visible'
            }
    }
  


}

// click listeners
nextButton.addEventListener('click', onNextButtonClick);
previousButton.addEventListener('click', onPreviousButtonClick);

// enter listeners
nextButton.addEventListener    ('keydown',(event)=>{if(event.keyCode === 13){onNextButtonClick()}});
previousButton.addEventListener('keydown',(event)=>{if(event.keyCode === 13){onPreviousButtonClick()}});
previousButton.style.visibility ='hidden'

createProjectContainer();



// function addEventListenerForAllLinks(){
//     for(let index=0; index<eachProject.length; index++){
//         if(eachProject[index]);
//         let eachProjectChildren = eachProject[index].children;
//         if(eachProjectChildren){
//             let linkElememt = eachProjectChildren[2];
//             addListeneres(linkElememt);
//         }
//     }
// }
// addEventListenerForAllLinks();

