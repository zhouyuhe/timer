class Timer {
    timeElapsed = 0;
    isRunning = false;
    interval = null;
    laps = [];

    constructor(onUpdate) {
        this.onUpdate = onUpdate;
    }

    lap() {
        this.laps.push(this.timeElapsed);
        console.log(this.laps)
        this.onUpdate();
    }

    reset() {
        this.timeElapsed = 0;
        this.laps=[];
        this.onUpdate();
    }

    startStop() {
        if (this.isRunning === false) {
            this.isRunning = true
            this.interval = setInterval(() => {
                this.timeElapsed++
                this.onUpdate()
            }, 10)
        } else {
            clearInterval(this.interval)
            this.isRunning = false
            this.onUpdate()
        }
    }

    lapReset() {
        if (this.isRunning === true && this.timeElapsed > 0) {
            this.lap()
        } else {
            this.reset()
        }
    }
}

let timer;

// adds a leading zero for the stopwatch display

const formatWithZero = (unit) => unit < 10 ? '0' + unit : String(unit)

const formatTime = (timeInMiliSeconds) => {
    const mins = Math.floor(timeInMiliSeconds / 6000)
    const sec = Math.floor((timeInMiliSeconds / 100) % 60)
    const milisec = Math.floor(((timeInMiliSeconds) % 100))

    return `${formatWithZero(mins)}:${formatWithZero(sec)}.${formatWithZero(milisec)}`
}

const updateTimeLabel = (time) => document.getElementById('timer').innerHTML = time;

const updatelaptime = (laptime) => {
    document.getElementById('lapTimer').innerHTML = laptime;
    const element= document.getElementById('lapTimer')[0];
    const changeItVertically = timer.laps.forEach(function(el,i){
        element.appendChild(
            document.createTextNode(el + '\n')
            )
        })
}

const resolveButtonText = (isRunning) => isRunning ? 'Stop' : 'Start'

const updateStopStartButton = (text) => document.getElementById('start-stop').innerHTML = text

const resolveResetText = (timeElapsed, isRunning) => isRunning && timeElapsed > 0 ? 'Lap' : 'Reset'

const updateResetButton = (text) => document.getElementById('lap-reset').innerHTML = text



timer = new Timer(onTimerUpdate)

function onTimerUpdate() {
    updateTimeLabel(formatTime(timer.timeElapsed))
    updateStopStartButton(resolveButtonText(timer.isRunning))
    updateResetButton(resolveResetText(timer.timeElapsed, timer.isRunning))
    updatelaptime(timer.laps.map(formatTime));
}


// var arr = ["John", "Smith", "Paul", "Doe"];
// var elem = document.getElementsByTagName("pre")[0];
// arr.forEach(function(el, i) {
//   elem.appendChild(
//     document.createTextNode(el + "\n")
//   )
// })