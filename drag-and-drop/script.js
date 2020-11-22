(()=>{// all ID variables 
const boardsId = ['backlogContainer', 'progressContainer','completeContainer','onHoldContainer'];
const saveButtonId        = 'save';
const addButtonId         = 'add' ; 
const closeContainerBtnId = 'close-content-box';
const backlogCtnId        = 'backlogContainer';
const progressCtnId       = 'progressContainer';
const completeCtnId       = 'completeContainer';
const onHoldgCtnId        = 'onHoldContainer';
const newTextContainerId  =  'newTextContainer';
const newTextId           = 'newText';

// variables 
let allBacklogItems  = [];
let allProgressItems = [];
let allCompleteItems = [];
let allHoldItems     = [];

let dragableElement = '';
// DOM elements 
let allSaveButtons          = document.querySelectorAll(`[id^=${saveButtonId}]`);
let allAddButtons           = document.querySelectorAll(`[id^=${addButtonId}]`);
let allCloseContentButton   = document.querySelectorAll(`[id^=${closeContainerBtnId}]`);
let backlogcontainer        = document.getElementById(backlogCtnId);
let progressContainer       = document.getElementById(progressCtnId);
let completeContainer       = document.getElementById(completeCtnId);
let onHoldContainer         = document.getElementById(onHoldgCtnId);


allSaveButtons          =  [...allSaveButtons] ;
allAddButtons           =  [...allAddButtons]  ;
allCloseContentButton  =   [...allCloseContentButton];



// local storage function 
function loadDataToLocalStorage(){
    allBacklogItems  = [...backlogcontainer.children] .map(backlogItem => backlogItem.textContent);
    allProgressItems = [...progressContainer.children].map(backlogItem => backlogItem.textContent);
    allCompleteItems = [...completeContainer.children].map(backlogItem => backlogItem.textContent);
    allHoldItems     = [...onHoldContainer.children]  .map(backlogItem => backlogItem.textContent);

    localStorage.setItem('backlogItems' ,JSON.stringify(allBacklogItems));
    localStorage.setItem('progressItems',JSON.stringify(allProgressItems));
    localStorage.setItem('completeItems',JSON.stringify(allCompleteItems));
    localStorage.setItem('onHoldItems'  ,JSON.stringify(allHoldItems));
}
function getDataFromLocalStorage(){
    if (localStorage.getItem('backlogItems')) {
    allBacklogItems  = JSON.parse(localStorage.getItem('backlogItems'));
    allProgressItems = JSON.parse(localStorage.getItem('progressItems'));
    allCompleteItems = JSON.parse(localStorage.getItem('completeItems')) ;
    allHoldItems     = JSON.parse(localStorage.getItem('onHoldItems'));
}else {
        allBacklogItems  = ['Release the course', 'Sit back and relax'];
        allProgressItems = ['Work on projects', 'Listen to music'];
        allCompleteItems = ['Being cool', 'Getting stuff done'];
        allHoldItems     = ['Being uncool'];
    }
}

// button functions
function saveBtnBgStyles(saveButton,index){
    saveButton.style.visibility         = 'hidden';
    saveButton.style.justifyContent     ='center';
    saveButton.classList.add(`bg-color${index}`)
}
function onAddButtonClick(addButton,index){
    let newTextContainer = document.getElementById(`${newTextContainerId}${index}`);
    let saveButton       = document.getElementById(`${saveButtonId}${index}`);

    addButton.style.visibility     = 'hidden';
    newTextContainer.style.display = 'block';
    saveButton.style.visibility    = 'visible';
}
function closeContentBoxAndShowAddButton(index){
    let newTextContainer = document.getElementById(`${newTextContainerId}${index}`);
    let newTextValue     = document.getElementById(`${newTextId}${index}`);
    let saveButton       = document.getElementById(`${saveButtonId}${index}`);
    let addButton        = document.getElementById(`${addButtonId}${index}`); 

    newTextContainer.style.display  = 'none';
    saveButton.style.visibility     = 'hidden';
    addButton.style.visibility      = 'visible'; 
    newTextValue.textContent        = ''
}
function removeItemFromList(){
    let listId    = (event.target.id).slice(12);
    let itemId    = `board-item-${listId}`;
    let boardItem = document.getElementById(itemId);
    boardItem.remove();

    loadDataToLocalStorage();
}
function onSaveButtonClick(index){
    let boardId         = boardsId[index-1];
    let newTextValue    = document.getElementById(`${newTextId}${index}`).textContent;
    let boardItemsCount = document.getElementById(boardId).childElementCount; 
    closeContentBoxAndShowAddButton(index);
    createListItems(boardId,newTextValue,boardItemsCount+1);
    loadDataToLocalStorage();
}
  
// create list with DOM
function createListItems(boardId, textValue, listIndex){
    let item      = document.createElement('div');
    let icon      =  document.createElement('i');
    let board     = document.getElementById(boardId);
   
    item.textContent = textValue;

    item.setAttribute('class','board-item');
    item.setAttribute('draggable',"true");
    item.setAttribute('id',`board-item-${boardId}-${listIndex}`);
    // item.setAttribute('ondragstart','onDragStart(event)');
    item.addEventListener('dragstart',()=>onDragStart(event))

    icon.setAttribute('class', 'fa fa-times');
    icon.setAttribute('aria-hidden','true' );
    icon.setAttribute('id',`remove-item-${boardId}-${listIndex}`);
    icon.setAttribute('title','remove-item');
    icon.addEventListener('click',removeItemFromList)

    item.appendChild(icon);
    board.appendChild(item);
    
}

// load UI  from local storageData
function loadUIBasedOnLocalStorageData(){
    getDataFromLocalStorage();
    allBacklogItems.forEach((backlogItem,index)   => createListItems(boardsId[0], backlogItem,index+1));
    allProgressItems.forEach((progressItem,index) => createListItems(boardsId[1], progressItem,index+1));
    allCompleteItems.forEach((completeItem,index) => createListItems(boardsId[2], completeItem,index+1));
    allHoldItems.forEach((holdItem,index) => createListItems(boardsId[3], holdItem,index+1));
}


// Drag Functions
function onDragStart()  {   dragableElement = event.target;}
function onDragOver()   {   event.preventDefault();}
function onDragEnter()  {   event.target.classList.add('board-ondragHover')}
function onDragLeave()  {   event.target.classList.remove('board-ondragHover')}
function onDrop(){   
    if(!event.target.classList.contains('board-item')){
            event.target.appendChild(dragableElement);
            event.target.classList.remove('board-ondragHover');
            loadDataToLocalStorage();
        }
   }

function addDragFunctionsToDragContainer(containerElement){
    // containerElement.setAttribute('ondragover',  'onDragOver()');
    // containerElement.setAttribute('ondragenter', 'onDragEnter()');
    // containerElement.setAttribute('ondragleave', 'onDragLeave()');
    // containerElement.setAttribute('ondrop'     , 'onDrop()');

    containerElement.addEventListener('dragover', ()=> onDragOver());
    containerElement.addEventListener('dragenter',()=> onDragEnter());
    containerElement.addEventListener('dragleave',()=> onDragLeave());
    containerElement.addEventListener('drop',     ()=> onDrop());
}
// event listeners 
// 1. for save buttons 
allSaveButtons.forEach((saveButton,index) =>{
                        saveBtnBgStyles(saveButton,index+1);
                        saveButton.addEventListener('click',()=>onSaveButtonClick(index+1))
});
// for close butoon on content ediatable text
allCloseContentButton.forEach((closeButton,index)=>closeButton.addEventListener('click',()=>closeContentBoxAndShowAddButton(index+1)))
// for add buttons
allAddButtons.forEach((addButton,index) =>addButton.addEventListener('click', ()=>onAddButtonClick(addButton,index+1)));

addDragFunctionsToDragContainer(backlogcontainer);
addDragFunctionsToDragContainer(progressContainer);
addDragFunctionsToDragContainer(completeContainer);
addDragFunctionsToDragContainer(onHoldContainer);

loadUIBasedOnLocalStorageData();
})();