import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/python/python';

const CodeEditorWidget = () => {
  const [code, setCode] = useState('// Write your code here...');
  const [language, setLanguage] = useState('javascript');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="widget code-editor">
      <h3>Code Editor</h3>
      <div>
        <label htmlFor="language-select">Language: </label>
        <select id="language-select" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="xml">HTML/XML</option>
          <option value="css">CSS</option>
          <option value="markdown">Markdown</option>
          <option value="python">Python</option>
        </select>
      </div>
      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: 'material',
          lineNumbers: true,
          indentUnit: 2,
          smartIndent: true,
          matchBrackets: true,
          autofocus: true,
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
          // You can handle the change event here if needed
        }}
      />
      <div>
        <h4>Output:</h4>
        <pre>{code}</pre>
      </div>
    </div>
  );
};

export default CodeEditorWidget;
