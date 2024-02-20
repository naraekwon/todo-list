export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ICustomCategoryForm {
  category: string;
}

export interface IToDoForm {
  toDo: string;
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories | string;
}
