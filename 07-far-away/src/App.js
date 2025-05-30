import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "EU card", quantity: 1, packed: false },
  { id: 3, description: "T-shirts", quantity: 4, packed: false },
  { id: 4, description: "Underpants", quantity: 8, packed: false },
  { id: 5, description: "Socks", quantity: 8, packed: false },
  { id: 6, description: "Photo machine", quantity: 1, packed: false },
  { id: 7, description: "Charger", quantity: 1, packed: false },
];

function Logo(){
  return <h1>🏝️ Far away 📸</h1>
}

function Form({onAddItem}){
  const[description, setDescription] = useState(""),
    [quantity, setQuantity] = useState(1);

  function handleSubmit(ev){
    ev.preventDefault();

    if(!description) return;

    const newItem = {description, quantity, packed: false, id: Date.now()};
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => (i+1)).map(
          num => (
            <option value={num} key={num}>{num}</option>
          )
        )}
      </select>
      <input type="text" placeholder="Item..." value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function Item({item, onToggleItem, onDeleteItem}){
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=> onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({items, onToggleItem, onDeleteItem, onClearList}){
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  switch(sortBy) {
    case "description":
      sortedItems = items.slice()
        .sort((a, b) => a.description.localeCompare(b.description));
      break;
    case "packed":
      sortedItems = items.slice()
        .sort((a, b) => (Number(a.packed) - Number(b.packed)));
      break;
    default:
      sortedItems = items;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => <Item item={item} key={item.id} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} />)}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

function Stats(){
  return (
    <footer className="stats">
      <em>🧳You have X items on your list, and you already packed X (X%) ✈️</em>
    </footer>
  )
}

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItem(item){
    setItems(items => [...items, item]);
  }

  function handleToggleItem(id){
    setItems(items => items.map(item => item.id === id ?
      {...item, packed: !item.packed} : item
    ));
  }
  
  function handleDeleteItem(id){
    setItems(items => items.filter(i => i.id!== id));
  }
  
  function handleClearList(){
    window.confirm("Are you sure you want to delete all the items?") && setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem}/>
      <PackingList items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
        onClearList={handleClearList}/>
      <Stats />
    </div>

  );
}
