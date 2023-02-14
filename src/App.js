import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./Components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [playTime, setPlayTime] = useState(0);

  useEffect(() => {
    const isHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const sameValues = dice.every((die) => die.value === firstValue);
    if (isHeld && sameValues) {
      setTenzies(true);
      if (localStorage.getItem("time")) {
        playTime < localStorage.getItem("time") &&
          localStorage.setItem("time", playTime);
      } else {
        localStorage.setItem("time", playTime);
      }
    }
  }, [dice]);

  useEffect(() => {
    setInterval(timer, 1000);
  }, []);

  function timer() {
    setPlayTime((prevPlayTime) => {
      return (prevPlayTime += 1);
    });
  }

  function allNewDice() {
    const numsArr = [];
    numsArr.length = 10;
    for (let i = 0; i < numsArr.length; i++) {
      let randomNum = Math.ceil(Math.random() * 6);
      numsArr[i] = { value: randomNum, isHeld: false, id: i };
    }
    return numsArr;
  }

  function rollDice() {
    if (!tenzies) {
      setRollCount((prevRollCount) => {
        return (prevRollCount += 1);
      });
      setDice((prevDice) => {
        return prevDice.map((prevDie, idx) => {
          return prevDie.isHeld
            ? prevDie
            : { value: Math.ceil(Math.random() * 6), isHeld: false, id: idx };
        });
      });
    } else {
      setPlayTime(0);
      setRollCount(0);
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((prevDie) => {
        return prevDie.id === id
          ? { ...prevDie, isHeld: !prevDie.isHeld }
          : prevDie;
      });
    });
  }

  const diceEls = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => {
          holdDice(die.id);
        }}
      />
    );
  });

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="play-time">{playTime}s</p>
      <p className="roll-counts">Rolls {rollCount}</p>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceEls}</div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies === true ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
