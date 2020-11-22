(()=>{
let menuBar =  document.getElementById('menu-bars');
let nav     = document.getElementById('overlay');
let unoderedList = document.getElementsByTagName('ul'); 

function toogleMenuBar(){
        [...menuBar.children].forEach(bar => {  
                    bar.classList.toggle("change");
            })
            nav.classList.toggle('active');
        };

      
menuBar.addEventListener('click', toogleMenuBar);
menuBar.addEventListener('keydown', (event)=>{if(event.keyCode === 13){toogleMenuBar()}});

[...unoderedList].forEach(listItem =>{
    listItem.addEventListener('click',toogleMenuBar );
})
})();