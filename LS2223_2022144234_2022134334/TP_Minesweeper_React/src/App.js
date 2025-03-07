import React, { useState} from 'react';
import './App.css';
import Board from './components/board/board';
import Header from './components/header/header'
import Footer from './components/footer/footer';

function App() {
  const [selectedLevel, setSelectedLevel] = useState("1");
  const [size, setSize] = useState({ rows: 9, cols: 9, bombs: 10});
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [boardClass, setBoardClass] = useState("");
  const [remainingBombs, setRemainingBombs] = useState(size.bombs);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  
  const createPanel = (level) => {
    switch (level) {
      case '1':
        setSize({rows: 9, cols: 9, bombs: 10});
        setRemainingBombs(10);
        break;
      case '2':
        setSize({rows: 16, cols: 16, bombs: 40});
        setRemainingBombs(40);
        break;
      case '3':
        setSize({rows: 16, cols: 30, bombs: 99});
        setRemainingBombs(99);
        break;
      default:
        setSize({rows: 9, cols: 9, bombs: 10});
        setRemainingBombs(10);
    }
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    if (!isGameRunning) {
      setSelectedLevel(value);
      createPanel(value);
    }
  };
  
  const startGame = () => {
    setIsGameRunning(true);
    setGameWin(false)
    setGameFinished(false)
    switch (selectedLevel) {
      case '1':
        setBoardClass("");
        break;
      case '2':
      case '3':
        setBoardClass("intermediario");
        break;
      default:
        setBoardClass("");
    }
  };

  const endGame = () => {
    setGameFinished(true)
    setIsGameRunning(false);
  };

  return (
    <div className="App">
      <h1 style={{color: 'white', margin: 0,}}>Minesweeper</h1>
      <Header 
      selectedLevel={selectedLevel}
      onLevelChange={handleLevelChange}
      isGameRunning={isGameRunning}
      startGame={startGame}
      remainingBombs={remainingBombs}
      endGame={endGame}
      />
       <main>
        <Board 
        rows={size.rows} 
        cols={size.cols} 
        bombs={size.bombs} 
        boardClass={boardClass} 
        isGameRunning={isGameRunning} 
        setIsGameRunning={setIsGameRunning}
        endGame={endGame}
        setRemainingBombs={setRemainingBombs}
        gameOver={gameOver} 
        gameWin={gameWin}
        gameFinished={gameFinished}
        setGameOver={setGameOver} 
        setGameWin={setGameWin}
        setGameFinished={setGameFinished}
        />
       </main>
       <Footer 
       gameOver={gameOver}
       gameWin={gameWin}
       gameFinished={gameFinished}
       />
    </div>
  );
}

export default App;
