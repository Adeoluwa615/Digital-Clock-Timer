// Get references to the elements in the HTML
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// Timer variables
let totalSeconds = 5; // Initial timer time (5 seconds)
let timerInterval = null; // To store the timer interval
let isRunning = false; // Flag to track if the timer is running

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
    const value = parseInt(input.value) || 0; // Default to 0 if input is not a number
    if (input.id === 'hours') {
        input.value = Math.max(0, Math.min(23, value)); // Hours should be between 0 and 23
    } else {
        input.value = Math.max(0, Math.min(59, value)); // Minutes and seconds should be between 0 and 59
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
    if (isRunning) return; // Don't start the timer if it's already running
    
    // If the timer is at 0, set it based on input values
    if (totalSeconds === 0) {
        updateDisplayFromInputs();
        if (totalSeconds === 0) return; // Don't start if it's still 0
    }
    
    isRunning = true;
    startBtn.disabled = true; // Disable the start button
    stopBtn.disabled = false; // Enable the stop button
    
    // Decrease totalSeconds by 1 every second
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval); // Stop the timer when it reaches 0
            isRunning = false;
            alert("Timer finished!");
            startBtn.disabled = false; // Enable the start button again
            stopBtn.disabled = true; // Disable the stop button
            return;
        }
        
        totalSeconds--; // Decrease time by 1 second
        updateDisplay(); // Update the display
    }, 1000);
}

// Stop the timer
function stopTimer() {
    if (!isRunning) return; // Don't stop if the timer isn't running
    clearInterval(timerInterval); // Stop the interval
    isRunning = false; // Update the state
    startBtn.disabled = false; // Enable the start button
    stopBtn.disabled = true; // Disable the stop button
}

// Reset the timer to the initial input values
function resetTimer() {
    stopTimer(); // Stop the timer if it's running
    updateDisplayFromInputs(); // Reset the display to input values
}
