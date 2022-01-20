import React, { useState, useReducer, useContext } from "react";
type Todo = {
  text: string;
  done: boolean;
};
const initialState = [
  { text: "learn html", done: true },
  { text: "learn css", done: true },
  { text: "learn js", done: false },
  { text: "learn react", done: false }
];
// same partern as redux
function todosReducer(state = initialState, action: { type: string; payload: Todo }) {
  switch (action.type) {
    case "toggle":
      return state.map(t => {
        // TODO find best match...
        //if (t.text === action.payload.text) {
        if (t === action.payload) {
          return { ...t, done: !t.done };
        }
        return t;
      });
    case "add":
      return [...state, action.payload];
    default:
      return state; // no new object
    //throw new Error();
  }
}
// TODO create test for:
//const state = todosReducer([], {type: 'add', payload: {text: 'reducer', done: false}})
//expect(state).toBeExact([{text: 'reducer', done: false}])
const TodosView = ({ todos, toggleTodo }: { todos: Todo[]; toggleTodo: (todo: Todo) => void }) => (
  <ul>
    {todos.map((t, i) => (
      <li
        key={i}
        style={{ textDecoration: t.done ? "line-through" : "none" }}
        onClick={() => {
          toggleTodo(t);
        }}
      >
        {t.text}
      </li>
    ))}
  </ul>
);
const TodosContext = React.createContext<{
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
  addTodo(todo: Todo): void;
} | null>(null);
const Todos = () => {
  const { todos, toggleTodo } = useContext(TodosContext)!;
  return <TodosView todos={todos} toggleTodo={toggleTodo} />;
};
const TodosInfo = () => {
  const { todos, addTodo } = useContext(TodosContext)!;
  const leftCount = todos.filter(t => !t.done).length;
  return <TodosInfoView count={leftCount} addTodo={addTodo} />;
};
function TodosInfoView({ count, addTodo }: { count: number; addTodo(todo: Todo): void }) {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addTodo({
          text,
          done: false
        });
        setText("");
      }}
    >
      <div>
        You have{" "}
        <strong className={"App-link"} style={count ? {} : { color: "green" }}>
          {count}
        </strong>{" "}
        tasks left.
      </div>
      <input type="text" value={text} required onChange={e => setText(e.target.value)} placeholder="Add new item" />
      <button type={"submit"}>Add</button>
    </form>
  );
}
export const TodosApp = () => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  const toggleTodo = (todo: Todo) => {
    dispatch({ type: "toggle", payload: todo });
  };
  const addTodo = (todo: Todo) => {
    dispatch({ type: "add", payload: todo });
  };
  return (
    <div>
      <TodosContext.Provider value={{ todos, toggleTodo, addTodo }}>
        <Todos />
        <hr />
        <WrappTodosInfo />
      </TodosContext.Provider>
    </div>
  );
};
// TODO remove - this is for example to show wrapping in many levels
function WrappTodosInfo() {
  return <TodosInfo />;
}
