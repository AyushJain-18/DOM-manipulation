const toogleButton = document.querySelector('[type="checkbox"]');
const label        = document.getElementsByTagName('label')[0];
const theme        = document.getElementById('theme');
const numbers      = document.querySelectorAll("[id='num']");
const operators    = document.querySelectorAll("[id='operator']")
const clear        = document.getElementById('clear');
const result       = document.getElementById('result'); 
const dotButton    = document.getElementById('dot');
const screen       = document.getElementById('screen');

let screendata  = 0;
let number1     = 0;
let number2     = 0;
let operator    = '';
// toogle theme 
function toogleTheme(){
    const rootElement = document.documentElement;
    if(toogleButton.checked){
        rootElement.setAttribute('data-theme','dark');
        theme.textContent='Theme 2';
    }else{
        rootElement.setAttribute('data-theme','light');
        theme.textContent='Theme 1';
    } 
}
function isTextConatingAnOperator(text){
    return ( text && (text.includes('+')  || text.includes('-') || text.includes('×') ||text.includes('÷')));
  }
function numberButtonClick(){
    let value  =  event.target.textContent;
    screendata = screendata === 0? value: screendata +value; // replacing 0 with first entered number or else append the number
    number2    =  operator?Number(number2+value) : number2; // if user have entered an operator then new number wiil be added an number 2
    screen.textContent = screendata;              // displaying data to screen 
}

function operatorButtonClick(){
    let value   = event.target.textContent;
    screendata  = screendata.toString();
    //user enter operator first or user changes first enter operator with another operator
    number1     = screendata === 0? 0: operator===''? Number(screendata): number1; 

    // when user enter two operator simultaneously
    if(isTextConatingAnOperator(screendata[screendata.length-1])){
        screendata = screendata.substring(0,screendata.length -1)
    }
    // when user enter multiple operator without calculating result
    if(isTextConatingAnOperator(screendata.substring(0,screendata.length -1))){
        getResult();
    }
    number1            = Number(screendata);
    operator           = value;
    screendata         += value;
    screen.textContent = screendata;
}
function getResult(){
    let num1 = Number(number1);
    let num2 = Number(number2);
    let finalResult = 0;
    switch(operator){
        case '+':
            finalResult = num1 + num2;
            break;
        case '-':
            finalResult = num1 - num2;
            break;
        case '×':
            num2 = num2 === 0? 1 : num2;
            finalResult = num1 * num2;
            break;
        case '÷':
            num2 = num2 === 0? 1 : num2;
            finalResult = num1 / num2;
            break; 
        default:
            finalResult = Number(screendata);
    }
    number1     = Number(finalResult);
    number2     =0;
    operator    =''
    screendata  = finalResult;
    screen.textContent = finalResult;
}
function clearScreen(){
    screendata = 0;
    number1    = 0;
    number2    = 0;
    operator   = '';
    screen.textContent = screendata;
}
function addDot(){
    if(operator && !number2.toString().includes('.')){
        number2 = number2+'.';
        screendata = number1 + operator + number2;
    }
    if(!operator && !screendata.toString().includes('.')){
        screendata = screendata+'.';
    }
    screen.textContent = screendata;  
}
const numbersButtons  = [...numbers];
const operattorButton = [...operators];

toogleButton.addEventListener('change',toogleTheme);
// click event listeners 
clear.addEventListener('click', clearScreen);
result.addEventListener('click', getResult);
dotButton.addEventListener('click', addDot);

numbersButtons.forEach(button => {
    button.addEventListener('click',numberButtonClick);
    button.addEventListener('keydown',()=>{if(event.keyCode === 13){numberButtonClick()}})
});

operattorButton.forEach(button => {
    button.addEventListener('click',operatorButtonClick);
    button.addEventListener('keydown',()=>{if(event.keyCode === 13){operatorButtonClick()}})
});

// key down event listeners
result.addEventListener('keydown',()=>{if(event.keyCode === 13){getResult()}})
clear.addEventListener('keydown',()=>{if(event.keyCode === 13){clearScreen()}})
dotButton.addEventListener('keydown',()=>{if(event.keyCode === 13){addDot()}})
label.addEventListener('keydown',()=>{
        if(event.keyCode === 13){toogleButton.click()}
});