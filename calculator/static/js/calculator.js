class Calculator {
    'use strict';

    constructor(previousOperandTextElement, currentOperandTextElement, outputTextElement) {
        this.outputTextElement = outputTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            if (operation === '-') {
                this.currentOperand = operation;
                return
            } else {
                return
            }
        }
        if (this.currentOperand === '-') {
            return
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation = undefined
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = this.previousOperand;
        }
    }

    updateHistory() {
        this.outputTextElement.innerText += this.previousOperandTextElement.innerText + " " + this.currentOperandTextElement.innerText + "\n"
    }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const outputTextElement = document.querySelector('[data-history-output]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, outputTextElement);

function myFunction() {
  var x = document.getElementsByClassName("history-output");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        // calculator.updateHistory();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateHistory();
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})


window.addEventListener('keydown', (num) => {
    //decimal
    if (num.code == 'NumpadDecimal' || num.code == 'Period') {
        calculator.appendNumber('.');
        calculator.updateDisplay();
    }
    //operations
    if (num.code == 'NumpadAdd') {
        calculator.chooseOperation('+');
        calculator.updateDisplay();
    }
    if (num.code == 'NumpadSubtract' || num.code == 'Minus') {
        calculator.chooseOperation('-');
        calculator.updateDisplay();
    }
    if (num.code == 'NumpadMultiply') {
        calculator.chooseOperation('*');
        calculator.updateDisplay();
    }
    if (num.code == 'NumpadDivide' || num.code == 'Slash') {
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    }
    //equals
    if (num.code == 'NumpadEnter' || num.code == 'Equal') {
        calculator.compute();
        calculator.updateDisplay();
    }
    //delete
    if (num.code == 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
    //numbers using numpad and regular digits
    else {
        let digit = num.code.match(/\d/g);
        calculator.appendNumber(digit);
        calculator.updateDisplay();
    }
})




