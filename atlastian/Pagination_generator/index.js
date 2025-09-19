import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const genRef = useRef(); // reference to async generator
  const [data, setData] = useState({});
  const [btnCount, setBtnCount] = useState(0);

  useEffect(() => {
    genRef.current = asyncGetContent(1);
    genFn();
  }, []);

  // fetch data from API
  async function fetchData(nextPage) {
    const resp = await fetch(
      `http://localhost:8080/api/list?nextPage=${nextPage}`,
      {
        method: "GET",
        headers: { "Access-Control-Allow-Headers": "*" },
      }
    );
    const response = await resp.json();
    return response;
  }

  // async generator for continuous paging
  const asyncGetContent = async function* (page = 1) {
    while (true) {
      try {
        const response = await fetchData(page);
        page = yield response; // next() can pass new page
      } catch (e) {
        console.warn("exception during fetch", e);
        yield { error: e };
      }
    }
  };

  // function to call generator and update state
  const genFn = useCallback(async (page = 1) => {
    if (genRef.current) {
      const resp = await genRef.current.next(page);
      const pageData = resp.value;
      setData(pageData);

      if (page === 1) {
        const totalBtn = Math.ceil(pageData.totalItems / pageData.itemsPerPage);
        setBtnCount(totalBtn);
      }

      return pageData;
    }
  }, []);

  const changePage = (to) => {
    genFn(to);
  };

  return (
    <div>
      <ul style={{ textAlign: "left" }}>
        {data.items ? data.items.map((v) => <li key={v}>{v}</li>) : null}
      </ul>
      <br />
      <Buttons changePage={changePage} btnCount={btnCount} />
    </div>
  );
}

function Buttons({ changePage, btnCount }) {
  const buttons = [];

  for (let i = 1; i <= btnCount; i++) {
    buttons.push(
      <button
        key={"btn-" + i}
        value={i}
        onClick={(e) => changePage(+e.currentTarget.value)}
      >
        {i}
      </button>
    );
  }

  return <div className="btn-container">{buttons}</div>;
}

export default App;
