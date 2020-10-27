const videoElement       =  document.getElementById("video");
const applicationButton  =  document.getElementById("applicationbutton");
const webCambutton       =  document.getElementById("webCambutton");
let isApplicationButtonActive = false;
let isWebNuttonActive = false;
let clickedButton;
let mediaStream;

// prompt window sharing screen and display selected window in our video element
async function  getMediaStreamForApplicaionObj(){
    try{    
            mediaStream = await window.navigator.mediaDevices.getDisplayMedia();
            displayMediaInPIP();
    } catch(error){
        if(error.message !== "Permission denied"){
            alert('error occured', error.message);
            console.log('error is', error);
        }
    }
}

async function getMediaStreamForWebCam(){
    try{
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        displayMediaInPIP();
    } catch(error){
            console.log('error', error.message);
    }
}

function displayMediaInPIP(){
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata =async()=>{
            videoElement.play();
            if(videoElement.readyState === 4){ // if video element is ready
                    videoElement.requestPictureInPicture()
                    .catch(error => {
                            stopSharing(mediaStream);
                            console.log(error);
                            alert('Error occured');
                            location.reload(true);
                    })
            }
    }
}

function endPictureInPictureMode(){
    document.exitPictureInPicture()
}

function stopSharing(mediaStreamObj){
    mediaStreamObj.getTracks().forEach(track => {
            track.stop();
    });
}

function onButtonClick(button){
    if(button.id === 'applicationbutton' && !isWebNuttonActive){
        clickedButton = applicationButton;
            if(button.innerText === 'Display Application feed in Picture-in-Picture mode'){
                isApplicationButtonActive = true;
                webCambutton.classList.add('buttonDisabled')
                webCambutton.classList.remove('button')
                webCambutton.onclick = null;
                getMediaStreamForApplicaionObj();   
            }
            else{
                endPictureInPictureMode();
                isApplicationButtonActive = false;
                webCambutton.classList.remove('buttonDisabled');
                webCambutton.classList.add('button');
            }
    } 
    if(button.id === 'webCambutton' && !isApplicationButtonActive){
        clickedButton = webCambutton;
        if(button.innerText === 'Display Webcam feed in Picture-in-Picture mode'){
                applicationButton.classList.add('buttonDisabled');
                applicationButton.classList.remove('button');
                isWebNuttonActive = true;
                getMediaStreamForWebCam();
        }else{
                endPictureInPictureMode();
                isWebNuttonActive = false;
                isWebNuttonActive = false;
                applicationButton.classList.remove('buttonDisabled');
                applicationButton.classList.add('button');
        }
    }
 
}


// IIFE
(()=>{
    // checking is picture-in-picture is supported 
        if(!('pictureInPictureEnabled' in document)){
                applicationButton.classList.add('buttonDisabled')
                applicationButton.classList.remove('button')
                return;
        }
        // button event listener 
        applicationButton.addEventListener('click',()=>onButtonClick(applicationButton));
        webCambutton.addEventListener('click',()=>onButtonClick(webCambutton));

        // video event listener
        video.addEventListener('enterpictureinpicture', () => {
            clickedButton.innerText = 'End';
          });
        videoElement.addEventListener('leavepictureinpicture', () => {
            let buttonName = clickedButton.id === applicationButton.id ? 'Application' : 'Webcam'
            clickedButton.innerText = `Display ${buttonName} feed in Picture-in-Picture mode`;
            stopSharing(mediaStream);
          });
})();