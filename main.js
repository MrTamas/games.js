let goal = Math.floor(Math.random() * 100); // generate random number
let remaining = 10; // set counter
/*
document.getElementById('goal').textContent = String(goal);
*/
const guessResult = document.querySelector('#guess_result');
const feedback = document.querySelector('#feedback');

let i;
for (i=0; i < 100; i++) {
    let newNumberBlock = document.createElement('div');
    newNumberBlock.className = 'number_block';
    newNumberBlock.id = 'c' + String(i+1);
    guessResult.appendChild(newNumberBlock);
    // newNumberBlock.textContent = String(i+1);
}

/**
 * checks whether number of divs is divisible by three
 * @return {boolean}
 */
function FullRow() {
    let cells = document.getElementsByClassName('cell');
    return (cells.length % 3 === 0);
}

/**
 * finds returns the cell by its id
 * @param i
 * @returns {HTMLElement}
 */
function findCell(i) {
    return document.getElementById('c' + String(i))
}

function check(goal, guess) {
    let message;
    remaining -= 1; // decrease remaining turns
    if (goal > Number(guess)) {
        message = 'Too low! You still have ' + String(remaining) + ' tries, though.';
    } else if (goal < Number(guess)) {
        message = 'Too high! You still have ' + String(remaining) + ' tries, though.';
    } else {
        message = 'Well done!';
    }
    feedback.textContent = message;
    return goal === Number(guess);
}

function remove() {
    document.getElementById('guess').value = '';
    document.getElementById('container').innerHTML = '';
    document.getElementById('goal_container').textContent = '';
    let cells = document.getElementsByClassName('number_block');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = '#ffffff';
    }
}

function gameOver() {
    feedback.textContent = 'Sorry, you\'ve used up your turns. The solution was ' + goal + '.';
    remove();
}

/**
 * adds each guess within the container in a new div
 * @param guess
 */
function recordGuess(guess) {
    // add element
    let newDiv = document.createElement('div');
    newDiv.className = 'cell';
    newDiv.classList.add('col-sm-4');
    newDiv.textContent = guess;
    let row;
    if (FullRow()) {
        row = document.createElement('div');
        row.className = 'row';
        document.getElementById('container').appendChild(row);
    }
    let rows = document.getElementsByClassName('row');
    row = rows[rows.length - 1];
    row.appendChild(newDiv);

    findCell(guess).style.background = 'none'; // mark on number line

    if (remaining === 0) {
        gameOver();
    }
}

document.getElementById('submit').addEventListener('click', () => {
    let guess = document.getElementById('guess').value;
    if (guess !== '') {
        if (check(goal, guess)) {
            remove();
        } else {
            recordGuess(guess);
        }
    }
});