(function(){
    function UIObject(){
        return{
            title           :   'title',
            artist          :   'artist',
            currentTime     :   'current-time',
            duration        :   'duration',
            prev            :   'prev',
            play            :   'play',
            next            :   'next',
            progressBar     :  'progressBar',
            progressContainer: 'progress-container'
        }
    }
    function musicData(){
        return[
            {
                id      :0,
                image   : 'img/image-1.jpg',
                title   :'Electric Chill Machine',
                audio   : 'music/audioSrc1.mp3',
                artist  : 'Lopez'
            },
            {
                id      :1,
                title   :'Electric Grove',
                image   : 'img/image-2.jpg',
                audio   : 'music/audioSrc2.mp3',
                artist  : 'Mario'
            },
            {
                id      :2,
                title   :'Electric Peace',
                image   : 'img/image-3.jpg',
                audio   : 'music/audioSrc3.mp3',
                artist  : 'Senchez'
            },
            {
                id      :3,
                title   :  'Metric',
                image   : 'img/image-4.jpg',
                audio   : 'music/audioSrc4.mp3',
                artist  : 'Bruno Marzs'
            },
        ]
    }
    let title               = document.getElementById(UIObject().title);
    let artist              = document.getElementById(UIObject().artist);
    let currentTime         = document.getElementById(UIObject().currentTime);
    let duration            = document.getElementById(UIObject().duration);
    let progressBar         = document.getElementById(UIObject().progressBar);
    let progressContainer   = document.getElementById(UIObject().progressContainer);
    let prev                = document.getElementById(UIObject().prev);
    let play                = document.getElementById(UIObject().play);
    let next                = document.getElementById(UIObject().next);

    let image       = document.getElementsByTagName('img')[0]; 
    let audio       = document.getElementsByTagName('audio')[0]; 

    let isPlaying = false;
    let totalSongs= musicData().length - 1;
    let currentMusicID;
    let incrementSong='incrementSong';
    let decrementSong='decrementSong';


    function playMusic(){ 
                audio.play();
                isPlaying = true;
                play.classList.replace('fa-play', 'fa-pause');
                play.setAttribute('title', 'pause');
    }
    function pauseMusic(){ 
                 audio.pause();
                 isPlaying = false;
                 play.classList.replace('fa-pause', 'fa-play');
                 play.setAttribute('title', 'play');
    }
    function toogleSong(actionType){
        if(actionType === incrementSong){
            currentMusicID = totalSongs === currentMusicID?  0: ++currentMusicID;
            loadMusic(musicData()[currentMusicID]);
            playMusic();
        }else{
            currentMusicID = currentMusicID===0?  totalSongs: --currentMusicID;
            loadMusic(musicData()[currentMusicID]);
            playMusic()
        }
    }
    function loadMusic(musicObject){
        currentMusicID   = musicObject.id; 
        image.src        = musicObject.image;
        title.innerText  = musicObject.title;
        artist.innerText = musicObject.artist;
        audio.src        = musicObject.audio;
        audio.id         = musicObject.id;
    }
    function updateAudioTrackOnClickOfProgressBar(){
        let positionClickedOnProgressBar  = event.offsetX;
        let totalWidthOfProgressConatiner = this.clientWidth;
        let newCurrentTime                = Math.floor((positionClickedOnProgressBar/totalWidthOfProgressConatiner)*audio.duration);

        let updateProgressBarWidth        = Math.floor((positionClickedOnProgressBar/totalWidthOfProgressConatiner)*100);
        
        progressBar.style.width = `${updateProgressBarWidth}%`;
        audio.currentTime       = newCurrentTime;
        
    }
    function updateProgressTime(){
        progressBar.style.width    = `${(audio.currentTime/audio.duration)*100}%`;
        currentTime.innerText   =  convertToMinute(audio.currentTime);
        duration.innerText      =  convertToMinute(audio.duration);

    }

    function convertToMinute(value){
        if(value || value === 0 ){
            let minute  =  Math.floor(value/60);
            let seconds =  Math.floor(value%60) >10? Math.floor(value%60):'0'+Math.floor(value%60);
            let time = minute+':'+seconds;
            return time ;
        }
        return'2:06'
    }


    // buttons
    play.addEventListener('click',()=> isPlaying?pauseMusic():playMusic())
    next.addEventListener('click',()=>toogleSong(incrementSong));
    prev.addEventListener('click',()=>toogleSong(decrementSong));
    // audio update time
    audio.addEventListener('timeupdate',updateProgressTime);
    audio.addEventListener('ended',()=>toogleSong(incrementSong))
    // progress bar
    progressContainer.addEventListener('click',updateAudioTrackOnClickOfProgressBar)
    // on load event
    window.onload = loadMusic(musicData()[0]);
})();