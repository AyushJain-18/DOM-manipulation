//1. modular design pattern

var HTMLChanger = (function() {
    var contents = 'contents'

    var changeHTML = function() {
            console.log('content is been modified')
    }

    return {
    callChangeHTML: function() {
        changeHTML();
        console.log(contents); //created content closure 
    }
    };

})();

HTMLChanger.callChangeHTML();       // Outputs: 'contents'
console.log(HTMLChanger.contents);  // undefined


// 2. Revelig module design pattern

var Exposer = (function() {
    var privateVariable = 10;

    var privateMethod = function() {
    console.log('Inside a private method!');
    privateVariable++;
    }

    var methodToExpose = function() {
    console.log('This is a method I want to expose!');
    }

    var otherMethodIWantToExpose = function() {
    privateMethod();
    }

    return {
        first: methodToExpose,
        second: otherMethodIWantToExpose
    };
})();

Exposer.first();        // Output: This is a method I want to expose!
Exposer.second();       // Output: Inside a private method!
Exposer.methodToExpose; // undefined