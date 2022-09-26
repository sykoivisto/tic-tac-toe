const gameboard = (() => {
    let grid = [
        1,0,0,
        0,1,0,
        2,0,2
    ]; // 0 = empty, 1 = player 1 (x's), 2 = player 2 (o's)

    const setGrid = (gridSpace, val) => { //accepts the grid space and the value to set the grid space to
        grid[gridSpace] = val;
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
    const score = 0;

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
}

const gamecontroller = (() => {
    const renderGrid = () => {
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
        }
    };

    const clearGrid = () => { //resets the DOM and gameboard.grid
        let spaces = document.getElementsByClassName('grid-space');
        
        for (space of spaces) {
            space.classList.remove('x');
            space.classList.remove('o');
        };

        gameboard.reset();

    };

    return {
        renderGrid,
        clearGrid
    };
})();