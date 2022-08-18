import {atom, selector} from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export interface ICategory {
  id: number;
  category: string;
}

export const categoryState = atom<ICategory[]>({
  key: "category",
  default: [],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const selectedCategoryState = atom<string>({
  key: "selectedCategory",
  default: "To do",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState);
    const selectedCategory = get(selectedCategoryState);
    return toDos.filter((toDo) => toDo.category === selectedCategory);
  },
});
