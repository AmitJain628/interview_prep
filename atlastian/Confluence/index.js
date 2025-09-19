import { useState } from "react";
import { sidebarData } from "./data";
import { FaArrowDown, FaArrowRight, FaRegCircle } from "react-icons/fa";

const Icon = ({ isChild, isOpen, handleOpen }) => {
  if (!isChild) {
    return <FaRegCircle />;
  }

  return isOpen ? (
    <FaArrowDown onClick={handleOpen} />
  ) : (
    <FaArrowRight onClick={handleOpen} />
  );
};

const Node = ({ isChild, document }) => {
  const [isOpen, setOpen] = useState(false);
  console.log("document", document, isChild);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <li className="row">
      <Icon isChild={isChild} isOpen={isOpen} handleOpen={handleOpen} />
      <a href={document.link}>{document.title}</a>
      <div>
        {isChild && isOpen ? <RenderTree data={document.children} /> : null}
      </div>
    </li>
  );
};

const RenderTree = ({ data }) => {
  return (
    <>
      {data?.length !== 0
        ? data.map((document) => {
            const isChild = document.children.length > 0;
            return <Node isChild={isChild} document={document} />;
          })
        : null}
    </>
  );
};

const Tree = () => {
  const [data, setData] = useState(sidebarData);

  return (
    <ul className="container">
      <RenderTree data={data} />
    </ul>
  );
};

export default Tree;
