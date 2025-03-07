import React, { useState, useEffect } from "react";
import createBoard from "../../helpers/createBoard";
import Cell from "../cell/cell";
import { revealed } from "../../helpers/reveal";

function Board({ 
  rows, 
  cols, 
  bombs, 
  boardClass, 
  isGameRunning, 
  endGame, 
  setRemainingBombs, 
  gameOver, 
  setGameOver, 
  gameWin, 
  setGameWin, 
  gameFinished, 
  setGameFinished}){
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  
  useEffect(() => {
    if (isGameRunning) {
      freshBoard();
      setGameOver(false);
      setGameWin(false);
    }
  }, [isGameRunning, rows, cols, bombs]);

  const freshBoard = () => {
    const newBoard = createBoard(rows, cols, bombs);
    setNonMineCount(rows * cols - bombs);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
    setRemainingBombs(bombs);
  };

 const updateFlag = (e, x, y) => {
    if (gameOver || gameWin || gameFinished) return;

    e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid));
    let cell = newGrid[x][y];

    if (!cell.revealed) {
      if (cell.flagged) {
        if (cell.flagged === "flag") {
          cell.flagged = "question";
          setRemainingBombs((prev) => prev + 1);
        } else if (cell.flagged === "question") {
          cell.flagged = "";
        } 
      } else {
        cell.flagged = "flag";
        setRemainingBombs((prev) => prev - 1);
      }
    }
    setGrid(newGrid);
 };

  const revealCell = (x, y) => {
    if (gameOver || gameWin || gameFinished) return;

    let cell = grid[x][y];
    if (cell.revealed || cell.flagged) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setGameOver(true);
      endGame();
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameWin(true);
        endGame();
      }
    }
  };

  const revealBomb=()=>{
    let newGrid = JSON.parse(JSON.stringify(grid));
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
    }

  return (
    <div>
      <button onClick={revealBomb} disabled={!isGameRunning}>Mostrar bombas</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          pointerEvents: gameOver || gameWin ? 'none' : 'auto'
        }}
      >
        {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex"}} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                    gameOver={gameOver}
                    gameWin={gameWin}
                    boardClass={boardClass}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;