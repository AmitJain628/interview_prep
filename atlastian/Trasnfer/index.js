import React, { useState } from "react"

const DEFAULT_ITEMS_LEFT = [
    'HTML',
    'JavaScript',
    'CSS',
    'TypeScript',
  ];
  const DEFAULT_ITEMS_RIGHT = [
    'React',
    'Angular',
    'Vue',
    'Svelte',
  ];


  const Checkbox = ({checked, handleChange, label}) => {
   return (
    <div>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <label>{label}</label>
    </div>
   )
  }

const ItemList = ({items, setItems}) => {
    const handleChange = (item) => {
        setItems(prev => prev.map(el => {
            if(el.label === item.label) {
                return {...el, checked: !el.checked}
            }

            return el;
        }))
    }

    return (
        <div className="transfer-list">
            <ul className="transfer-container">
                {items.map(item => (
                    <>
                    <Checkbox checked={item.checked} label={item.label} handleChange={() => handleChange(item)}/>
                    </>
                ))}
            </ul>

        </div>
    )
}

function generateMap(items) {
   return items.map(item => ({"label": item, "checked": false}));
}  

function transferSelectedItems(itemsSrc, setItemsSrc, itemDest, setItemsDest) {
    const newSrc = [...itemsSrc.filter(el => !el.checked)];
    const newDest = [...itemDest, ...itemsSrc.filter(el => el.checked)];

    setItemsSrc(newSrc);
    setItemsDest(newDest);
}

const Trasnfer = () => {
    const [leftList, setLeftList] = useState(generateMap(DEFAULT_ITEMS_LEFT));
    const [rightList, setRighList] = useState(generateMap(DEFAULT_ITEMS_RIGHT));
    return (
        <div className="container">
            <ItemList items={leftList} setItems={setLeftList} />
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <button onClick={() => {
            transferSelectedItems(
                rightList,
                setRighList,
              leftList,
              setLeftList,
            );
          }} >{'<'}</button>
                <button onClick={() => {
            transferSelectedItems(
                leftList,
                setLeftList,
                rightList,
                setRighList
            );
          }}>{'>'}</button>
            </div>
            <ItemList items={rightList} setItems={setRighList} />
        </div>
    )
}

export default Trasnfer;