import React, { SetStateAction, Dispatch } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { Container } from './styles';

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

interface FormProps {
  inputText: string;
  todos: ITodo[];
  editTodo: ITodo | undefined;
  setInputText: Dispatch<SetStateAction<string>>;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setEditTodo: Dispatch<SetStateAction<ITodo | undefined>>;
}

const Form: React.FC<FormProps> = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  editTodo,
  setEditTodo,
}) => {
  const inputTextHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const submitTodoHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputText === '') return;

    const id = uuidV4();

    if (editTodo) {
      setTodos(
        todos.map((item: ITodo) => {
          if (item.id === editTodo.id) {
            return {
              ...item,
              text: inputText,
            };
          }
          return item;
        }),
      );
      setEditTodo(undefined);
    } else {
      setTodos([...todos, { id, text: inputText, completed: false }]);
    }

    setInputText('');
  };

  const statusHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    setStatus(e.currentTarget.value);
  };

  const clearEditTodoHandler = () => {
    setEditTodo(undefined);
    setInputText('');
  };

  return (
    <Container>
      <form>
        <input
          value={inputText}
          onChange={inputTextHandler}
          type="text"
          className="todo-input"
        />
        <button
          onClick={submitTodoHandler}
          className="todo-button"
          type="submit"
        >
          <i className={editTodo ? 'fas fa-save' : 'fas fa-plus-square'} />
        </button>
        {editTodo && (
          <button
            onClick={clearEditTodoHandler}
            className="todo-button"
            type="submit"
          >
            <i className="fas fa-undo" />
          </button>
        )}

        <div className="select">
          <select name="todos" className="filter-todo" onChange={statusHandler}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </Container>
  );
};

export default Form;
