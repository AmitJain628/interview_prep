import React from "react";

const Options = ({ selected, setSelected }) => {
  return (
    <div>
      <input
        type="radio"
        onChange={() => setSelected(0)}
        name="virtual-list"
        checked={selected === 0}
        value="0"
      />
      Normal
      <input
        type="radio"
        onChange={() => setSelected(1)}
        name="virtual-list"
        checked={selected === 1}
        value="1"
      />
      Virtual
      <input
        type="radio"
        onChange={() => setSelected(2)}
        name="virtual-list"
        checked={selected === 2}
        value="2"
      />
      Optimized
    </div>
  );
};

export default Options;
