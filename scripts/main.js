//comment

let milisec = 0;
let timerStatus = 'start';

function timer() {
    milisec++;
    document.getElementById('timer').innerHTML = milisec;
}

window.setInterval(timer, 1)

function startStop(){

    if (timerStatus==='start'){

        document.getElementById("start-stop").innerHTML="stop";
        document.getElementById('lap-reset').innerHTML='lap';
        timerStatus='stop';
    }
    else{
        document.getElementById('start-stop').innerHTML='start';
        document.getElementById('lap-reset').innerHTML='reset';
        timerStatus='start';
    }
    
}

var intervalID = window.setInterval(myCallback, 500, 'Parameter 1', 'Parameter 2');

function myCallback(a, b)
{
 // Your code here
 // Parameters are purely optional.
 console.log(a);
 console.log(b);
}