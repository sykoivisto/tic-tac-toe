const gameboard = (() => {
    let grid = [
        0,0,0,
        0,0,0,
        0,0,0
    ]; // 0 = empty, 1 = player 1 (x's), 2 = player 2 (o's)

    const checkGameState = (val) => {
        //check for game wins and ties. if nothing found game continues. if game ends, alert is created, points are added, and board resets

        if ( // check for wins
            (grid[0] === grid[1] && grid[0] === grid[2] && grid[0] !== 0) ||//row wins
            (grid[3] === grid[4] && grid[3] === grid[5] && grid[3] !== 0) ||
            (grid[6] === grid[7] && grid[6] === grid[8] && grid[6] !== 0) ||
            (grid[0] === grid[3] && grid[0] === grid[6] && grid[0] !== 0) ||//column wins
            (grid[1] === grid[4] && grid[1] === grid[7] && grid[1] !== 0) ||
            (grid[2] === grid[5] && grid[2] === grid[8] && grid[2] !== 0) ||
            (grid[0] === grid[4] && grid[0] === grid[8] && grid[0] !== 0) ||//diag wins
            (grid[2] === grid[4] && grid[2] === grid[6] && grid[2] !== 0)) {
            
            //do something (someone won)
            //use the last placed mark to determine who won.
            return val;

        } else if (!grid.includes(0)) {//check if there are still moves left
            //no moves left? tie!
            return 3;
        };
    
    };

    const setGrid = (gridSpace, val) => { //accepts the grid space and the value (player) to set the grid space to. also returns the game state
        grid[gridSpace] = val;

        return checkGameState(val);
    };

    const getGrid = () => {
        return grid;
    };

    const reset = () => {
        grid = [0,0,0,0,0,0,0,0,0];
    };

    return { setGrid, getGrid, reset };
})();

const player = (name) => {
    const player = name;
    let score = 0;

    const addPoint = () => {
        score++;
    };
    const getName = () => {
        return player;
    };
    const getScore = () => {
        return score;
    };
    return {
        addPoint,
        getName,
        getScore
    };
};

const gamecontroller = (() => {
    let turn = 1; //1 for player x turn, 2 for player o turn
    let player1;
    let player2;

    const renderGrid = () => { //loops thru gameboard.grid and adds x or o class to each grid space in the DOM
        for ( i = 0; i < 9; i++ ) {
            switch (gameboard.getGrid()[i]) {
                case 0:
                    break;
                case 1:
                    document.getElementById(i).classList.add('x');
                    break;
                case 2:
                    document.getElementById(i).classList.add('o');
                    break;
                default:
                    break;
            };
        };
    };

    const clearGrid = () => { //resets the DOM and gameboard.grid
        let spaces = document.getElementsByClassName('grid-space');
        
        for (space of spaces) {
            space.classList.remove('x');
            space.classList.remove('o');
        };

        gameboard.reset();
        renderGrid();
    };

    const advanceTurn = () => {//if it's player 1's turn, make it player 2, otherwise, make it player 1 again
        if (turn === 1) {
            turn = 2;
            document.getElementById('whosTurnUsername').innerHTML = `${player2.getName()}'s (o's)`
        } else {
            turn = 1;
            document.getElementById('whosTurnUsername').innerHTML = `${player1.getName()}'s (x's)`
        }
    };

    const click = (e) => {
        let target = (e.target.attributes.id.value);

        if (gameboard.getGrid()[target] === 0) { //check if the grid space is empty
            let gamestate = (gameboard.setGrid(target, turn)); //add our player's mark to the board. setGrid also returns our game state
            advanceTurn();
            gamecontroller.renderGrid();

            if (gamestate !== 0) {
                handleGameEnd(gamestate);
            };
        };
    };

    [...document.querySelectorAll('.grid-space')].forEach(function(item) {// our click listener on every grid space.
        item.addEventListener('click', click);
    });

    const handleGameEnd = (state) => {
        switch (state) {
            case 1:
                //handle player 1 win;
                player1.addPoint();
                document.getElementById('playerXScore').innerText = player1.getScore();

                document.getElementById('win-player-name').innerText = player1.getName();
                document.getElementById('display-wrapper').classList.add('overlay');
                document.querySelector('.game-over').classList.remove('hidden');
                document.getElementById('game-over-win').classList.remove('hidden');
                break;
            case 2:
                //handle player 2 win
                player2.addPoint();
                document.getElementById('playerOScore').innerText = player2.getScore();

                document.getElementById('win-player-name').innerText = player2.getName();
                document.getElementById('display-wrapper').classList.add('overlay');
                document.querySelector('.game-over').classList.remove('hidden');
                document.getElementById('game-over-win').classList.remove('hidden');
                break;
            case 3:
                //handle a tie
                document.getElementById('display-wrapper').classList.add('overlay');
                document.querySelector('.game-over').classList.remove('hidden');
                document.getElementById('game-over-tie').classList.remove('hidden');
                break;
        }
    };

    const startGame = () => {
        let player1name = document.getElementById('player-1-name-input').value;
        let player2name = document.getElementById('player-2-name-input').value;

        player1 = player(player1name);
        player2 = player(player2name);

        document.getElementById('playerXName').innerText = player1.getName();
        document.getElementById('playerOName').innerText = player2.getName();

        document.getElementById('whosTurnUsername').innerHTML = `${player1.getName()}'s (x's)`

        document.getElementById('display-wrapper').classList.remove('overlay'); //remove the overlay
        document.querySelector('.start-screen').classList.add('hidden'); //hide the start screen
    }

    const playAgain = () => {
        clearGrid();
        document.getElementById('display-wrapper').classList.remove('overlay');
        document.querySelector('.game-over').classList.add('hidden');
        document.getElementById('game-over-win').classList.add('hidden');
        document.getElementById('game-over-tie').classList.add('hidden');
    }

    return {
        renderGrid,
        clearGrid,
        startGame,
        playAgain
    };


})();

gamecontroller.renderGrid();