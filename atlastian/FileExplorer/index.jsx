import { data } from "./data";
import { useState } from "react";


  
  
function buildTree(paths) {
  const root = [];

  for (const path of paths) {
    const parts = path.split("/");
    let currentLevel = root;

    parts.forEach((part, index) => {
      // Check if this part already exists at current level
      let existingNode = currentLevel.find((node) => node.name === part);

      if (!existingNode) {
        existingNode = {
          name: part,
          type: index === parts.length - 1 ? "file" : "folder",
          ...(index === parts.length - 1 ? {} : { children: [] }),
        };
        currentLevel.push(existingNode);
      }

      // Go deeper if it's a folder
      if (existingNode.type === "folder") {
        currentLevel = existingNode.children;
      }
    });
  }

  return root;
}

const File = ({ fileItem, updateData }) => {
  const [isOpen, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [fileType, setFileType] = useState("file");
  const addNewHandler = (e, type) => {
    e.stopPropagation();

    setOpen(true);
    setShowInput(true);
    setFileType(type);
  };

  const inputKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      console.log("here", e.target.value, fileItem.id);
      updateData(fileItem.id, fileType, e.target.value);
      setShowInput(false);
    }
  };

  const isChild = fileItem.items.length > 0;

  return (
    <div className="folder">
      <div>
        {isChild ? (
          <span className="icon" onClick={() => setOpen((prev) => !prev)}>
            {isOpen ? ">" : "^"}
          </span>
        ) : null}
        <span>{fileItem.name}</span>
        <button onClick={(e) => addNewHandler(e, "file")}>File +</button>
        <button onClick={(e) => addNewHandler(e, "folder")}>Folder +</button>
      </div>
      {isChild && isOpen
        ? fileItem.items.map((childItem) => (
            <File
              fileItem={childItem}
              key={childItem.id}
              updateData={updateData}
            />
          ))
        : null}
      {showInput && (
        <input
          type="text"
          autoFocus
          className="mb-1"
          onKeyDown={inputKeyDownHandler}
          onBlur={() => setShowInput(false)}
        />
      )}
    </div>
  );
};

const FileExplorer = () => {
  const [fileExplorerData, setFileExplorerData] = useState(data);

  const updateData = (id, type, value) => {
    const newItem = {
      id: Date.now(),
      name: value,
      items: [],
    };

    function addFileOrFolder(element) {
      console.log("data", data, id);
      if (element.id === id) {
        return { ...element, items: [...element.items, newItem] };
      }

      return {
        ...element,
        items: element.items.map((child) => addFileOrFolder(child)),
      };
    }
    setFileExplorerData(addFileOrFolder(fileExplorerData));
  };

  console.log("fileExplorerData", fileExplorerData);

  return (
    <div className="folder-container">
      {fileExplorerData.items.map((fileItem) => (
        <File fileItem={fileItem} key={fileItem.id} updateData={updateData} />
      ))}
    </div>
  );
};

export default FileExplorer;
