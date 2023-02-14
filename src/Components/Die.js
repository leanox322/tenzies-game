import React from "react";
import "../App.css";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };

  return (
    <div className="die-element" style={styles} onClick={props.holdDice}>
      <span className="die-num" style={styles}>
        {props.value}
      </span>
    </div>
  );
}

export default Die;
