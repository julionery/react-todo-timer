import React, { Dispatch, SetStateAction } from 'react';

import { Container, List } from './styles';
import Todo from '../Todo';
import { ITodo } from '../Form';

interface TodoListProps {
  todos: ITodo[];
  filteredTodos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setEditTodo: Dispatch<SetStateAction<ITodo | undefined>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  filteredTodos,
  setTodos,
  setInputText,
  setEditTodo,
}) => {
  return (
    <Container>
      <List>
        {filteredTodos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            setInputText={setInputText}
            setEditTodo={setEditTodo}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
