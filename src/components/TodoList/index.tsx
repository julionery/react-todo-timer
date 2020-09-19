import React, { Dispatch, SetStateAction, useMemo } from 'react';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Todo from '../Todo';
import { ITodo } from '../Form';
import getTimeByMiliseconds from '../../utils/getTimeByMiliseconds';

import { Container, List, TotalsPanel } from './styles';

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
  const totalHoursWorked = useMemo(() => {
    const { totalMiliseconds } = filteredTodos.reduce(
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
  }, [filteredTodos]);

  return (
    <Container>
      <List>
        {abaFinished && (
          <TotalsPanel>
            <h2>
              Total de tarefas finalizados:
              {` ${filteredTodos.length}`}
            </h2>
            <h2>
              Tempo total trabalhado:
              {` ${totalHoursWorked}`}
            </h2>
          </TotalsPanel>
        )}

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

        {filteredTodos.length === 0 &&
          (abaFinished ? (
            <h3>Nenhum registro encontrado...</h3>
          ) : (
            <h3>
              Nenhum registro encontrado para o dia
              {format(selectedDate, " dd 'de' MMMM'.'", { locale: ptBR })}
            </h3>
          ))}
      </List>
    </Container>
  );
};

export default TodoList;
