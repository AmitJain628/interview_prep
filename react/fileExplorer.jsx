import { useState } from "react";

export default function FileExplorer({ data }) {
  const [message, setMessage] = useState("Hello world");
  return (
    <div role="tree">
      <FileList data={data} level={1} />
    </div>
  );
}

function FileList({ data, level }) {
  data?.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLocaleLowerCase()),
  );
  return (
    <div>
      {data?.map((file) => (
        <File
          name={file.name}
          child={file?.children}
          show={file?.children?.length}
          level={level}
        />
      ))}
    </div>
  );
}

const File = ({ name, show, level, child }) => {
  const [toggle, setToggle] = useState(true);
  const handleExpand = () => {
    setToggle(!toggle);
  };
  return (
    <div  aria-expande={toggle ? 'expanded': 'closed'} role="treeitem" aria-level={level}>
      <span>{name}</span>
      {show && <span onClick={handleExpand}>{toggle ? "+" : "-"}</span>}
      {!toggle && (
        <div style={{ paddingLeft: `${level * 10}px` }}>
          <FileList data={child} level={level + 1}/>
        </div>
      )}
    </div>
  );
};
