import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atoms";
import Category from "./Category";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  return (
    <div>
      <h1> To Dos </h1>
      <hr />
      <Category />
      <CreateToDo />
      {/* {Object.keys(toDos).map((category) => {
        return (
          <div key={category}>
            <h2>{category}</h2>
            <ul>
              {toDos[category].map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
              ))}
            </ul>
          </div>
        );
      })} */}
      {toDos.map((toDo) => {
        return (
          <div key={toDo.id}>
            <ul>
              <ToDo key={toDo.id} {...toDo} />
            </ul>
          </div>
        );
      })}
    </div>
  );
}
export default ToDoList;
