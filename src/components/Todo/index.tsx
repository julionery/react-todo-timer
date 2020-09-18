import React, { Dispatch, SetStateAction, useState } from 'react';
import { format, isToday } from 'date-fns';

import { ITodo } from '../Form';

import {
  Container,
  TodoHeader,
  PainelWithLabel,
  PainelDescription,
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
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      setTodos(todos.filter(item => item.id !== todo.id));
    }
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
    if (!todo.activeTimer) {
      start();
    } else {
      stop();
    }

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

  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
  };

  let updatedMs = time.ms;
  let updatedS = time.s;
  let updatedM = time.m;
  let updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH += 1;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM += 1;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS += 1;
      updatedMs = 0;
    }
    updatedMs += 1;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
  };

  return (
    <Container>
      <TodoHeader>
      {!abaFinished && (
        <PainelWithLabel>
          <p>Temporizador</p>
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
              <span>{time.h >= 10 ? `${time.h}:` : `0${time.h}:`}</span>
              <span>{time.m >= 10 ? `${time.m}:` : `0${time.m}:`}</span>
              <span>{time.s >= 10 ? time.s : `0${time.s}`}</span>
            </p>
          </ContainerTimer>
        </PainelWithLabel>

        )}
        
        <PainelDescription>
          <p>Descrição</p>
          <li
            className={`${todo.completed && !abaFinished ? 'completed' : ''} ${
              abaFinished && 'abaFinished'
            }`}
          >
            {todo.text}
          </li>
        </PainelDescription>

        {!abaFinished && (
          <PainelWithLabel>
            <p>{`${todo.completed ? 'Reabrir' : 'Finalizar'}`}</p>
            <button onClick={completeHandler} type="button">
              <i className={`fas ${todo.completed ? 'fa-check' : ''}`} />
            </button>
          </PainelWithLabel>
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
