import styled from "styled-components";
import { IToDo } from "../types";
import ToDo from "./ToDo";

interface CategorizedToDosProps {
  category: string;
  todos: IToDo[];
}

const Container = styled.div`
  widht: 100%;
  height: fit-content;
  padding: 12px 8px;
  background-color: rgba(99, 110, 114, 0.5);
  border-radius: 4px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  height: 2rem;
  font-size: 1.25rem;
  line-height: 1.25rem;
`;

const ToDos = styled.ul``;

const CategorizedToDos = ({ category, todos }: CategorizedToDosProps) => {
  return (
    <Container key={category}>
      <Title>{category.replaceAll("_", " ").toUpperCase()}</Title>
      <ToDos>
        {todos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ToDos>
    </Container>
  );
};

export default CategorizedToDos;
