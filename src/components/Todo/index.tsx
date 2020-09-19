import React, {
  Dispatch,
  SetStateAction,
  useState,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react';
import {
  format,
  isToday,
  differenceInMilliseconds,
  subMilliseconds,
} from 'date-fns';

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
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();

  const updatedMs = useRef(time.ms);
  const updatedS = useRef(time.s);
  const updatedM = useRef(time.m);
  const updatedH = useRef(time.h);

  function setTimeByMiliseconds(value: number) {
    const miliseconds = value % 100;
    let seconds = Math.floor(value / 1000);
    let minutes = 0;
    let hours = 0;
    if (seconds > 60) {
      minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
    }
    if (minutes > 60) {
      hours = Math.floor(minutes / 60);
      minutes -= hours * 60;
    }

    updatedH.current = hours;
    updatedM.current = minutes;
    updatedS.current = seconds;
    updatedMs.current = miliseconds;

    setTime({ ms: miliseconds, s: seconds, m: minutes, h: hours });
  }

  const run = useCallback(() => {
    if (updatedM.current === 60) {
      updatedH.current += 1;
      updatedM.current = 0;
    }
    if (updatedS.current === 60) {
      updatedM.current += 1;
      updatedS.current = 0;
    }
    if (updatedMs.current === 100) {
      updatedS.current += 1;
      updatedMs.current = 0;
    }
    updatedMs.current += 1;
    return setTime({
      ms: updatedMs.current,
      s: updatedS.current,
      m: updatedM.current,
      h: updatedH.current,
    });
  }, []);

  useLayoutEffect(() => {
    if (todo.activeTimer) {
      if (todo.startDate) {
        const miliseconds = differenceInMilliseconds(
          new Date(),
          todo.startDate,
        );
        setTimeByMiliseconds(miliseconds);
        run();
        setInterv(setInterval(run, 10));
      }
    } else if (todo.miliseconds) {
      setTimeByMiliseconds(todo.miliseconds);
    }
  }, [run, todo.activeTimer, todo.miliseconds, todo.startDate]);

  const editHandler = () => {
    setInputText(todo.text);
    setEditTodo(todo);

    const element = document.getElementById('todoForm');
    setTimeout(() => {
      window.scrollTo({
        behavior: element ? 'smooth' : 'auto',
        top: element ? element.offsetTop - 120 : 580,
      });
    }, 100);
  };

  const completeHandler = () => {
    if (todo.completed) {
      setTodos(
        todos.map((item: ITodo) => {
          if (item.id === todo.id) {
            return {
              ...item,
              completed: false,
            };
          }
          return item;
        }),
      );
    } else {
      clearInterval(interv);
      setTodos(
        todos.map((item: ITodo) => {
          if (item.id === todo.id) {
            return {
              ...item,
              startDate: undefined,
              activeTimer: false,
              completed: true,
              miliseconds: item.startDate
                ? differenceInMilliseconds(new Date(), item.startDate)
                : item.miliseconds,
            };
          }
          return item;
        }),
      );
    }
  };

  const deleteHandler = () => {
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      setTodos(todos.filter(item => item.id !== todo.id));
    }
  };

  const timerHandler = () => {
    if (todo.activeTimer) {
      stop();
    } else {
      start();
    }
  };

  const start = () => {
    setTodos(
      todos.map((item: ITodo) => {
        if (item.id === todo.id) {
          return {
            ...item,
            startDate: item.startDate
              ? subMilliseconds(
                  item.startDate,
                  item.miliseconds ? item.miliseconds : 0,
                )
              : subMilliseconds(
                  new Date(),
                  item.miliseconds ? item.miliseconds : 0,
                ),
            activeTimer: true,
          };
        }
        return item;
      }),
    );
  };

  const stop = () => {
    clearInterval(interv);
    setTodos(
      todos.map((item: ITodo) => {
        if (item.id === todo.id) {
          return {
            ...item,
            startDate: undefined,
            activeTimer: false,
            miliseconds: differenceInMilliseconds(
              new Date(),
              item.startDate ? item.startDate : new Date(),
            ),
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
              <p className={`text-timer ${todo.completed && 'finished'}`}>
                <i className="fas fa-clock" />
                <span>{time.h >= 10 ? `${time.h}:` : `0${time.h}:`}</span>
                <span>{time.m >= 10 ? `${time.m}:` : `0${time.m}:`}</span>
                <span>{time.s >= 10 ? time.s : `0${time.s}`}</span>
              </p>
            </ContainerTimer>
          </PainelWithLabel>
        )}

        <PainelDescription>
          <p className={`${abaFinished && 'abaFinished'}`}>Descrição</p>
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
            <span>
              {`${abaFinished ? 'Hoje -' : ''}${format(
                todo.date,
                'dd/MM/yyyy',
              )}`}
            </span>
          ) : (
            format(todo.date, 'dd/MM/yyyy')
          )}
        </TodoFooterText>
        {abaFinished && (
          <span>
            <p className={`text-timer ${todo.completed && 'finished'}`}>
              <span>Tempo gasto: </span>
              <span>{time.h >= 10 ? `${time.h}:` : `0${time.h}:`}</span>
              <span>{time.m >= 10 ? `${time.m}:` : `0${time.m}:`}</span>
              <span>{time.s >= 10 ? time.s : `0${time.s}`}</span>
            </p>
          </span>
        )}
        {!todo.completed && !abaFinished && (
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
