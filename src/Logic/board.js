import { WINNER_COMBOS } from "../Constants";
export const checkWinner = (boardToCheck) => {
  // revisamos todas las combinaciones ganadoras
  //para saber si  X u O gano
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[b] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;
};
export const checkEndGame = (newBoard) => {
  //revisamos si hay empate, si no hay mas espacios vaios en el tablero
  return newBoard.every((square) => square !== null);
};

