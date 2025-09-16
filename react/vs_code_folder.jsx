import "./styles.css";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [ctr, setCtr] = useState(0);
  const [directory, setDirectory] = useState([
    {
      name: "root",
      id: Date.now(),
      childrens: [],
      type: "folder",
    },
  ]);

  const addFolder = (parentId, name, type = "folder") => {
    console.log("pa", parentId, name);
    const recursive = (directory) => {
      return directory.map((dir) => {
        if (dir.id === parentId) {
          let node = {
            name: name,
            id: Date.now(),
            childrens: [],
            type: type,
          };

          const childrens = [...dir.childrens, node];
          return {
            ...dir,
            childrens,
          };
        }

        if (dir.childrens) {
          return {
            ...dir,
            childrens: [...recursive(dir.childrens)],
          };
        }
        return dir;
      });
    };

    let newDirectory = recursive(directory);
    console.log("director", newDirectory);
    setDirectory(newDirectory);
    setCtr(ctr + 1);
  };

  return (
    <div className="App">
      <FileExplorer directory={directory} addFolder={addFolder} />
    </div>
  );
}

const FileExplorer = ({ directory, addFolder }) => {
  console.log("level 1", directory);
  return (
    <div>
      {directory?.map((file, index) => (
        <div key={index}>
          <File file={file} level={0} addFolder={addFolder} />
        </div>
      ))}
    </div>
  );
};

const File = ({ file, level, addFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const [name, setName] = useState(null);
  const inputRef = useRef(null);

  const [isInputVisible, setInputVisible] = useState(false);
  const openFile = () => setIsOpen(!isOpen);
  const expand = isOpen && file.childrens.length !== 0;

  const showInput = (type) => {
    setInputVisible(true);
    setType(type);
  };

  const handleAdd = () => {
    setInputVisible(false);
    addFolder(file.id, name, type);
    setName("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setInputVisible(false); // hide input if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setInputVisible]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          paddingLeft: `${level * 10}px`,
        }}
      >
        <div onClick={openFile}>{file.name}</div>
        {file.type === "folder" && (
          <button onClick={() => showInput("folder")}>+Add Folder</button>
        )}
        {file.type === "folder" && (
          <button onClick={() => showInput("file")}>+Add File</button>
        )}
      </div>
      {isInputVisible && (
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
      )}
      {expand &&
        file.childrens.map((el) => (
          <File file={el} level={level + 1} addFolder={addFolder} />
        ))}
    </div>
  );
};
