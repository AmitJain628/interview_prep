import { useState } from 'react';
import users from './data/users';

type User = (typeof users)[number];

const columns = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Occupation', key: 'occupation' },
] as const;

function paginateUsers(
  usersList: Array<User>,
  page: number,
  pageSize: number,
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageUsers = usersList.slice(start, end);
  const totalPages = Math.ceil(usersList.length / pageSize);
  return { pageUsers, totalPages };
}

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { totalPages, pageUsers } = paginateUsers(
    users,
    page,
    pageSize,
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageUsers.map(
            ({ id, name, age, occupation }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{occupation}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <hr />
      <div className="pagination">
        <select
          aria-label="Page size"
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}>
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}>
            Prev
          </button>
          <span aria-label="Page number">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => {
              setPage(page + 1);
            }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


body {
    font-family: sans-serif;
  }
  
  table {
    border-collapse: collapse;
    font-size: 14px;
  }
  
  td,
  th {
    padding: 4px;
    border-bottom: 1px solid #ddd;
    text-align: start;
  }
  
  th {
    vertical-align: top;
  }
  
  th button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .pagination {
    display: flex;
    font-size: 14px;
    gap: 12px;
  }
  
  .pages {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  