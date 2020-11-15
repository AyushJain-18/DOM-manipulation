// o(n2)
let array = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];
let newArray = [];
let itemIterayed = []; 
sortedArray.forEach(ele => {
 if(!(itemIterayed.includes(ele))) {
       console.log('element is', ele);
              let firstIndex = sortedArray.indexOf(ele);
              let lastIndex  = sortedArray.lastIndexOf(ele);
              let subArray = [];
                  itemIterayed.push(ele);
                  for(let i = firstIndex; i<= lastIndex; i++){
                              subArray.push(ele);
                      }
                  newArray.push(subArray);
  }
      
});
console.log(newArray);


// o()n
let array = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];
let sortedArray = array.sort((a,b)=> a-b);
let itemsCount = {}
let resultedArray = []

sortedArray.forEach(ele => {
    let firstIndex = sortedArray.indexOf(ele);
    let lastIndex  = sortedArray.lastIndexOf(ele);
    itemsCount[`${ele}`] = (lastIndex- firstIndex)+1
});


Object.entries(itemsCount).forEach(ele =>{
    let subArray = [];
    for(let i =0; i<ele[1]; i++){
        subArray.push(ele[0])
    }
    resultedArray.push(subArray)
})


// sol2 

let intermediateObj={};
let resultedArray = []
let sol2 = (array, target)=>{
            array.forEach(ele => {
                intermediateObj[`${ele}`] = Math.abs(ele-target)
            })
            Object.entries(intermediateObj).forEach(ele =>{
                if(array.includes(ele[1]) && !resultedArray.includes(ele[1]) ){
                   ele[0] == ele[1]? resultedArray.push(Number(ele[0])):resultedArray.push(Number(ele[0]),Number(ele[1]))
                } 
            })
        
}
sol2([0,1,2,3],4)
console.log(resultedArray)

