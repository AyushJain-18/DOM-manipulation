(()=>{
let themeToogleButtonContainer = document.querySelector('div[class = "theme-switch-wrapper"]');
let headerContainer = document.getElementById('header-container');
let toogleIcon      = document.querySelector('span[id="toogle-icon"]');
let toogleButton    = document.querySelector('input[type="checkbox"]');
let nav             = document.getElementsByTagName('nav')[0];



let image1 = document.getElementById('image1');
let image2 = document.getElementById('image2');
let image3 = document.getElementById('image3');
let textBox= document.getElementById('text-box');


toogleButton.addEventListener('change',(event)=> switchTheme(event));
loadThemeBasedOnUserLastSelectedValue();
window.onscroll =()=>{
    headerContainer.style.opacity='1';
    if (document.body.scrollTop > 180 || document.documentElement.scrollTop > 180) {
            headerContainer.style.opacity='0.2'
    }
}

function loadThemeBasedOnUserLastSelectedValue(){
   let themeValue =  localStorage.getItem('theme');
   if(themeValue === 'dark'){
       toogleButton.click();
   }
}

function switchTheme(event){
   let isDarkModeSelected =  event.target.checked;
   let rootElement        = document.documentElement;

   if(isDarkModeSelected){
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme','dark');
        darkMode();
   } else{
       rootElement.removeAttribute('data-theme');
       localStorage.setItem('theme','light');
       lightMode();
   }
}

function darkMode(){
    nav.style.backgroundColor = 'rgb(0 0 0/50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255/70%)';

    toogleIcon.children[0].innerText = 'Dark Mode';
    toogleIcon.children[1].classList.remove('fa-sun');
    toogleIcon.children[1].classList.add('fa-moon');

    image1.src = 'img/undraw_proud_coder_dark.svg'
    image2.src = 'img/undraw_feeling_proud_dark.svg'
    image3.src = 'img/undraw_conceptual_idea_dark.svg'

}

function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255/50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';

    toogleIcon.children[0].innerText = 'Light Mode';
    toogleIcon.children[1].classList.remove('fa-moon');
    toogleIcon.children[1].classList.add('fa-sun');

    image1.src = 'img/undraw_proud_coder_light.svg'
    image2.src = 'img/undraw_feeling_proud_light.svg'
    image3.src = 'img/undraw_conceptual_idea_light.svg'
}
})();