import { useId, useState } from "react";

function CheckboxItem({ onChange, label, checked }) {
  const id = useId();

  return (
    <div className="transfer-list__section__items__item">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function ItemList({ items, setItems }) {
  return (
    <div className="transfer-list__section">
      <ul className="transfer-list__section__items">
        {items.map((item, index) => (
          <li key={item.label}>
            <CheckboxItem
              label={item.label}
              checked={item.checked}
              onChange={() => {
                const newItems = [...items];
                newItems[index] = {
                  ...item,
                  checked: !item.checked,
                };
                setItems(newItems);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];

// Convert array of labels into array of {label, checked}
function generateItemsArray(items) {
  return items.map((label) => ({ label, checked: false }));
}

// Determine if no items are selected
function hasNoSelectedItems(items) {
  return items.every((item) => !item.checked);
}

// Transfer all items
function transferAllItems(itemsSrc, setItemsSrc, itemsDst, setItemsDst) {
  setItemsDst([...itemsDst, ...itemsSrc]);
  setItemsSrc([]);
}

// Transfer selected items
function transferSelectedItems(itemsSrc, setItemsSrc, itemsDst, setItemsDst) {
  const selected = itemsSrc.filter((item) => item.checked);
  const remaining = itemsSrc.filter((item) => !item.checked);

  setItemsSrc(remaining);
  setItemsDst([...itemsDst, ...selected.map((item) => ({ ...item, checked: false }))]);
}

export default function App() {
  const [itemsLeft, setItemsLeft] = useState(generateItemsArray(DEFAULT_ITEMS_LEFT));
  const [itemsRight, setItemsRight] = useState(generateItemsArray(DEFAULT_ITEMS_RIGHT));

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="transfer-list__actions">
        <button
          aria-label="Transfer all items to left list"
          disabled={itemsRight.length === 0}
          onClick={() =>
            transferAllItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)
          }
        >
          <span aria-hidden={true}>&lt;&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to left list"
          disabled={hasNoSelectedItems(itemsRight)}
          onClick={() =>
            transferSelectedItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)
          }
        >
          <span aria-hidden={true}>&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to right list"
          disabled={hasNoSelectedItems(itemsLeft)}
          onClick={() =>
            transferSelectedItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)
          }
        >
          <span aria-hidden={true}>&gt;</span>
        </button>
        <button
          aria-label="Transfer all items to right list"
          disabled={itemsLeft.length === 0}
          onClick={() =>
            transferAllItems(itemsLeft, setItemsLeft, itemsRight, setItemsRight)
          }
        >
          <span aria-hidden={true}>&gt;&gt;</span>
        </button>
      </div>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
}
