/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    $('input[type="submit"]').click(function(e) {
        validateForm();
        if (validateForm() == true) {
            outputResult(computePort());
        }
    });
});

function validateForm() {
    var x = document.forms["myForm"]["first-word"].value;
    var y = document.forms["myForm"]["second-word"].value;
    var letters = /^[A-Za-z]+$/
    if (x == null || x == "" || y == null || y == "") {
        alert("We need two words to create a portmanteau!");
        return false;
    }
    else if ((!letters.test(x)) || (!letters.test(y))) {
        alert("Invalid character(s). Try again!");
        return false;
    }
    else if ((y.indexOf(' ') > 0) || (x.indexOf(' ') > 0)) {
        alert("No spaces please!");
        return false;
    }
    return true;
}

//brad angelina

function computePort() {
    var port = "";
    var x = document.forms["myForm"]["first-word"].value;
    var y = document.forms["myForm"]["second-word"].value;
    x = x.toLowerCase();
    y = y.toLowerCase();
    var difference = x.length + y.length; //the space between the vowel in x and y
    for ( var i = 0; i < y.length; i++ ) {
        if (isVowel(y.charAt(i)) == true) { //isVowel returns a boolean saying if a character is a vowel
            //if y.charAt(i) is a vowel:
            var closestX = findClosestX(y.charAt(i), x); //returns index of y-vowel closest to the end of x, or -1 if it isn't in x
            if (closestX > -1) {
            //if y.charAt(i) is also in x:
                if ((x.length-closestX + i) < difference) {
                    difference = x.length-closestX + i;
                    port = x.substring(0, closestX) + y.substring(i, y.length);
                    port = port.charAt(0).toUpperCase() + port.slice(1);
                    }
                }
            }
        }
    if (port.length == 0) {
        port = x + y;
        port = port.charAt(0).toUpperCase() + port.slice(1);
    }
    return port;
}

function isVowel(c) { //returns a boolean saying if the character is a vowel
    return "AEIOUaeiou".indexOf(c) != -1;
}

function findClosestX(y_vowel, x) { //returns index of y-vowel cloest to the end of x, or -1 if it isn't in x
    var closestX = x.length;
    if (x.indexOf( y_vowel ) == -1) {
        return -1;
    } else {
        for ( var j = 0; j < x.length; j++ ) {
        if (x.charAt(j) == y_vowel) {
            if (x.length - j < closestX) {
                closestX = j;
            }
            }
        }
    }
    return closestX;
}
    //start at the beginning of y, and search through it for vowels
    //at every vowel, search for that vowel in x, starting at the end of x and moving towards x's beginning
    //store those vowels as objects: {vowel, vowel index in x, index in y, distance between the two vowels}
    //of the objects stored, pick the one with the least difference between the two vowels and splice the words together accordingly 

function outputResult(port) {
    alert("Your portmanteau is... " + port + "!");
    $("#output").append("<p>" + port + "</p>");
}

/*function toggle_visibility(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}
   /*$("#output").append("<p>" + portmanteau + "</p>")*/



    
 //$('.section').css('min-height', $(window).innerHeight());
//$('.section_text').css('padding-top', $(window).innerHeight() / 2);
//});

//$('input[type="text"]').click(function(e) {
//			alert("Thank you for subscribing. You should receive an email confirmation shortly.");
      //  }
//    });
//$('input[type="text"]').keyup(function(e) {
//		if (e.which === 13) {
//			alert("Thank you for subscribing. You should receive an email confirmation shortly.");
//        }
//    });
//$(window).resize(function () {
    //$('.section').css('min-height', $(window).innerHeight());
    //$('.section').css('padding-top', $(window).innerHeight() / 2);
//});
    