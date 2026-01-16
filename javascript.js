function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
  return a / b;
};

// create variable for num1, num 2, operator

let num1;
let num2;
let op;

function operator(op, n1, n2){
    switch (op){
        case '+':
            add(n1, n2)
            break
        case '-':
            subtract(n1, n2)
            break
        case '*':
            multiply(n1, n2)
            break
        case '/':
            divide(n1, n2)
            break
    }
}

// create calculator layout 
    // 1 div on top for display
    // 1 div on bottom for buttons
    // wrap 4 x 4 buttons 

const container = document.querySelector('.container');

const display = document.createElement('div');
display.classList.add('display');

const buttonArea = document.createElement('div');
buttonArea.classList.add('buttonArea');

container.appendChild(display);
container.appendChild(buttonArea);

const buttons = [
  "7", "8", "9", "÷",
  "4", "5", "6", "×",
  "1", "2", "3", "−",
  "C", "0", "=", "+"
];

buttons.forEach(val => {
    const btn = document.createElement('button');
    btn.classList.add('calcBtn');
    btn.textContent = val;
    buttonArea.appendChild(btn);
});

display.textContent = 'ass'