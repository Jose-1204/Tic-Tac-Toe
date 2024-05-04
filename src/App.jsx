import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./Components/Square";
import { checkWinner, checkEndGame } from "./Logic/board";
import { TURNS} from "./Constants";
import { WinnerModal } from "./Components/WinnerModal";

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); //null = no hay winner, false = empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }; // RESET DEL JUEGO

  const updateBoard = (index) => {
    if (board[index] || winner) return;
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
    if (newWinner) {
      confetti();
      setWinner(newWinner); //actualiza el estado del ganador
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    }
  };
  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reset</button>

      <section className="game">
        {board.map((_, index) => {
          return (
            <div className="cell" key={index}>
              <Square key={index} index={index} updateBoard={updateBoard}>
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

      <WinnerModal resetGame={resetGame} winner={winner}/>        
    </main>
  );
}

export default App;
