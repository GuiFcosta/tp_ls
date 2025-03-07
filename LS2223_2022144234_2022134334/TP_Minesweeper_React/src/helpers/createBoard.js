export default (row, col, bombs) => {
    let board = [];
    let mineLocation = [];
  
    for (let x = 0; x < row; x++) {
      let subCol = [];
      for (let y = 0; y < col; y++) {
        subCol.push({
          value: 0,
          revealed: false,
          x: x,
          y: y,
          flagged: false,
        });
      }
      board.push(subCol);
    }
  
    let bombsCount = 0;
    while (bombsCount < bombs) {
      let x = randomNum(0, row - 1);
      let y = randomNum(0, col - 1);
  
      if (board[x][y].value === 0) {
        board[x][y].value = "X";
        mineLocation.push([x, y]);
        bombsCount++;
      }
    }
  
    for (let roww = 0; roww < row; roww++) {
      for (let coll = 0; coll < col; coll++) {
        if (board[roww][coll].value === "X") {
          continue;
        }
  
        /* superior */
        if (roww > 0 && board[roww - 1][coll].value === "X") {
          board[roww][coll].value++;
        }

        /* inferior */
        if (roww < row - 1 && board[roww + 1][coll].value === "X") {
          board[roww][coll].value++;
        }
  
        /* direita superior */
        if (
          roww > 0 &&
          coll < col - 1 &&
          board[roww - 1][coll + 1].value === "X"
        ) {
          board[roww][coll].value++;
        }
  
        /* direita */
        if (coll < col - 1 && board[roww][coll + 1].value === "X") {
          board[roww][coll].value++;
        }
  
        /* direita inferior */
        if (
          roww < row - 1 &&
          coll < col - 1 &&
          board[roww + 1][coll + 1].value === "X"
        ) {
          board[roww][coll].value++;
        }
  
        /* esquerda inferior */
        if (
          roww < row - 1 &&
          coll > 0 &&
          board[roww + 1][coll - 1].value === "X"
        ) {
          board[roww][coll].value++;
        }
  
        /* esquerda */
        if (coll > 0 && board[roww][coll - 1].value === "X") {
          board[roww][coll].value++;
        }
  
        /* esquerda superior */
        if (roww > 0 && coll > 0 && board[roww - 1][coll - 1].value === "X") {
          board[roww][coll].value++;
        }
      }
    }
    return { board, mineLocation };
};
  
function randomNum(min = 0, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
} 