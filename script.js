function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, op, b) {
    switch(op) {
        case ('add'):
            return add(a, b);
            break;
        
        case ('subtract'):
            return subtract(a, b);
            break;

        case ('multiply'):
            return multiply(a, b);
            break;

        case ('divide'):
            return divide(a, b);
            break;

        default:
            return NaN;

    }

}

let currentNum = '';
let currentCalcs = [];
let display = document.getElementById('screen');
display.innerHTML = Number(0).toFixed(2);

// Number functions
let numButtons = document.querySelectorAll('button.number');

numButtons.forEach(button => {

    button.addEventListener('click', e => {

        if (currentCalcs.length === 1) {
            currentCalcs.pop();
            currentNum = '';
        }

        currentNum += e.target.id;
        display.innerHTML = currentNum;
        console.log(currentNum);

    });
})

// Decimal functions
let decimal = document.getElementById('decimal');

decimal.addEventListener('click', e => {

    if (currentCalcs.length === 1) {
        currentCalcs.pop();
        currentNum = '';
    }

    if (!currentNum.includes('.')) {

        currentNum += '.';

        if (currentNum === '.') {
            display.innerHTML = Number(0).toFixed(2);
        } else {
            display.innerHTML = parseFloat(currentNum).toFixed(2);
        }

        console.log(currentNum);    

    }

    if (currentNum === '.') {

    }
})

// Operator functions
let opButtons = document.querySelectorAll('button.op');

opButtons.forEach(button => {

    button.addEventListener('click', e => {

        if (currentNum !== '') {

            currentCalcs.push(parseFloat(currentNum));
            currentNum = '';
            console.log(currentCalcs);
            currentCalcs.push(e.target.id);
            console.log(currentCalcs);

        } else if ('add subtract multiply divide'.includes(currentCalcs.at(-1))) {

            currentCalcs.pop();
            currentCalcs.push(e.target.id);
            console.log(currentCalcs);

        } else {

            currentCalcs.push(e.target.id);
            console.log(currentCalcs);

        }

    })
})

// Equals function
let equals = document.getElementById('equals');
equals.addEventListener('click', () => {

    if (currentNum !== '') {
        currentCalcs.push(parseFloat(currentNum));
        console.log(currentCalcs);
        currentNum = '';
    }

    if (currentCalcs.length >= 3) {

        console.log(currentCalcs);
    
        while (currentCalcs.length >= 3) {

            if (currentCalcs[1] === 'divide' && parseInt(currentCalcs[2]) === 0) {
                display.innerHTML = 'Can\'t divide by zero!';
                currentCalcs = [];
                currentNum = '';
                break;
            }

            let opResult = operate(currentCalcs[0], currentCalcs[1], currentCalcs[2]);
            currentCalcs.splice(0, 3, opResult);
            console.log(currentCalcs);
        }
    
        if (display.innerHTML !== 'Can\'t divide by zero!') {
            console.log(currentCalcs[0]);
            display.innerHTML = currentCalcs[0].toFixed(2);
        }
    }

})

// Clear function
let clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    currentCalcs = [];
    display.innerHTML = Number(0).toFixed(2);
    currentNum = '';
})
