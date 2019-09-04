//comment

class Timer {
    constructor(onUpdate) {
        this.timeElapsed = 0
        this.isRunning = false
        this.interval = null
        this.onUpdate = onUpdate
        this.startTimer = () => {
            this.isRunning = true
            this.interval = setInterval(() => {
                this.timeElapsed++
                this.onUpdate()
            }, 10)
        }

        this.stopTimer = () => {
            clearInterval(this.interval)
            this.isRunning = false
            this.onUpdate()
        }
    }

    startStop() {
        if (this.isRunning === false) {
            this.startTimer()
        } else {
            this.stopTimer()
        }
    }
}

let timer;

const formatTime = (timeInMiliSeconds) => {
    return timeInMiliSeconds / 100
}

const updateTimeLabel = (time) => document.getElementById('timer').innerHTML = time;
 
const resolveButtonText = (isRunning) => isRunning ? 'Stop' : 'Start'

const updateStopStartButton = (text) => document.getElementById('start-stop').innerHTML = text

const resolveResetText = (timeElapsed, isRunning) => isRunning && timeElapsed > 0 ? 'Lap' : 'Reset'

const updateResetButton = (text) => document.getElementById('lap-reset').innerHTML = text

function onTimerUpdate() {
    updateTimeLabel(formatTime(timer.timeElapsed))
    updateStopStartButton(resolveButtonText(timer.isRunning))
    updateResetButton(resolveResetText(timer.timeElapsed, timer.isRunning))
}

timer = new Timer(onTimerUpdate)
