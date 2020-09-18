import React, { SetStateAction, Dispatch } from 'react';
import { v4 as uuidV4 } from 'uuid';

import {
  Container,
  ContainerForm,
  InputBloc,
  Button,
  SelectBloc,
  FilterTodo,
} from './styles';

export interface ITodo {
  id: string;
  date: Date;
  startDate?: Date;
  text: string;
  completed: boolean;
  activeTimer?: boolean;
}

interface FormProps {
  selectedDate: Date;
  inputText: string;
  todos: ITodo[];
  editTodo: ITodo | undefined;
  setInputText: Dispatch<SetStateAction<string>>;
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  setEditTodo: Dispatch<SetStateAction<ITodo | undefined>>;
}

const Form: React.FC<FormProps> = ({
  selectedDate,
  inputText,
  setInputText,
  todos,
  setTodos,
  status,
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
      setTodos([
        ...todos,
        {
          id,
          date: selectedDate,
          text: inputText,
          completed: false,
        },
      ]);
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
      <ContainerForm>
        <InputBloc>
          <input
            value={inputText}
            onChange={inputTextHandler}
            type="text"
            placeholder="Digite aqui..."
            className={inputText !== '' ? 'active' : ''}
          />
          <Button onClick={submitTodoHandler} type="submit">
            <i className={editTodo ? 'fas fa-save' : 'fas fa-plus'} />
          </Button>
          {editTodo && (
            <Button onClick={clearEditTodoHandler} type="submit">
              <i className="fas fa-undo" />
            </Button>
          )}
        </InputBloc>
        <SelectBloc>
          <FilterTodo name="todos" onChange={statusHandler} value={status}>
            <option value="uncompleted">Em aberto</option>
            <option value="completed">Finalizadas</option>
            <option value="all">Todas</option>
          </FilterTodo>
        </SelectBloc>
      </ContainerForm>
    </Container>
  );
};

export default Form;
