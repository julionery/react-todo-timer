import React, { Dispatch, SetStateAction } from 'react';
import { ITodo } from '../Form';

import { Container } from './styles';

interface TodoProps {
  todo: ITodo;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setEditTodo: Dispatch<SetStateAction<ITodo | undefined>>;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  todos,
  setTodos,
  setInputText,
  setEditTodo,
}) => {
  const deleteHandler = () => {
    setTodos(todos.filter(item => item.id !== todo.id));
  };

  const editHandler = () => {
    setInputText(todo.text);
    setEditTodo(todo);
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item: ITodo) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      }),
    );
  };

  return (
    <Container>
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </li>
      <button onClick={editHandler} className="edit-btn" type="button">
        <i className="fas fa-edit" />
      </button>
      <button onClick={completeHandler} className="complete-btn" type="button">
        <i className="fas fa-check" />
      </button>
      <button onClick={deleteHandler} className="trash-btn" type="button">
        <i className="fas fa-trash" />
      </button>
    </Container>
  );
};

export default Todo;
