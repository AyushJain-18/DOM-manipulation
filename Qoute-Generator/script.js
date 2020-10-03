// declaring constant here
const qouteText         =   document.getElementById('qoute-text');
const author            =   document.getElementById('author');
const tweetButton       =   document.getElementById('tweet-button');
const qouteContainer    =   document.getElementById('quote-container');
const loader            =   document.getElementById('loader');


// get qoute 
const getQoute = async() => {
    showLoadingSpinner();
    const herokuProxy = 'https://cors-anywhere.herokuapp.com/'
    //const api = 'https://api.forismatic.com/api/1.0/method=getQuote&lang=en&format=json';
    const api = 'https://type.fit/api/quotes'
    try{
        //'https://cors-anywhere.herokuapp.com/'+'https://api.forismatic.com/api/1.0/method=getQuote&lang=en&format=json'
        // herokuProxy+api
        let response =  await fetch(api);
            let data = await response.json();
            let randomNumber = generateRandomNumber();
            endLoadingSpinner();
            return data[randomNumber];
    } catch(error){
        endLoadingSpinner();
        console.log('An error occured', error.message);
        return error.message;
    }
}

function generateRandomNumber(){
    return Math.ceil(Math.random()*1500);
}
async function  loadDataToUI (){
    let quote =  await getQoute();
    if(qouteText){
        qouteText.innerHTML = quote.text;
    }
    if(author){
        author.innerText = quote.author;
    }
};
function shareOnTwitter(){
    let authorText = author.innerText;
    let quoteText  = qouteText.innerText; 

    let url = `https://twitter.com/intent/tweet?text=${quoteText}-${authorText}`;
    window.open(url,'_blank')
}
function showLoadingSpinner(){
    loader.style.display = 'flex'; 
    qouteContainer.style.display = 'none';
}
function endLoadingSpinner(){
    loader.style.display = 'none';
    qouteContainer.style.display = 'flex';
}

// Event listener
tweetButton.addEventListener('click',shareOnTwitter);

loadDataToUI();