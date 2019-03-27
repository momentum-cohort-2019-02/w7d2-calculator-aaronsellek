const calculator = {
    displayValue: '0',
    first_operand: null,
    second_operand: false,
    operator: null,
  };
  //created constant "calculator", gave initial value of zero, is waiting for first/second operand and operator keys.
  
  function inputDigit(digit) {
    const { displayValue, second_operand } = calculator;
  //wrote function to input digits.
  //const =the calculator constant when using display value and operand
    if (second_operand === true) {
      calculator.displayValue = digit;
      //display value initially zero
      calculator.second_operand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  
    console.log(calculator);
  }
 
  function handleOperator(nextOperator) 
  //giving operators function
  {
    const { first_operand, displayValue, operator } = calculator
    //adding operator keys and first operand to calc rendering
    const inputValue = parseFloat(displayValue);
  //parsefloat makes it so decimals will be cut off. should cut off after 2 after decimal function is written.
    if (operator && calculator.second_operand) 
    //if operator and the second operand are inputed run next commands
     {
      calculator.operator = nextOperator;
      console.log(calculator);
      return;
    }
  
    if (first_operand == null) 
    //first operand starts at null which means below line should run.
    {
      calculator.first_operand = inputValue; //inputs value as first operand
    } else if (operator) 
    //if operator is inputted first make it show value as zero
    {
      const currentValue = first_operand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  //result is a constant that will show after calculation of operator and inputted value are run
      calculator.displayValue = String(result); //displays value
      calculator.first_operand = result;
    }
  
    calculator.second_operand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  
  const performCalculation = {
    '/': (first_operand, secondOperand) => first_operand / secondOperand,
  
    '*': (first_operand, secondOperand) => first_operand * secondOperand,
  
    '+': (first_operand, secondOperand) => first_operand + secondOperand,
  
    '-': (first_operand, secondOperand) => first_operand - secondOperand,
  
    '=': (first_operand, secondOperand) => secondOperand
  };
  //assigning operators variables in order to run them if inputted
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  } //updating where the numbers will be displayed(want them to display on "screen")
  
  updateDisplay();
  
  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;
    
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
          updateDisplay();
      return;
    }
  
    if (target.classList.contains('AC')) {
      console.log('clear', target.value);
      return;
    }
  
    inputDigit(target.value);
    updateDisplay();
  });