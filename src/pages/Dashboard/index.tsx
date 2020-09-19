import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, isToday, isSameDay } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import usePersistedState from '../../utils/usePersistedState';
import Form, { ITodo } from '../../components/Form';
import TodoList from '../../components/TodoList';
import getTimeByMiliseconds from '../../utils/getTimeByMiliseconds';

import {
  Container,
  Info,
  StatusCard,
  CalendarCard,
  TaskBoard,
  TaskBoardHeader,
} from './styles';

const Dashboard: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [inputText, setInputText] = useState('');
  const [editTodo, setEditTodo] = useState<ITodo>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);

  const [status, setStatus] = usePersistedState<string>(
    '@todo-timer:status',
    'all',
  );

  const getLocalTodos = useCallback(() => {
    if (localStorage.getItem('@todo-timer:todos') === null) {
      localStorage.setItem('@todo-timer:todos', JSON.stringify([]));
    } else {
      const todoLocal = localStorage.getItem('@todo-timer:todos');
      if (todoLocal) {
        const items = JSON.parse(todoLocal);
        const allTodos = items.map((item: ITodo) => {
          return {
            ...item,
            date: new Date(item.date),
            startDate: item.startDate && new Date(item.startDate),
          };
        });

        setTodos(allTodos);
        setCompletedTodos(
          allTodos.filter((todo: ITodo) => todo.completed === true),
        );
      }
    }
  }, []);

  const saveLocalTodos = useCallback(() => {
    localStorage.setItem('@todo-timer:todos', JSON.stringify(todos));
  }, [todos]);

  const dateChangeHandler = useCallback((day: Date) => {
    setSelectedDate(day);
    setTabIndex(1);
    const element = document.getElementById('todoForm');
    setTimeout(() => {
      window.scrollTo({
        behavior: element ? 'smooth' : 'auto',
        top: element ? element.offsetTop - 120 : 580,
      });
    }, 100);
  }, []);

  const filterHandler = useCallback(() => {
    switch (status) {
      case 'completed':
        setFilteredTodos(
          todos
            .filter(
              todo =>
                todo.completed === true && isSameDay(selectedDate, todo.date),
            )
            .reverse(),
        );
        break;
      case 'uncompleted':
        setFilteredTodos(
          todos
            .filter(
              todo =>
                todo.completed === false && isSameDay(selectedDate, todo.date),
            )
            .reverse(),
        );
        break;
      case 'allDay':
        if (selectedDate) {
          setFilteredTodos(
            todos
              .filter(todo => {
                const todoDate = todo.date;
                if (
                  selectedDate.getDate() === todoDate.getDate() &&
                  selectedDate.getMonth() === todoDate.getMonth() &&
                  selectedDate.getFullYear() === todoDate.getFullYear()
                ) {
                  return todo;
                }
                return null;
              })
              .reverse(),
          );
        }
        break;
      default:
        setFilteredTodos(todos);
        break;
    }

    setCompletedTodos(
      todos.filter((todo: ITodo) => todo.completed === true).reverse(),
    );
  }, [todos, status, selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  useEffect(() => {
    getLocalTodos();
  }, [getLocalTodos]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [filterHandler, saveLocalTodos]);

  const totalHoursWorked = useMemo(() => {
    const { totalMiliseconds } = completedTodos.reduce(
      (accumulator, todo) => {
        if (todo.miliseconds) {
          accumulator.totalMiliseconds += todo.miliseconds;
        }

        return accumulator;
      },
      { totalMiliseconds: 0 },
    );
    const time = getTimeByMiliseconds(totalMiliseconds);

    const hours = time.h >= 10 ? `${time.h}h:` : `0${time.h}h:`;

    const minutes = time.m >= 10 ? `${time.m}m:` : `0${time.m}m:`;
    const seconds = time.s >= 10 ? `${time.s}s` : `0${time.s}s`;

    return `${hours}${minutes}${seconds}`;
  }, [completedTodos]);

  const totalTaskOpen = useMemo(() => {
    const todosOpens = todos.filter(todo => todo.completed === false);
    return todosOpens.length;
  }, [todos]);

  return (
    <Container>
      <Info>
        <StatusCard>
          <strong>Olá, </strong>
          <strong>Resumo de suas tarefas:</strong>
          <span>
            Total:
            {` ${todos.length}`}
          </span>
          <span>
            Pendentes:
            {` ${totalTaskOpen}`}
          </span>
          <span>
            Concluídas:
            {` ${completedTodos.length}`}
          </span>
          <span>
            Total horas trabalhadas:
            {` ${totalHoursWorked}`}
          </span>
        </StatusCard>

        <CalendarCard>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            selectedDays={selectedDate}
            onDayClick={day => {
              dateChangeHandler(day);
            }}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </CalendarCard>
      </Info>
      <TaskBoard>
        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList dir="rtl">
            <Tab>Finalizadas</Tab>
            <Tab>Tarefas</Tab>
          </TabList>
          <TabPanel>
            <TaskBoardHeader>
              <h1>Finalizadas</h1>
              <p>Todas as tarefas finalizadas</p>
            </TaskBoardHeader>

            <TodoList
              todos={todos}
              setTodos={setTodos}
              filteredTodos={completedTodos}
              setInputText={setInputText}
              setEditTodo={setEditTodo}
              selectedDate={selectedDate}
              abaFinished
            />
          </TabPanel>
          <TabPanel>
            <TaskBoardHeader>
              <h1>Tarefas</h1>
              <p>
                <span>{selectedDateAsText}</span>
                {isToday(selectedDate) && <span> - Hoje</span>}
              </p>
            </TaskBoardHeader>
            <Form
              selectedDate={selectedDate}
              todos={todos}
              setTodos={setTodos}
              inputText={inputText}
              setInputText={setInputText}
              status={status}
              setStatus={setStatus}
              editTodo={editTodo}
              setEditTodo={setEditTodo}
            />
            <TodoList
              todos={todos}
              setTodos={setTodos}
              filteredTodos={filteredTodos}
              setInputText={setInputText}
              setEditTodo={setEditTodo}
              selectedDate={selectedDate}
            />
          </TabPanel>
        </Tabs>
      </TaskBoard>
    </Container>
  );
};

export default Dashboard;
