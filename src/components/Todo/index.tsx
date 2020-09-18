import React, { Dispatch, SetStateAction } from 'react';
import { format, isToday } from 'date-fns';

import { ITodo } from '../Form';

import {
  Container,
  TodoHeader,
  TodoFooter,
  ContainerTimer,
  TodoFooterText,
  TodoFooterButtons,
} from './styles';

interface TodoProps {
  todo: ITodo;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setEditTodo: Dispatch<SetStateAction<ITodo | undefined>>;
  abaFinished?: boolean;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  todos,
  setTodos,
  setInputText,
  setEditTodo,
  abaFinished,
}) => {
  const deleteHandler = () => {
    setTodos(todos.filter(item => item.id !== todo.id));
  };

  const editHandler = () => {
    setInputText(todo.text);
    setEditTodo(todo);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item: ITodo) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
            activeTimer: false,
          };
        }
        return item;
      }),
    );
  };

  const timerHandler = () => {
    setTodos(
      todos.map((item: ITodo) => {
        if (item.id === todo.id) {
          return {
            ...item,
            activeTimer: !item.activeTimer,
          };
        }
        return item;
      }),
    );
  };

  return (
    <Container>
      <TodoHeader>
        {!abaFinished && (
          <button onClick={completeHandler} type="button">
            <i className={`fas ${todo.completed ? 'fa-check' : ''}`} />
          </button>
        )}
        <li
          className={`${todo.completed && !abaFinished ? 'completed' : ''} ${
            abaFinished && 'abaFinished'
          }`}
        >
          {todo.text}
        </li>
        {!abaFinished && (
          <ContainerTimer>
            <button
              onClick={timerHandler}
              type="button"
              disabled={todo.completed}
            >
              <i
                className={`fas ${todo.activeTimer ? 'fa-pause' : 'fa-play'}`}
              />
            </button>
            <p className="text-timer">
              <i className="fas fa-clock" />
              00:00:00
            </p>
          </ContainerTimer>
        )}
      </TodoHeader>
      <TodoFooter>
        <TodoFooterText>
          {isToday(todo.date) ? (
            <span>{`Hoje - ${format(todo.date, 'dd/MM/yyyy')}`}</span>
          ) : (
            format(todo.date, 'dd/MM/yyyy')
          )}
        </TodoFooterText>
        {!abaFinished && (
          <TodoFooterButtons>
            <button onClick={editHandler} type="button">
              <i className="fas fa-edit" />
            </button>

            <button onClick={deleteHandler} type="button">
              <i className="fas fa-trash" />
            </button>
          </TodoFooterButtons>
        )}
      </TodoFooter>
    </Container>
  );
};

export default Todo;
