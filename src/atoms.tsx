import { atom, selector } from "recoil";
import { Categories, IToDo } from "./types";

export const categoryState = atom<Categories | string>({
  key: "category",
  default: Categories.TO_DO,
});

export const customCategoriesListState = atom<(Categories | string)[]>({
  key: "customCategoriesList",
  default: [],
});

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const customCategories = get(customCategoriesListState);
    const categories = [
      Categories.TO_DO,
      Categories.DOING,
      Categories.DONE,
      ...customCategories,
    ];

    let results: { [key: Categories | string]: IToDo[] } = {};
    for (let category of categories) {
      results[category] = toDos.filter((todo) => todo.category === category);
    }

    return results;
  },
});
