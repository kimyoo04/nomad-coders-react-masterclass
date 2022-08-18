import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useRecoilState} from "recoil";
import {categoryState} from "../atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const [categories, setCategory] = useRecoilState(categoryState);
  const {register, handleSubmit, setValue} = useForm<IForm>();

  useEffect(() => {
    setCategory([
      {id: 1, category: "To Do"},
      {id: 2, category: "Doing"},
      {id: 3, category: "Done"},
    ]);
  }, [setCategory]);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(categories));
  }, [categories]);

  const handleValid = ({category}: IForm) => {
    setCategory((oldCategory) => [...oldCategory, {id: Date.now(), category}]);
    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        className="category-add"
        {...register("category", {
          required: "Please write a category",
        })}
        placeholder="Write a category"
      />
      <button>+</button>
    </form>
  );
}

export default CreateCategory;
