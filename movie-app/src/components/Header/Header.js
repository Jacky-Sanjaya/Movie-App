import React from "react";
import "./Header.css";
import Icon from "../../assets/icon.png";

export default function Header() {
  return (
    <div className="header-container">
      <div onClick={() => window.scroll(0, 0)} className="header">
        <h1 className="header-text"> Movie App</h1>
        <img className="icon" src={Icon} alt="icon" />
      </div>
    </div>
  );
}
