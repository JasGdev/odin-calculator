let num1 = 0;
let num2 = 0;
let op = '';

// State logic
    // 1 : currently inputting num1
        // from here can only accept operators and numbers
    // 2 : currently inputting num2
        // from here can only accept equals and numbers

    //State transitions
        // operator => 2
        // equals, clear => 1

let state = 1;
let tempValue = '';

//#region Calculator Functions
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

    // updates num1, num2 and op as the buttons are clicked
        //also updates the display
        //display text format is `{num1} {op} {num2} = {operator(op, num1, num2}' 
            //when equal sign or another operator is clicked 
                // evaluate the expression set n1 = result, all other black
function inputUpdate(){
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.classList.contains('numBtn')){
                button.addEventListener('click', () => {
                    display.textContent +=  button.textContent;
                    tempValue += button.textContent;
                    console.group("Calculator State");
                    console.log("state:", state);
                    console.log("tempValue:", tempValue);
                    console.log("num1:", num1);
                    console.log("num2:", num2);
                    console.log("op:", op);
                    console.groupEnd();
            })
        } 
        else if (button.classList.contains('opBtn')){
            button.addEventListener('click', () => {
                if (state == 1){
                    display.textContent += button.textContent;
                    state = 2;
                    tempValue = '';
                }
                console.log(`state:${state} tempValue:${tempValue} num1:${num1} 
                        num2:${num2} op:${op}`)
            }) 
        } 
        else if (button.classList.contains('eqBtn')){
            button.addEventListener('click', () => {
                if (state == 2 && tempValue != ''){
                    display.textContent += button.textContent;
                    state = 1;
                    tempValue = '';
                }
                console.log(`state:${state} tempValue:${tempValue} num1:${num1} 
                        num2:${num2} op:${op}`)
            }) 
        } 
        else if (button.classList.contains('clearBtn')){
            button.addEventListener('click', () => {
                display.textContent = ''
                state = 1;
                tempValue = '';
                console.log(`state:${state} tempValue:${tempValue} num1:${num1} 
                        num2:${num2} op:${op}`)
            }) 
        }
        
    })

    
    

}

//#endregion

//#region Calculator UI
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
  "7", "8", "9", "/",
  "4", "5", "6", "x",
  "1", "2", "3", "−",
  "C", "0", "=", "+"
];

buttons.forEach(val => {
    const btn = document.createElement('button');
    if (Number.isInteger(Number(val))){
        btn.classList.add('numBtn');
    } else if (['/', 'x', '−', '+'].includes(val)){
        btn.classList.add('opBtn')
    } else if (val === '='){
        btn.classList.add('eqBtn')
    } else {
        btn.classList.add('clearBtn')
    }
    btn.textContent = val;
    buttonArea.appendChild(btn);
});

display.textContent = '';

inputUpdate();
//#endregion