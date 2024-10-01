document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('calc-display');      // Result display
    const equationDisplay = document.getElementById('calc-equation'); // Full equation display
    let currentInput = '';
    let fullEquation = '';  // Store the full equation
    
    // Add event listeners to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button.textContent));
    });

    // Handle button clicks
    function handleButtonClick(buttonValue) {
        if (isDigit(buttonValue) || buttonValue === '.') {
            handleDigit(buttonValue);
        } else if (isOperator(buttonValue)) {
            handleOperator(buttonValue);
        } else if (buttonValue === 'C') {
            clearDisplay();
        } else if (buttonValue === '=') {
            calculateResult();
        } else if (buttonValue === '√') {
            handleSquareRoot();
        } else if (buttonValue === '%') {
            handlePercentage();
        }
    }

    // Check if the input is a digit
    function isDigit(value) {
        return /\d/.test(value);
    }

    // Check if the input is an operator
    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    // Handle digits and decimal point
    function handleDigit(digit) {
        currentInput += digit;
        fullEquation += digit;  // Append digit to full equation
        updateDisplay(currentInput, fullEquation);
    }

    // Handle operator inputs
    function handleOperator(op) {
        if (currentInput === '' && op !== '-') return; // Ignore operators if no input (except minus for negative numbers)
        if (currentInput === '' && fullEquation !== '') {
            fullEquation = fullEquation.slice(0, -1);  // Replace last operator if no number entered
        }

        fullEquation += ` ${op} `;
        currentInput = '';  // Reset current input
        updateDisplay(currentInput, fullEquation);
    }

    // Update display with the current input and equation
    function updateDisplay(value, equation) {
        display.value = value || '0';  // Show 0 if current input is empty
        equationDisplay.textContent = equation;  // Show full equation
    }

    // Clear the display
    function clearDisplay() {
        currentInput = '';
        fullEquation = '';
        updateDisplay('0', '');
    }

    // Perform calculation and update the result
    function calculateResult() {
        try {
            const sanitizedEquation = fullEquation.replace('√', 'Math.sqrt'); // Handle square root
            let result = eval(sanitizedEquation);  // Evaluate the full equation
            result = result === Infinity ? 'Error' : result;  // Handle division by zero

            currentInput = result.toString();
            updateDisplay(currentInput, fullEquation + ' = ' + currentInput);
            fullEquation = '';  // Clear the equation after showing the result
        } catch (e) {
            updateDisplay('Error', '');
        }
    }

    // create a funtion to Handle square root operation
    function handleSquareRoot() {
        if (currentInput === '') return;
        fullEquation += ` √(${currentInput}) `;
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay(currentInput, fullEquation);
    }

    // function to Handle percentage operation
    function handlePercentage() {
    if (currentInput === '') return; // If no input, do nothing

    // Convert the current input into percentage by dividing it by 100
    let percentageValue = (parseFloat(currentInput) / 100).toString();

    // Append the percentage value to the full equation and currentInput
    fullEquation += `(${currentInput}%)`;  // Show percentage symbol in equation for clarity
    currentInput = percentageValue;  // Set the new percentage value to current input

    updateDisplay(currentInput, fullEquation);
    
    
});
