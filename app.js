// DOM ELEMENT SELECTIONS
const toggle = document.querySelector('#toggle')
const buttons = document.querySelectorAll('.button')
const milliValue = document.querySelector('#milliseconds')
const secondsValue = document.querySelector('#seconds')
const minutesValue = document.querySelector('#minutes')
const hourValue = document.querySelector('#hours')
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')
const clearBtn = document.querySelector('#clear')
const lapBtn = document.querySelector('#lap')
const showLapsSaved = document.querySelector('.laps')
const availableLaps = document.querySelector('#available-laps')


let isDark = false
let timer;
let isTimerRunning = false
let milliseconds = 0
let seconds = 0
let minutes = 0
let hours = 0
const saveLaps = [] // Stores all recorded laps


// Format and update displayed stopwatch values
const formatStopwatchValues = () => {    
    const formatMillis = milliseconds < 10 ? `0${milliseconds}`  : milliseconds        
    const formatSeconds = seconds < 10 ? `0${seconds}`  : seconds        
    const formatMinutes = minutes < 10 ? `0${minutes}`  : minutes        
    const formatHours = hours < 10 ? `0${hours}`  : hours
    
    milliValue.innerHTML = formatMillis
    secondsValue.innerHTML = formatSeconds
    minutesValue.innerHTML = formatMinutes
    hourValue.innerHTML = formatHours
}

const startTimer = () => {
    if (isTimerRunning) return
    isTimerRunning = true    

    lapBtn.style.display = 'block'
    stopBtn.style.display = 'block'          
    startBtn.style.display = 'none'
        
    timer = setInterval(() => {
        milliseconds++        
        if(milliseconds === 100){
            milliseconds = 0
            seconds++                        
        }
        if (seconds === 60) {
            seconds = 0
            minutes++                        
        }
        if (minutes === 60) {
            minutes = 0
            hours++                        
        }
        formatStopwatchValues()
    }, 10);
}

// EVENT LISTENERS

// SWITCH TOGGLE (DARK/LIGHT)
toggle.addEventListener('click', () => {    
    isDark = !isDark        
    document.body.style.backgroundColor = isDark ? 'rgb(151, 7, 7)' : 'rgb(211, 35, 35)'     
    toggle.innerHTML = isDark ?  `<img src="./icons/light-svgrepo-com.svg" alt="light-mode-toggle">`:`<img src="./icons/dark-mode-svgrepo-com.svg" alt="dark-mode-toggle">`
    document.body.style.transition = '1.5s ease-in-out'
    
    buttons.forEach((element) => {    
        element.style.backgroundColor = isDark ?  '#F39C12' : '#F39C12'               
    })    
})

// START TIMER
startBtn.addEventListener('click', () => {
    startTimer()    
    clearBtn.style.display = 'none' 
})

// STOP TIMER
stopBtn.addEventListener('click', () => {
    isTimerRunning = false
    startBtn.style.display = 'block'
    stopBtn.style.display = 'none'
    lapBtn.style.display = 'none'  
    clearBtn.style.display = 'block' 
    clearInterval(timer)    
})

// CLEAR TIMER
clearBtn.addEventListener('click', () => {    
    isTimerRunning = false
    milliseconds = 0
    seconds = 0
    minutes = 0
    hours = 0
    showLapsSaved.style.display = 'none'
    lapBtn.style.display = 'none'
    stopBtn.style.display = 'none'
    clearBtn.style.display = 'none' 
    startBtn.style.display = 'block'
    saveLaps.length = 0
    formatStopwatchValues()
    clearInterval(timer)    
})

// ADD LAP TO LIST
lapBtn.addEventListener('click', ()=> {
    availableLaps.innerHTML = '';
    showLapsSaved.style.display = 'block'
    availableLaps.innerHTML = '';
    
    // push current time to the (saveLaps) array when the lap button is clicked
    saveLaps.push(`
        ${hours < 10 ? `0${hours}` : hours}:
        ${minutes < 10 ? `0${minutes}` : minutes}:
        ${seconds < 10 ? `0${seconds}` : seconds}:
        ${milliseconds < 10 ? `0${milliseconds}` : milliseconds}`)    

    saveLaps.forEach((e, i) => {
        const li = document.createElement('li')
        li.innerHTML = `Lap ${i + 1}: ${e}  ms`
        availableLaps.appendChild(li)        
    })
})