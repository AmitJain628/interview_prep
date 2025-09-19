import React, { useState } from "react";
import {data} from './data';


const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
]

const Column = () => {
    return (
        <tr className="column">
            {columns.map(col => (
                <td key={col.key}>{col.label}</td>
            ))}                
       </tr>
    )
}

const Row = ({name, id, age, occupation}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{occupation}</td>
        </tr>
    )
}

const PageSizeSelect = ({value, handleSelect}) => {
      return (
        <select value={value} onChange={handleSelect}>
            <option value={5}> show 5</option>
            <option value={10} >show 10</option>
            <option value={15} >show 15</option>
        </select>
      )
} 

const PageNumber = ({pageNumber, total, handlePrev, handleNext}) => {
    return (
        <>
        <button onClick={handlePrev}>Prev</button>
        <span>Page {pageNumber} of {total} </span>
        <button onClick={handleNext}>Next</button>
        </>
    )
}

const Datatable = () => {
    const [users, setUsers] = useState(data);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleSelect  = (e) => {
        console.log("val", e.target.value);
        setPageSize(e.target.value);
    }

    const handlePrev = () => {
        if (pageNumber - 1 < 1) return;
        setPageNumber(prev => prev - 1);
    }

    const handleNext = () => {
        if (pageNumber + 1 >= users.length) return;
        setPageNumber(prev => prev + 1);
    }

    return (
        <div className="container">
            <table>
                <thead>
                    <Column />
                </thead>
                <tbody>
                    {users.slice(pageSize*(pageNumber-1), pageSize*(pageNumber-1) + pageSize).map(user => (
                        <Row key={user.id} name={user.name} id={user.id} age={user.age} occupation={user.occupation} />
                    ))}
                </tbody>
                </table>
                <div className="pagination">
                    <PageSizeSelect value={pageSize}  handleSelect={handleSelect} />
                    <PageNumber handleNext={handleNext} pageNumber={pageNumber} total={Math.floor(users.length / pageSize)} handlePrev={handlePrev}  />
                </div>
        </div>
    )
}

export default Datatable;