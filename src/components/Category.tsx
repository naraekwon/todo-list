import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { customCategoriesListState, categoryState } from "../atoms";
import { Categories, ICustomCategoryForm } from "../types";

const Category = () => {
  const {
    register,
    handleSubmit,
    setValue: setCustomCategory,
  } = useForm<ICustomCategoryForm>();
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategoreisList, setCustomCategoriesList] = useRecoilState(
    customCategoriesListState
  );

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  const handleValid = (data: ICustomCategoryForm) => {
    const trimmedCategory = data.category.replaceAll(" ", "_");
    setCustomCategoriesList((prev) => [...prev, trimmedCategory]);
    setCustomCategory("category", "");
    setCategory(trimmedCategory);
  };

  return (
    <>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {!!customCategoreisList.length &&
          customCategoreisList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </select>
      <form onSubmit={handleSubmit(handleValid)}>
        <input {...register("category")} placeholder="Add custom category" />
        <button>+</button>
      </form>
    </>
  );
};

export default Category;
