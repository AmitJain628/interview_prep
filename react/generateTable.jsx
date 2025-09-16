import { useState } from "react";

export default function App() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  const handleSubmit = () => {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Array(columns).fill;
    }
  };

  return (
    <div>
      <div>
        <span>Row: </span>
        <input
          type="text"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        />
      </div>
      <div>
        <span>Column: </span>
        <input
          type="text"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      <table>
        <tbody>
          {Array.from({ length: rows }, () => 0).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: columns }, () => 0).map((_, col) => (
                <td>
                 {col % 2 === 0
                      ? rows * col + (row + 1)
                      : rows * (col + 1) - row}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
