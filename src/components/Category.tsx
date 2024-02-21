import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, customCategoryState } from "../atoms";
import { Categories, ICustomCategoryForm } from "../types";

const CategoryContainer = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Select = styled.select`
  height: 2rem;
  width: 30%;
  border: 0px;
  border-radius: 4px;
  padding: 2px 12px;
`;

// TODO: styled option

const Form = styled.form`
  display: flex;
  gap: 2px;
  width: 70%;
`;

const Input = styled.input`
  height: 2rem;
  width: calc(100% - 2rem);
  border: 0px;
  border-radius: 4px;
  padding: 4px 12px;
`;

const Button = styled.button`
  height: 2rem;
  width: 2rem;
  border: 0;x;
  border-radius: 4px;
  font-size: 24px;
`;

const Category = () => {
  const {
    register,
    handleSubmit,
    setValue: setCustomCategory,
  } = useForm<ICustomCategoryForm>();
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategoreisList, setCustomCategoriesList] =
    useRecoilState(customCategoryState);

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
    <CategoryContainer>
      <Select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {!!customCategoreisList.length &&
          customCategoreisList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </Select>
      <Form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("category", {
            required: "Please put custom category",
          })}
          placeholder="Add custom category"
        />
        <Button>+</Button>
      </Form>
    </CategoryContainer>
  );
};

export default Category;
