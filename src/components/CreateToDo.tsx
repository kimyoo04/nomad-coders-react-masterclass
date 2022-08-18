import {useForm} from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {selectedCategoryState, toDoState} from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const {register, handleSubmit, setValue} = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const selectedCategory = useRecoilValue(selectedCategoryState);
  const handleValid = ({toDo}: IForm) => {
    setToDos((oldToDos) => [
      {text: toDo, id: Date.now(), category: selectedCategory},
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>+</button>
    </form>
  );
}

export default CreateToDo;
