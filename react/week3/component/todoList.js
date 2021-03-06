import React, { useEffect, useState } from "react";
import TodoItems from "./todoItems";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";

const TodoList = ({ todo, setTodo, input, setInput }) => {
  const [date, setDate] = useState(new Date());
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let string = day + "-" + month + "-" + year;

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
    )
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setTodo(result);
      });
  }, [setTodo]);

  const handleChange = e => {
    const value = e.target.value;
    setInput(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (input === "") {
      alert("Todo description must be filled out");
      return false;
    }
    setTodo([
      ...todo,
      {
        description: input,
        id: Math.floor(Math.random() * 1000),
        completed: false,
      },
    ]);
    setInput("");
  };

  const deleteTodo = removeTodo => {
    setTodo(todo.filter(todo => todo !== removeTodo));
  };

  const handleCompleted = todoId => {
    const changeComplete = todo.map(item => {
      if (item.id === todoId.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodo(changeComplete);
  };
  const handleEdit = (editValue, editedValueId) => {
    const newTodos = [...todo];
    newTodos.forEach(todo => {
      if (todo.id === editedValueId.id) {
        todo.description = editValue;
      }
    });
    setTodo(newTodos);
  };
  return (
    <>
      <div className="add-container">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            type="text"
            placeholder="Todo description"
            onChange={handleChange}
          />
          <br />
          <DatePicker date={date} onDateChange={setDate} locale={enGB}>
            {({ inputProps, focused }) => (
              <input
                className={"input" + (focused ? " -focused" : "")}
                {...inputProps}
              />
            )}
          </DatePicker>
          <br />

          <input type="submit" value="Add new todo" className="add-btn" />
        </form>
      </div>
      <div className="todo-container">
        {todo.length ? (
          <ul className="todo-list">
            {todo.map(todo => (
              <TodoItems
                key={todo.id}
                description={todo.description}
                todo={todo}
                deleteTodo={deleteTodo}
                handleCompleted={handleCompleted}
                string={string}
                handleEdit={handleEdit}
              />
            ))}
          </ul>
        ) : (
          <div>No tasks todo</div>
        )}
      </div>
    </>
  );
};

export default TodoList;
