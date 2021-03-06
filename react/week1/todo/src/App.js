import React from "react";
import "./App.css";

const tasks = [
  {
    description: "Get out of bed",
    deadline: " Wed Sep 13 2017",
  },
  {
    description: "Brush teeth ",
    deadline: " Thu Sep 14 2017",
  },
  { description: "Eat breakfast ", deadline: " Fri Sep 15 2017" },
  {
    description: "Do the HW",
    deadline: " Thu Sep 14 2017",
  },
];

const TodoItem = props => {
  return (
    <li>
      <h3>
        {props.description}, {props.deadline}
      </h3>
    </li>
  );
};
const TodoList = () => {
  return (
    <ul>
      {tasks.map(task => {
        return (
          <TodoItem description={task.description} deadline={task.deadline} />
        );
      })}
    </ul>
  );
};

const TodoHeader = () => {
  return <h1>My Todo List</h1>;
};

function App() {
  return (
    <div className="App">
      <TodoHeader />
      <TodoList />
    </div>
  );
}

export default App;
