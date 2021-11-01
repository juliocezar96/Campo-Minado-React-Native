const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row: row,
                column: column,
                opened: false,
                flagged: false,
                mined: false,
                explode: false,
                nearMines: 0
            }
        })
    })
}

//espalha as minas no tabuleiro
const spreadMines = (board, minesAmount) => {

    const rows = board.lenght;
    const columns = board[0].lenght;
    let minesPlanted = 0;
    
    while(minesPlanted < minesAmount){
        const rowSelec = parseInt(Math.random() * rows, 10);
        const columnSelec = parseInt(Math.random() * columns, 10);

        if(!board[rowSelec][columnSelec].mined){
            board[rowSelec][columnSelec.mined] = true;
            minesPlanted++;
        }
    }
}

//criação do tabuleiro com as meinas plantadas
const createMinedBoard =(rows, columns, minesAmount) => {

    const board = createBoard(rows, columns);
    spreadMines(board,minesAmount);

    return board;
}

export {createMinedBoard}