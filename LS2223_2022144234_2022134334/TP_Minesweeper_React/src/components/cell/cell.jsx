import React from "react";
import "../cell/cell.css"
import Bomb from "../bomb/bomb";

export default function Cell({ details, updateFlag, revealCell, boardClass, gameOver, gameWin}) {
  const cellstyle = {
    background: details.revealed
      ? details.value === "X"
        ? mineColor()
        : cellEmpty(details.x, details.y)
      : cellNormalColor(details.x, details.y),
    color: numColor(details.value),
  };

  const handleClick = () => {
    if (!details.flagged && !gameWin && !gameOver) {
      revealCell(details.x, details.y);
    }
  };

  return (
    <div
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={handleClick}
      style={cellstyle}
      id="cellStyle"
      className={boardClass}
    >
      {!details.revealed && details.flagged === "flag" ? (
        "🚩"
      ) : !details.revealed && details.flagged === "question" ? (
        <span class="fa-solid fa-question" style={{color: "yellow"}}></span> 
      ) : details.revealed && details.value !== 0 ? (
        details.value === "X" ? (
          <Bomb /> 
        ) : (
          details.value
        )
      ) : (
        ""
      )}
    </div>
  );
}

const mineColor = () => {
  return "red";
};

const cellEmpty = (x, y) => {
  return "#ececec";
};

const cellNormalColor = (x, y) => {
  return "#292ccc";
};

const numColor = (num) => {
  if (num === 1) {
    return "blue";
  } else if (num === 2) {
    return "green";
  } else if (num === 3) {
    return "red";
  } else if (num === 4) {
    return "purple";
  } else {
    return "black";
  }
};