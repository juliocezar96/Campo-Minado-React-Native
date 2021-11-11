const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
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

    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;
    
    while(minesPlanted < minesAmount) {
        const rowSelec = parseInt(Math.random() * rows, 10)
        const columnSelec = parseInt(Math.random() * columns, 10)

        if (!board[rowSelec][columnSelec].mined) {
            board[rowSelec][columnSelec].mined = true
            minesPlanted++;
        }
    }
}
//cria tabuleiro minado
const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board;
}

//clonar um tabuleiro
const cloneBoard = board => {
    return board.map(row => {
        return row.map(field => {
            return {...field}
        });
    });
}

//metodo para descobrir os vizinhos
const getNeighbors = (board, row, column) => {

    const neighbors = [];
    const rows = [row -1, row, row +1];
    const columns = [column -1, column, column +1];

    rows.forEach(r => {
        columns.forEach(c => {

            const diferent = r !== row || c !== column;
            const validateRow = r >= 0 && r < board.length;
            const validateColumn = c >= 0 && c < board[0].length;

            if(diferent && validateRow && validateColumn){
                neighbors.push(board[r][c])
            }
        });
    });

    return neighbors;
}

//verifica de a vizinhança é segura
const safeNeighborhood = (board, row, column)=>{

    const safes = (result, neighbor) => result && !neighbor.mined;
    return getNeighbors(board, row,column).reduce(safes,true);

}

//função para abrir campo
const openField =(board, row, column) =>{

    const field = board[row][column];

    if(!field.opened){
        field.opened=true;
        if(field.mined){
            field.explode=true;
        } else if(safeNeighborhood(board, row, column)){
            getNeighbors(board,row,column).forEach(n => openField(board, n.row, n.column)) //se a vizinhança for segura, irá abrir os campos de forma recursiva 
        } else {
            const neighbors =  getNeighbors(board, row, column);
            field.nearMines = neighbors.filter(n => n.mined).length;
        }
    }
}


const fields = board => [].concat(...board);
const hadExplosion = board => fields(board).filter(field => field.explode).length > 0;
const pedding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened);
const wonGame = board => fields(board).filter(pedding).length === 0;
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true);


export {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines
}