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
    'uncompleted',
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
      default:
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

  return (
    <Container>
      <Info>
        <StatusCard>Olá,</StatusCard>
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
