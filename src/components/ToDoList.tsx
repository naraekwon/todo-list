import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import Category from "./Category";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <>
      <h1> To Dos </h1>
      <hr />
      <Category />
      <CreateToDo />
      {toDos.map((toDo) => {
        return <ToDo key={toDo.id} {...toDo} />;
      })}
    </>
  );
}
export default ToDoList;
