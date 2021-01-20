import React, { useState, useEffect } from "react";

function App() {
  const [HTML, setHTML] = useState("");
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.keyCode);
      if (event.keyCode === 9) {
        handelWritingTap(event);
      }

      if (keysPressed === 17 && event.keyCode === 83) {
        event.preventDefault();
        console.log("saved");
        localStorage.setItem("html", HTML);
        document.getElementById("result").contentWindow.location.reload();
      } else {
        setKeyPressed(event.keyCode);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keysPressed, HTML]);

  return (
    <div className="App">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setHTML(e.target.value)}
      ></textarea>
      <iframe
        id="result"
        src="demo.html"
        style={{ height: "200px", width: "200px", border: "5px solid #212121" }}
        title="Iframe Example"
      ></iframe>
    </div>
  );
}

export default App;
