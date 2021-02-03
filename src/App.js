import { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Editor from "./Components/Editor";
import "./css/style.css";

function App() {
  const [code, setCode] = useState({});

  function handleSave() {
    localStorage.setItem("code", JSON.stringify(code));
    console.log("here again");
    document.getElementById("result").contentWindow.location.reload();
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 83 && e.ctrlKey) {
        e.preventDefault();
        console.log("here");
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // dirty way to solve warnings 😈
    // eslint-disable-next-line
  }, [code]);

  useEffect(() => {
    const code = JSON.parse(localStorage.getItem("code"));
    setCode(code);
  }, []);

  return (
    <div className="App">
      <Header handleSave={handleSave} />
      <div className="editors">
        <Editor code={code} setCode={setCode} codeEditorType="html" />
        <Editor code={code} setCode={setCode} codeEditorType="css" />
        <Editor code={code} setCode={setCode} codeEditorType="javascript" />
      </div>
      <div className="result-wrapper">
        <iframe id="result" className="result" src="result.htm" title="reault"></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default App;
