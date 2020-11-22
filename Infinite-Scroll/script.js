(()=>{
const imageContainer = document.getElementById('imageContainer');
const dataContainer = document.getElementById('dataContainer');
const allPhotos = [];
let numberOfImagesLoaded = 0;
let totalImages = 0;
let isAllImagesLoaded = false;
let ispageLoadForOnce = false;


//  helper functions
function openImageInNewTab(imageSrc){
   if(event.type === 'click') {
    window.open(imageSrc, '_blank');
   }

   if(event.type === 'keydown' && event.keyCode === 13){
    window.open(imageSrc, '_blank');
   }
}
function createDivElement(id, className){
  let element           =   document.createElement('div');
      element.className = className;
      element.id        = id;
      return element
       
}
function createImageElement(imageObject){
   let imageElement =  document.createElement('img');
    // we can set below propert with set attribute as well    
   imageElement.className = 'image';
   imageElement.src =  imageObject.largeSrc;
   imageElement.alt =  imageObject.discription;
   imageElement.id  =  imageObject.id;
   imageElement.title = imageObject.discription;
   imageElement.addEventListener('click',()=>openImageInNewTab(imageObject.linkSrc));
   imageElement.setAttribute('tabindex',0);
   imageElement.addEventListener('keydown', ()=>openImageInNewTab(imageObject.linkSrc))
   imageElement.addEventListener('load', ()=>{
        if(numberOfImagesLoaded === totalImages-1){
            isAllImagesLoaded = true;
        }   
    numberOfImagesLoaded++;
})
   return imageElement;
}

// loader functions 

function showLoader(){
    imageContainer.style.display = 'flex';
    if(!ispageLoadForOnce){
        dataContainer.style.display  =  'none'; 
    }
}
function hideLoader(){
    imageContainer.style.display = 'none';
    dataContainer.style.display  =  'flex'; 
    // imageContainer.hidden = true;
}


async function getPhotoFromUnsplash(){
    showLoader();
    let count    =  ispageLoadForOnce?30: 6;
    let apikey   =  'S2DA48cD6oeXZW_2UY5w7I4KZNuw3ezmi-ODHH9wOaQ';
    let domain   =  'https://api.unsplash.com/photos/random';
    let finalUrl =  `${domain}?client_id=${apikey}&count=${count}&orientation=portrait&fit=crop&min-h=500`;
    try{
        let response =   await fetch(finalUrl);
        let data     =   await response.json();
        await data.map(eachPhotoObject => mapFetchedPhoto(eachPhotoObject));
        setTimeout( hideLoader, 3000);
        renderPhoto();
        
    } catch(error){
        console.log('error occured', error.message);
        setTimeout( hideLoader, 3000);
    }
    
}

function mapFetchedPhoto(image){
    const imageObj = { 
        discription : image.alt_description,
        linkSrc     : image.links.html,
        largeSrc    : image.urls.regular,
        mediumSrc   : image.urls.small,
        smallSrc    : image.urls.thumb,
        id          : image.id 
    };
    allPhotos.push(imageObj);
}

function renderPhoto(){
    totalImages = allPhotos.length;
    numberOfImagesLoaded = 0;
    ispageLoadForOnce = true;
    for(let index = 0; index< allPhotos.length; index=index+2){
        // creating div elements 
        let imageRow            =  createDivElement(`imageRow${index}`       ,"imageRowContainer");
        let firstImageCnt       =  createDivElement(`firstImageCnt${index}`  ,  'image1Comtainer' );
        let secondImageCnt      =  createDivElement(`secondImageCnt${index}` ,  'image2Comtainer' );


        // creating image Element 
        let image1         = createImageElement(allPhotos[index]);
        let image2         = createImageElement(allPhotos[index+1]);


        // adding image element to respective conatiner
        firstImageCnt.appendChild(image1);
        secondImageCnt.appendChild(image2);
    
        // adding image container to row
        imageRow.appendChild(firstImageCnt);
        imageRow.appendChild(secondImageCnt);
        // adding row to div 
        dataContainer.appendChild(imageRow);
    }
}

// scroll event listener
    // windw.innerHeight --> total height of our window
    // window.scrollY --> total height scrolled by user
    //document.body.offsetHeight --> total height of our body which 

    
    window.addEventListener('scroll', ()=>{
        if (window.innerHeight + window.scrollY >= dataContainer.offsetHeight-1000 && isAllImagesLoaded){
            isAllImagesLoaded = false;
            getPhotoFromUnsplash();
        }
     })




getPhotoFromUnsplash();
})();