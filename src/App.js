import { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import "./css/style.css";

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
      <Header />
      <div className="editors">
        <div className="editor-wrapper">
          <div className="editor__header">
            <h3 className="editor__heading">HTML</h3>
          </div>
          <textarea
            name="html"
            id="css"
            cols="30"
            rows="10"
            className="editor"
            // prevent grammerly https://stackoverflow.com/questions/37444906/how-to-stop-extensions-add-ons-like-grammarly-on-contenteditable-editors
            data-gramm_editor="false"
            value={code?.html}
            onChange={(e) => setCode({ ...code, html: e.target.value })}
          ></textarea>
        </div>
        <div className="editor-wrapper">
          <div className="editor__header">
            <h3 className="editor__heading">CSS</h3>
          </div>
          <textarea
            name="css"
            id="css"
            cols="30"
            rows="10"
            className="editor"
            data-gramm_editor="false"
            value={code?.css}
            onChange={(e) => setCode({ ...code, css: e.target.value })}
          ></textarea>
        </div>
        <div className="editor-wrapper">
          <div className="editor__header">
            <h3 className="editor__heading">JS</h3>
          </div>
          <textarea
            name="js"
            id="js"
            cols="30"
            rows="10"
            className="editor"
            data-gramm_editor="false"
            value={code?.js}
            onChange={(e) => setCode({ ...code, js: e.target.value })}
          ></textarea>
        </div>
      </div>
      <div className="result-wrapper">
        <iframe id="result" className="result" src="result.htm" title="reault"></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default App;
