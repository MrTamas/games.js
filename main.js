addEventListener('load', function(e) {
    document.querySelector('#test').innerHTML = 'For';
});

let goal = Math.floor(Math.random()*100); // generate random number

/* temp: add goal to page
let goal_container = document.createElement('div');
goal_container.textContent = String(goal);
goal_container.id = 'goal_container'
document.getElementsByTagName('body')[0].appendChild(goal_container);
 */

/**
 * checks whether number of divs is divisible by three
 * @return {boolean}
 */
function FullRow() {
    let cells = document.getElementsByClassName('cell');
    return (cells.length%3 === 0);
}

/**
 * adds each guess within the container in a new div
 * @param guess
 */
function recordGuess(guess) {

    let newDiv = document.createElement('div');
    newDiv.class = 'cell';
    newDiv.classList.add('col-sm-4');
    newDiv.textContent = guess;
    let row;
    if (FullRow()) {
        row = document.createElement('div');
        row.className = 'row';
        document.getElementById('container').appendChild(row);
    }
    let rows = document.getElementsByClassName('row');
    row = rows[rows.length-1];
    row.appendChild(newDiv);
}

function check(goal, guess) {
    if (goal > Number(guess)) {
        alert('Too low!');
    }
    else if (goal < guess) {
        alert('Too high!');
    }
    else {
        alert('Well done!');
    }
    return goal === Number(guess);
}

function remove() {
    document.getElementById('guess').value = '';
    document.getElementById('container').innerHTML = '';
    document.getElementById('goal_container').textContent = '';
}

document.getElementById('submit').addEventListener('click', () => {
    let guess = document.getElementById('guess').value;

    if (check(goal, guess)) {
        remove();
    }
    else {
        recordGuess(guess);
    }
});