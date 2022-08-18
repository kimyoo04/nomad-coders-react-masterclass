import {useRecoilValue, useSetRecoilState} from "recoil";
import {categoryState, selectedCategoryState, toDoSelector} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoryState);

  function select(event: any) {
    const buttons = document.querySelectorAll(
      "button"
    ) as NodeListOf<HTMLButtonElement>;
    Array.from(buttons).forEach((button) =>
      button.classList.remove("selected")
    );
    event.target.classList.add("selected");
    setSelectedCategory(event.target.innerText);
  }

  return (
    <div>
      <h1 style={{fontSize: "32px"}}>To Dos</h1>
      <hr />
      <CreateCategory />
      <div
        className="button-wrap"
        style={{display: "flex", marginTop: "8px", marginBottom: "16px"}}
      >
        {categories?.map((data) => (
          <div
            key={data.id}
            className="button"
            style={{border: "1px solid white", marginRight: "4px"}}
          >
            <button onClick={select}>{data.category}</button>
          </div>
        ))}
      </div>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
