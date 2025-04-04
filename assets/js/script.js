// Get references to the elements in the HTML
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// Timer variables
let totalSeconds = 5; 
let timerInterval = null; 
let isRunning = false;

// Initialize the display
updateDisplay();

// Event listeners to update the display whenever the user changes input
[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('input', function() {
        validateInput(this);
        updateDisplayFromInputs();
    });
});

// Start, stop, and reset buttons functionality
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Function to make sure the input values are within valid ranges
function validateInput(input) {
    const value = parseInt(input.value) || 0; 
    if (input.id === 'hours') {
        input.value = Math.max(0, Math.min(23, value)); 
    } else {
        input.value = Math.max(0, Math.min(59, value)); 
    }
}

// Update totalSeconds based on the input values
function updateDisplayFromInputs() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    updateDisplay();
}

// Update the display with the current totalSeconds value
function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start the timer
function startTimer() {
    if (isRunning) return; 
    
    // If the timer is at 0, set it based on input values
    if (totalSeconds === 0) {
        updateDisplayFromInputs();
        if (totalSeconds === 0) return; 
    }
    
    isRunning = true;
    startBtn.disabled = true; 
    stopBtn.disabled = false;
    
    // Decrease totalSeconds by 1 every second
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval); 
            isRunning = false;
            alert("Timer finished!");
            startBtn.disabled = false; 
            stopBtn.disabled = true; 
            return;
        }
        
        totalSeconds--; // Decrease time by 1 second
        updateDisplay(); // Update the display
    }, 1000);
}

// Stop the timer
function stopTimer() {
    if (!isRunning) return; 
    clearInterval(timerInterval); 
    isRunning = false; 
    startBtn.disabled = false; 
    stopBtn.disabled = true; 
}

// Reset the timer to the initial input values
function resetTimer() {
    stopTimer(); 
    updateDisplayFromInputs(); 
}
