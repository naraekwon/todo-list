import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { customCategoryState, toDoState } from "../atoms";
import { Categories, IToDo } from "../types";
import { ReactComponent as TrashCan } from "../icons/trash-can.svg";
import styled from "styled-components";

const TodoContainer = styled.li`
  background-color: rgba(178, 190, 195, 0.2);
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 4px;
`;

const TodoText = styled.span``;

const ButtonsContainer = styled.div`
  display: flex;
  place-content: flex-end;
`;

const Button = styled.button`
  border: 0px;
  border-radius: 4px;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const ToDo = ({ id, text, category }: IToDo) => {
  const setTodos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            category: name,
          } as IToDo;
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: IToDo["id"]) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContainer>
      <TodoText>{text}</TodoText>
      <ButtonsContainer>
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            Done
          </button>
        )}
        {!!customCategories.length &&
          customCategories.map((customCategory) => {
            if (category !== customCategory) {
              return (
                <button
                  key={customCategory}
                  name={customCategory}
                  onClick={onClick}
                >
                  {customCategory}
                </button>
              );
            }
            return null;
          })}
        <Button onClick={() => handleDelete(id)}>
          <TrashCan />
        </Button>
      </ButtonsContainer>
    </TodoContainer>
  );
};

export default ToDo;
