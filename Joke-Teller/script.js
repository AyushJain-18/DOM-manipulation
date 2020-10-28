
let iife = (()=>{
  let isBUttonDisabled = false;
  let button          = document.getElementById('button');
  let audioElement    = document.getElementById('audio');
  let jokeTellerImage = document.getElementById('jokeTellerImage');
  
  function convertTextToSpeach(text, lang){
    let speech = new SpeechSynthesisUtterance();

    speech.lang  = lang;
    speech.text  =  text;
    speech.pitch =  1;
    speech.rate  = "0.9";
    // speech.voice
    window.speechSynthesis.speak(speech);
}
// Disable/Enable Button
function toggleButton() {
  isBUttonDisabled = !isBUttonDisabled;
  if(isBUttonDisabled){
    button.classList.add('buttonDisabledStyles');
  } else{
    button.classList.remove('buttonDisabledStyles');
  }
}

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, '%20');
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    // Normally, don't write out API Keys like this, but an exception made here because it's free.
    key: 'e985f868e96c46d9b0789c3855350152',
    src: jokeString,
    hl: 'en-us',
    r: -1,
    c: 'OGG',
    f: '48khz_16bit_mono',
    ssml: false,
  }, audioElement);
}

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
            // Assign One or Two Part Joke
            if (data.setup) {
              joke = `${data.setup} ... ${data.delivery}`;
            } else {
              joke = data.joke;
            }
          // Passing Joke to VoiceRSS API
          tellMe(joke);
          // Disable Button
          toggleButton();
      } catch (error) {
        // Catch Error Here
        console.log(error.message);
    }
}

// Event Listeners
button.addEventListener('click', ()=> {
  if(!isBUttonDisabled){ getJokes()}
});

jokeTellerImage.addEventListener('click', ()=> {
  if(!isBUttonDisabled){ convertTextToSpeach('joke teller मे आपका स्वागत है', "hi-IN")}  
});

audioElement.addEventListener('ended', toggleButton);

})();


    

    
    

