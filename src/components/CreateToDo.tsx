import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { IToDoForm } from "../types";

const Form = styled.form`
  height: 48px;
  width: 100%;
  display: flex;
  gap: 2px;
  width: 100%;
`;

const Input = styled.input`
  height: 2rem;
  width: calc(100% - 2rem);
  border: 0px;
  border-radius: 4px;
  padding: 4px 12px;
`;

const Button = styled.button`
height: 2rem;
width: 2rem;
border: 0;x;
border-radius: 4px;
font-size: 24px;
`;

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
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <Button>+</Button>
    </Form>
  );
};

export default CreateToDo;
