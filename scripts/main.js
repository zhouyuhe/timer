class Timer {
    timeElapsed = 0;
    isRunning = false;
    interval = null;
    laps = [];
    
    // the constructor useful to update every update
    constructor(onUpdate) {
        this.onUpdate = onUpdate;
    }
    
    // get every timeElapsed in to this array using 'push'
    lap() {
        this.laps.push(this.timeElapsed);
        console.log(this.laps)
        this.onUpdate();
    }
    
    // reset to what status
    reset() {
        this.timeElapsed = 0;
        // return the current status
        this.laps=[];
        this.onUpdate();
    }

    // interchange start and stop when press the button
    startStop() {
        if (this.isRunning === false) {
            // change the isRunning status
            this.isRunning = true
            this.interval = setInterval(() => {
                this.timeElapsed++
                this.onUpdate()
            }, 10)
        } else {
            // stop status show null interval
            clearInterval(this.interval)
            this.isRunning = false
            this.onUpdate()
        }
    }

    // change the status of the lap and reset
    lapReset() {
        // condition for being the lap status
        if (this.isRunning === true && this.timeElapsed > 0 ) {
            this.lap()
        } else {
            // funtion the reset
            this.reset()
        }
    }
}

let timer;

// adds format display with function (? and : is the if else shortkeys)
const formatWithZero = (unit) => unit < 10 ? '0' + unit : String(unit)

// show time display in the right way
const formatTime = (timeInMiliSeconds) => {
    const mins = Math.floor(timeInMiliSeconds / 6000)
    const sec = Math.floor((timeInMiliSeconds / 100) % 60)
    const milisec = Math.floor(((timeInMiliSeconds) % 100))
    return `${formatWithZero(mins)}:${formatWithZero(sec)}.${formatWithZero(milisec)}`
}

// the id'timer', link the dom to show the text correctly, link it with html
const updateTimeLabel = (time) => document.getElementById('timer').innerHTML = time;

// show the text correctly by condition
const resolveButtonText = (isRunning) => isRunning ? 'Stop' : 'Start'

// link with html
const updateStopStartButton = (text) => document.getElementById('start-stop').innerHTML = text

// show reset button correctly
const resolveResetText = (timeElapsed, isRunning) => isRunning && timeElapsed > 0 ? 'Lap' : 'Reset'

// link to html
const updateResetButton = (text) => document.getElementById('lap-reset').innerHTML = text



// assign what is timer and assign it to onTimerUpdate
timer = new Timer(onTimerUpdate)

// update the laptimer which link with html
const updatelaptime = (laptime) => {

    document.getElementById('lapTimer').innerHTML = laptime;
    // console.log(document.getElementById('lapTimer'))
}

// // update laptime with table
// const updatelaptime = (lapTimes) => {
//     //const element= document.getElementById('lapTimer');
//     const element= document.getElementById('lapTimer');
//     console.log(element)
//     lapTimes.forEach(function(el,i){
//         element.appendChild(
//             document.createTextNode(el + '\n')
//             )
//         })
// }

function onTimerUpdate() {
    // get text link first and then format the time with this timer elapsed
    updateTimeLabel(formatTime(timer.timeElapsed))
    // get text and change the text with cond to the isRunning status
    updateStopStartButton(resolveButtonText(timer.isRunning))
    // get text and change accordingly with the correct condition
    updateResetButton(resolveResetText(timer.timeElapsed, timer.isRunning))
    // 
    
    const lapdiff =  (lap, index) => {
        if (index === 0) {
            return lap;
        }
        return lap - timer.laps[index - 1]
    }

    updatelaptime(timer.laps.map(lapdiff).map(formatTime));

}



// Math.max
// Math.min
// lapTimeCalculation= timer.laps.reduce(formatime(i)-formatTime(i-1))