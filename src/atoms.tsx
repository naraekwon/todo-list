import { atom, selector } from "recoil";
import { Categories, IToDo } from "./types";

export const categoryState = atom<Categories | string>({
  key: "category",
  default: Categories.TO_DO,
});

export const customCategoryState = atom<(Categories | string)[]>({
  key: "customCategoriesList",
  default: JSON.parse(localStorage.getItem("customToDosCategories") || "[]"),
});

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: JSON.parse(localStorage.getItem("toDos") || "[]"),
});

export const toDoSelector = selector<IToDo[]>({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return toDos;
  },
  set: ({ set }, newValue) => {
    set(toDoState, newValue);
    localStorage.setItem("toDos", JSON.stringify(newValue));
  },
});

export const customCategorySelector = selector<(Categories | string)[]>({
  key: "customCategorySelector",
  get: ({ get }) => {
    const customCategories = get(customCategoryState);
    return customCategories;
  },
  set: ({ set }, newValue) => {
    set(customCategoryState, newValue);
    localStorage.setItem("customToDosCategories", JSON.stringify(newValue));
  },
});
