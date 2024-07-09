const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const toggleDarkMode = document.getElementById('toggle-dark-mode');

let displayValue = '0';
let firstValue = null;
let secondValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.textContent = displayValue;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            displayValue = '0';
            firstValue = null;
            secondValue = null;
            operator = null;
            waitingForSecondValue = false;
        } else if (value === '=') {
            if (firstValue !== null && operator !== null && !waitingForSecondValue) {
                secondValue = parseFloat(displayValue);
                displayValue = String(operate(firstValue, secondValue, operator));
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (firstValue === null) {
                firstValue = parseFloat(displayValue);
            } else if (!waitingForSecondValue) {
                secondValue = parseFloat(displayValue);
                displayValue = String(operate(firstValue, secondValue, operator));
                firstValue = parseFloat(displayValue);
            }
            operator = value;
            waitingForSecondValue = true;
        } else {
            if (waitingForSecondValue) {
                displayValue = value;
                waitingForSecondValue = false;
            } else {
                displayValue = displayValue === '0' ? value : displayValue + value;
            }
        }
        updateDisplay();
    });
});

function operate(first, second, operator) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;
    return second;
}

toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

updateDisplay();
