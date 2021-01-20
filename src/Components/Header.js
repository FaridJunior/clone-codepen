import React from "react";

const Header = () => {
  return (
    <div className="codepen-header">
      <div className="codepen__info">
        <h3 className="codepen__name" contenteditable="true">
          woderfull pen
        </h3>
        <p className="codepen__author">mohamedfarid</p>
      </div>
      <div className="codepen__controllers">
        <button className="btn main-btn"> save </button>
        <button className="btn main-btn"> setting </button>
        <button className="btn main-btn"> Change View </button>
      </div>
    </div>
  );
};

export default Header;
