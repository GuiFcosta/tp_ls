import React from "react";
import "../header/header.css"
import Timer from "../timer/timer";

function Header({selectedLevel, onLevelChange, isGameRunning, startGame, remainingBombs, endGame}){
    return(
        <section id="control-panel">
            <form className="form">
            <h3 style={{color: 'white', margin: "0"}}>TP Linguagens Script</h3>
                <fieldset className="form-group">
                    <label id="Level" style={{fontWeight: 'bold'}}>Nível:</label>
                    <select id="btLevel" value={selectedLevel} onChange={onLevelChange} disabled={isGameRunning}>
                        <option value="1">Básico (9x9)</option>
                        <option value="2">Intermédio (16x16)</option>
                        <option value="3">Avançado (16x30)</option>
                    </select>
                    <button id="btLevel" type="button" onClick={startGame} disabled={isGameRunning}>Iniciar Jogo!</button>
                    <button id="btLevel" type="button" onClick={endGame} disabled={!isGameRunning}>Terminar Jogo!</button>
                    {isGameRunning && <Timer />}
                    <div style={{ color: 'white', fontSize: "20px" }}><span class="fa-solid fa-bomb"></span> {remainingBombs}</div>
                </fieldset>
            </form>
        </section>
    );
}
export default Header;