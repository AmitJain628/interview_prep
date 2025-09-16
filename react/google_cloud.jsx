import React, { useState, useCallback, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { fileExplorerState } from './file.js';

export default function App() {
  const [code, setCode] = useState(`function Test () { return "hello"}`);
  const [current, setCurrent] = useState([]);
  const [breadCrumbs, setBreadCrumbs] = useState([]);

  const getParents = () => {
    const parents = [];
    Object.keys(fileExplorerState.items).forEach((fileName) => {
      const file = fileExplorerState.items[fileName];
      if (file.parentId === null) {
        parents.push(file);
      }
    });

    return parents;
  };

  const getParentsCallBack = useCallback(
    () => getParents(),
    [fileExplorerState]
  );

  useEffect(() => {
    const root = getParentsCallBack();
    setCurrent(root);
  }, []);

  const navigate = (obj) => {
    const child = [];
    console.log('obj', obj.id);
    Object.keys(fileExplorerState.items).forEach((fileName) => {
      const file = fileExplorerState.items[fileName];
      if (file.parentId === obj.id) {
        child.push(file);
      }
    });

    if (child.length === 0) {
      return;
    }

    setBreadCrumbs([...breadCrumbs, obj]);
    setCurrent(child);
  };

  return (
    <div>
      <div>
        <span>BreadCrumbs: {'Home'} </span>
        {breadCrumbs.map((breadCrumb) => (
          <span>
            {'->'} {breadCrumb.name}
          </span>
        ))}
      </div>
      {current.map((file) => (
        <div className="folder" onClick={() => navigate(file)}>
          {file.name}
        </div>
      ))}
    </div>
  );
}
