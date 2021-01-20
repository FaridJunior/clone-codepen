import React, { useState, useEffect } from "react";

function App() {
  const [code, setCode] = useState({});
  const [keysPressed, setKeyPressed] = useState();

  function handelWritingTap(event) {
    // https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
    event.preventDefault();
    const focused = document.querySelector(":focus");
    let start = focused.selectionStart;
    let end = focused.selectionEnd;
    // set textarea value to: text before caret + tab + text after caret
    focused.value = focused.value.substring(0, start) + "  " + focused.value.substring(end);
    // put caret at right position again
    focused.selectionStart = focused.selectionEnd = start + 2;
  }
  function handleSave() {
    localStorage.setItem("code", JSON.stringify(code));
    // reload the result frame to update https://stackoverflow.com/questions/86428/what-s-the-best-way-to-reload-refresh-an-iframe
    document.getElementById("result").contentWindow.location.reload();
  }

  function handleCTRLPlusS(event) {
    event.preventDefault();
    handleSave();
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.keyCode);
      if (event.keyCode === 9) {
        handelWritingTap(event);
      }
      if (keysPressed === 17 && event.keyCode === 83) {
        handleCTRLPlusS(event);
      } else {
        setKeyPressed(event.keyCode);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // dirty way to solve warnings 😈
    // eslint-disable-next-line
  }, [keysPressed]);
  useEffect(() => {
    const code = JSON.parse(localStorage.getItem("code"));
    setCode(code);
  }, []);

  return (
    <div className="App">
      <textarea
        name="html"
        id="css"
        cols="30"
        rows="10"
        data-gramm_editor="false"
        value={code.html}
        onChange={(e) => setCode({ ...code, html: e.target.value })}
      ></textarea>
      <textarea
        name="css"
        id="css"
        cols="30"
        rows="10"
        data-gramm_editor="false"
        value={code.css}
        onChange={(e) => setCode({ ...code, css: e.target.value })}
      ></textarea>
      <textarea
        name="js"
        id="js"
        cols="30"
        rows="10"
        data-gramm_editor="false"
        value={code.js}
        onChange={(e) => setCode({ ...code, js: e.target.value })}
      ></textarea>

      <iframe
        id="result"
        src="result.html"
        style={{ height: "200px", width: "200px", border: "5px solid #212121" }}
        title="reault"
      ></iframe>
    </div>
  );
}

export default App;
