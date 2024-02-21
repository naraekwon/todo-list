import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { IToDoForm } from "../types";

const CreateToDo = () => {
  const { register, handleSubmit, setValue: setToDo } = useForm<IToDoForm>();
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const handleValid = (data: IToDoForm) => {
    setToDo("toDo", "");
    setTodos((prev) => [
      { text: data.toDo, id: Date.now(), category },
      ...prev,
    ]);
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
