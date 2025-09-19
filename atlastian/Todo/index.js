import React, { useEffect, useState } from "react";

const ToDoList = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const data = await fetch(`https://dummyjson.com/todos?limit=20&skip=80`);
      const res = await data.json();
      console.log("res", res);
      setData(res.todos);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("data", data);

  return (
    <div className="container">
      {data?.length !== 0
        ? data.map((el) => <div className="box">{el.todo}</div>)
        : null}
    </div>
  );
};

export default ToDoList;


.App {
    font-family: sans-serif;
    text-align: center;
  }
  
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }
  
  .box {
    background: white;
    border-radius: 6px;
    padding: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  