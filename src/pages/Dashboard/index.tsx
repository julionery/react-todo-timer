import React, { useState, useEffect, useCallback } from 'react';

import { Container } from './styles';
import Form, { ITodo } from '../../components/Form';
import TodoList from '../../components/TodoList';

const Dashboard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState('all');
  const [editTodo, setEditTodo] = useState<ITodo>();

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  const filterHandler = useCallback(() => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [todos, status]);

  const getLocalTodos = useCallback(() => {
    if (localStorage.getItem('@todo-timer:todos') === null) {
      localStorage.setItem('@todo-timer:todos', JSON.stringify([]));
    } else {
      const todoLocal = localStorage.getItem('@todo-timer:todos');
      if (todoLocal) {
        setTodos(JSON.parse(todoLocal));
      }
    }
  }, []);

  const saveLocalTodos = useCallback(() => {
    localStorage.setItem('@todo-timer:todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    getLocalTodos();
  }, [getLocalTodos]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [filterHandler, saveLocalTodos]);

  return (
    <>
      <Container>
        <h1>Task Manager</h1>
        <Form
          todos={todos}
          setTodos={setTodos}
          inputText={inputText}
          setInputText={setInputText}
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
        />
      </Container>
    </>
  );
};

export default Dashboard;
