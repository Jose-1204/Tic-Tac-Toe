import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 4, 8],
  [2, 4, 6],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );

  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); //null = no hay winner, false = empate 
  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    //para saber si  X u O gano 
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      if (boardToCheck[a]&&
         boardToCheck[a] === boardToCheck[b]&&
         boardToCheck[b] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null;
  }
  

  const updateBoard = (index) => {
    if (board[index] || winner) return
    // no actualizamos esta posicion si ya tiene algo 
    const newBoard = [...board];
    //actualiza el tablero
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn); 
    //cambia el turno del jugador
    const newWinner = checkWinner(newBoard);
    //revisamos si hay ganador
    if (newWinner){
      setWinner(newWinner) //actualiza el estado
    }
  };
  return (
    <>
      <main className="board">
        <h1>tic tac toe</h1>

        <section className="game">
          {board.map((_, index) => {
            return (
              <div className="cell" key={index}>
                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              </div>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}</Square>

          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}</Square>
        </section>
      </main>
    </>
  );
}

export default App;
