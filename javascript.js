//#region Calculation Functions
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


//#endregion

//#region Logic Implementation

function operator(n1, op, n2){
    switch (op){
        case '+':
            return add(n1, n2)
        case '-':
            return subtract(n1, n2)
        case 'X':
            return multiply(n1, n2)
        case '/':
            return divide(n1, n2)
    }
}
let num1 = 0;
let num2 = 0;
let op = '';

// State logic
    // 1 : currently inputting num1
        // from here can only accept operators and numbers
    // 2 : currently inputting num2
        // from here can only accept equals and numbers
    // 3 : currently display result
        // from here can enter number to start a new operation, or operator

    //State transitions
        // operator => 2
        // clear => 1
        // equals => 3
        // number if 3 => 1

    

let state = 1;
let tempValue = '';

function overflowFix(){
// for overflow
    if (historyDisplay.textContent.length > 37){
        historyDisplay.style.fontSize = "15px";
    } else {
        historyDisplay.style.fontSize = "20px";
    }

    
    if (display.textContent.length > 17){
        display.style.fontSize = "35px";
    } else {
        display.style.fontSize = "40px";
    }

}

function updateState(button){
    display.textContent +=  button.textContent;
    tempValue += button.textContent;
}

function clickButtonByClassName(name){
    btn = document.getElementsByClassName(name)[0]
    btn.dispatchEvent(new Event('click'))
    btn.classList.add("is-active");
    setTimeout(() => {
            btn.classList.remove("is-active");
            }, 100);
}



function logState(){
    console.group("Calculator State");
                    console.log("state:", state);
                    console.log("tempValue:", tempValue);
                    console.log("num1:", num1);
                    console.log("num2:", num2);
                    console.log("op:", op);
                    console.groupEnd();
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
                    if (state != 3 && display.textContent.length < 18){
                        updateState(button)
                        logState();
                        } 
                    else if (state == 3) {
                        // coming from result
                        clickButtonByClassName('clearBtn');
                        updateState(button);
                        logState();
                        }
                    
                    
                    
                    
            })
            
        } 
        else if (button.classList.contains('opBtn')){
            button.addEventListener('click', () => {
                if (state != 2 && tempValue != ''){
                    
                    display.textContent = '';
                    state = 2;
                    num1 = Number(tempValue)
                    op = button.textContent
                    tempValue = '';
                    historyDisplay.textContent = `${num1} ${op}`;
                    overflowFix()

                    
                    
                }
                logState();
            }) 
        } 
        else if (button.classList.contains('eqBtn')){
            button.addEventListener('click', () => {
                if (state == 2 && tempValue != ''){
                    state = 3;
                    num2 = Number(tempValue)
                    
                    // perform operation
                    let result = operator(num1, op, num2);
                    
                    // update display
                    display.textContent = result;
                    historyDisplay.textContent = `${num1} ${op} ${num2} =`;

                    // reset op, num2 and set num 1 = operation result
                    num1 = result;
                    num2 = 0;
                    op = '';
                    tempValue = num1;
                    
                    overflowFix()
                }
                logState();
                
                
            }) 
        } 
        else if (button.classList.contains('clearBtn')){
            button.addEventListener('click', () => {
                display.textContent = '';
                display.style.fontSize = '40px';
                historyDisplay.textContent = '';
                historyDisplay.style.fontSize = "20px"
                state = 1;
                num1 = 0;
                num2 = 0;
                tempValue = '';
                op = '';
                logState();
            }) 
        }
        // . decimal implementation
            // able to used in all states as long as current display value is not empty
            // only able to be used if no other decimal tempValue
        
        else if (button.classList.contains('decimalBtn')){
            button.addEventListener('click', () => {
                if (!tempValue.includes('.') && tempValue != ''){
                    updateState(button);
                }
                logState();
            }) 
        }

        // back implementation
            // in state 1/2 able to be used if current display is non empty
            // in state 3 

        else if (button.classList.contains('backBtn')){
            button.addEventListener('click', () => {
                if (tempValue != '' && state != 3){
                    display.textContent =  display.textContent.slice(0, -1);
                    tempValue = tempValue.slice(0, -1);
                    console.log(tempValue)
                    console.log(typeof tempValue)
                } else{
                    clickButtonByClassName('clearBtn');
                }
                logState();
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

const historyDisplay = document.createElement('div');
historyDisplay.classList.add('historyDisplay');

const display = document.createElement('div');
display.classList.add('display');

const buttonArea = document.createElement('div');
buttonArea.classList.add('buttonArea');

container.appendChild(historyDisplay)
container.appendChild(display);
container.appendChild(buttonArea);

const buttons = [
  "M", "C", "<=", "/",
  "7", "8", "9", 'X',
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "±", "0", ".", "="
];

buttons.forEach(val => {
    const btn = document.createElement('button');
    btn.classList.add(val)
    if (Number.isInteger(Number(val))){
        btn.classList.add('numBtn');btn.classList.add('numBtn');
    } else if (['/', 'X', '-', '+'].includes(val)){
        btn.classList.add('opBtn')
    } else if (val === '='){
        btn.classList.add('eqBtn')
    } else if (val === 'C') {
        btn.classList.add('clearBtn')
    } else if (val === 'M') {
        btn.classList.add('memBtn')
    } else if (val === '<=') {
        btn.classList.add('backBtn')
    } else if (val === '±') {
        btn.classList.add('minusPosBtn')
    } else if (val === '.') {
        btn.classList.add('decimalBtn')
    }
    btn.textContent = val;
    buttonArea.appendChild(btn);
});

display.textContent = '';

inputUpdate();
//#endregion

//#region Keyboard Support

let sameMapping = '1234567890CM/x-+.'.split('');


document.addEventListener("keydown", (e) => {
    // stop clicking the focused button
    if (e.key === "Enter" || e.key === " ") {
        
        e.preventDefault();
    }


    switch (e.key) {
        case "Enter":
        case "=":
            clickButtonByClassName('eqBtn');
            break;

        case 'n': 
            clickButtonByClassName('minusPosBtn');
            break
        case 'Backspace': 
            clickButtonByClassName('backBtn');
            break


        }
    sameMapping.forEach(val => {
        pressedKey = e.key.toLowerCase()
        if (pressedKey == val.toLowerCase()){
            clickButtonByClassName(pressedKey.toUpperCase())
            
          

        }
    })

    
}
)