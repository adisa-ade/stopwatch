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
let isRunning = false
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
    if (isRunning) return
    isRunning = true    
    
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
toggle.addEventListener('click', () => {    
    isDark = !isDark    
    document.body.style.backgroundColor = isDark ? '#F9F9F9' : '#1E1E1E'
    document.body.style.color = isDark ? '#111827' : '#F9FAFB'            
    toggle.innerHTML = isDark ? `<img src="./icons/light-svgrepo-com.svg" alt="">` : `<img src="./icons/dark-mode-svgrepo-com.svg" alt="dark-mode-svgrepo-com" srcset="">`
    document.body.style.transition = '1.5s ease-in-out'
    
    buttons.forEach((element) => {    
        element.style.backgroundColor = isDark ?  '#F39C12' : '#F39C12'        
        element.style.color = isDark ? "#2C2C2C" : "#F5F5F5" 
        
    })    
})

startBtn.addEventListener('click', () => {
    startTimer()    
    clearBtn.style.display = 'none' 
})

stopBtn.addEventListener('click', () => {
    isRunning = false
    startBtn.style.display = 'block'
    stopBtn.style.display = 'none'
    lapBtn.style.display = 'none'  
    clearBtn.style.display = 'block' 
    clearInterval(timer)    
})

clearBtn.addEventListener('click', () => {    
    isRunning = false
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

lapBtn.addEventListener('click', ()=> {
    availableLaps.innerHTML = '';
    showLapsSaved.style.display = 'block'
    availableLaps.innerHTML = '';
    saveLaps.push(`
        ${hours < 10 ? `0${hours}` : hours}:
        ${minutes < 10 ? `0${minutes}` : minutes}:
        ${seconds < 10 ? `0${seconds}` : seconds}:
        ${milliseconds < 10 ? `0${milliseconds}` : milliseconds}`)    
    saveLaps.forEach((e, i) => {
        const li = document.createElement('li')
        li.innerHTML = `Lap ${i + 1}: ${e}s`
        availableLaps.appendChild(li)        
    })
})