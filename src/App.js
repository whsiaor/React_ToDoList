import { useState } from "react";
const initialList = [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Use React" },
  { id: 3, text: "Master React" },
];
export default function App() {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState(initialList);

  function handleSubmit(e) {
    e.preventDefault();
    if (!toDo) return;
    const newList = [{ id: Date.now(), text: toDo }, ...toDoList];
    setToDoList(newList);
    setToDo("");
  }

  function clearAll() {
    setToDoList([]);
  }
  function handleDelete(id) {
    setToDoList((list) => list.filter((todo) => todo.id !== id));
  }
  return (
    <div className="main">
      <TextArea
        handleSubmit={handleSubmit}
        toDo={toDo}
        onSetToDo={setToDo}
        clearAll={clearAll}
      >
        - To Do List -
      </TextArea>
      <ToDoList onDelete={handleDelete} toDoList={toDoList} />
    </div>
  );
}

function TextArea({ children, toDo, onSetToDo, handleSubmit, clearAll }) {
  return (
    <div className="textarea">
      <h1 className="h1">{children}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          value={toDo}
          onChange={(e) => onSetToDo(e.target.value)}
          type="text"
          placeholder="Write something..."
        ></input>

        <button className="add" onClick={handleSubmit}>+</button>
        {/* <Button onClick={clearAll}>ClearAll</Button> */}
      </form>
    </div>
  );
}

function ToDoList({ toDoList, onDelete }) {
  return (
    <div className="todolist">
      <ul>
        {toDoList.map((todo) => (
          <li className="list" key={todo.id}>
            <Button onClick={() => onDelete(todo.id)}>✔</Button>
            <span className="text">{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="toggle" type="button" onClick={onClick}>
      {children}
    </button>
  );
}
