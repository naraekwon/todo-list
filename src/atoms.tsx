import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Categories, IToDo } from "./types";

const { persistAtom: customToDosCategoriesPersistAtom } = recoilPersist({
  key: "customToDosCategories",
  storage: localStorage,
  converter: JSON,
});

const { persistAtom: toDosPersistAtom } = recoilPersist({
  key: "toDos",
  storage: localStorage,
  converter: JSON,
});

export const categoryState = atom<Categories | string>({
  key: "category",
  default: Categories.TO_DO,
});

export const customCategoryState = atom<(Categories | string)[]>({
  key: "customCategoriesList",
  default: JSON.parse(localStorage.getItem("customToDosCategories") || "[]"),
  effects_UNSTABLE: [customToDosCategoriesPersistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDos",
  default: JSON.parse(localStorage.getItem("toDos") || "[]"),
  effects_UNSTABLE: [toDosPersistAtom],
});

export const categorizedToDoSelector = selector<{ [key: string]: IToDo[] }>({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);

    const categorizedToDos = toDos.reduce((result, todo) => {
      if (result[todo.category]) {
        result[todo.category].push(todo);
      } else {
        result[todo.category] = [todo];
      }
      return result;
    }, {} as { [key: string]: IToDo[] });
    return categorizedToDos;
  },
});
