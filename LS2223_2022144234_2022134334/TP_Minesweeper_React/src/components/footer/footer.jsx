import React from "react";
import "./footer.css";

const Footer = ({ gameOver, gameWin, gameFinished }) => {
  return (
    gameOver && (<div id="footer">Voce Perdeu!</div>) || 
    gameWin && (<div id="footer" style={{backgroundColor:'green'}}>Voce Venceu!</div>) || 
    gameFinished && (<div id='footer' style={{backgroundColor:'white', color: 'black'}}>Jogo Terminado!</div>)
  );
};

export default Footer;
