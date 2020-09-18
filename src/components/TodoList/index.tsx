import React, { Dispatch, SetStateAction } from 'react';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Container, List } from './styles';
import Todo from '../Todo';
import { ITodo } from '../Form';

interface TodoListProps {
  todos: ITodo[];
  filteredTodos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setEditTodo: Dispatch<SetStateAction<ITodo | undefined>>;
  selectedDate: Date;
  abaFinished?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  filteredTodos,
  setTodos,
  setInputText,
  setEditTodo,
  selectedDate,
  abaFinished,
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
            abaFinished={abaFinished}
          />
        ))}

        {filteredTodos.length === 0 && (
          <h3>
            Nenhum registro encontrado para o dia
            {format(selectedDate, " dd 'de' MMMM'.'", { locale: ptBR })}
          </h3>
        )}
      </List>
    </Container>
  );
};

export default TodoList;
