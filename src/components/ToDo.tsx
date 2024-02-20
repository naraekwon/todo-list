import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { customCategoriesListState, toDoState } from "../atoms";
import { Categories, IToDo } from "../types";

const ToDo = ({ id, text, category }: IToDo) => {
  const setTodos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoriesListState);

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

  return (
    <li>
      <span>{text}</span>
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
    </li>
  );
};

export default ToDo;
