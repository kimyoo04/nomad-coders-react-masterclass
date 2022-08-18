import React from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState, IToDo, toDoState} from "../atoms";

function ToDo({text, category, id}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoryState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name},
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {text, id, category: name as any};
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories.map(
        (data) =>
          category !== data.category && (
            <button name={data.category} onClick={onClick}>
              {data.category}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
