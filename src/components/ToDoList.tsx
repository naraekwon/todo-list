import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categorizedToDoSelector } from "../atoms";
import CategorizedToDos from "./CategorizedToDos";
import Category from "./Category";
import CreateToDo from "./CreateToDo";

const ToDoListContainer = styled.div`
  width: 375px;
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
`;

const ToDoTitle = styled.h1`
  height: 4rem;
  font-size: 2rem;
  line-height: 2rem;
  text-align: center;
`;

function ToDoList() {
  const categorizedToDos = useRecoilValue(categorizedToDoSelector);

  return (
    <ToDoListContainer>
      <ToDoTitle> To Dos </ToDoTitle>
      <Category />
      <CreateToDo />
      {Object.keys(categorizedToDos).map((category) => (
        <CategorizedToDos
          key={category}
          category={category}
          todos={categorizedToDos[category]}
        />
      ))}
    </ToDoListContainer>
  );
}
export default ToDoList;
