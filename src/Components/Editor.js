import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

function Editor({ code, setCode, codeEditorType }) {
  return (
    <div className="editor-wrapper">
      <div className="editor__header">
        <h3 className="editor__heading">JS</h3>
      </div>
      <AceEditor
        mode={codeEditorType}
        theme="monokai"
        onChange={(newValue) => setCode({ ...code, [codeEditorType]: newValue })}
        value={code[codeEditorType]}
        name={`${codeEditorType}-editor`}
        width="100%"
        height="100%"
        fontSize={18}
        tabSize={2}
        wrapEnabled={true}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        editorProps={{ $blockScrolling: true }}
        style={{ background: "#1D1E22" }}
      />
    </div>
  );
}

export default Editor;
