import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState } from "../atoms";
import { FaPlus } from "react-icons/fa";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border: 0px;
  background-color: #487eb0;
  border-bottom: 1px solid white;
  color: white;
  font-size: 15px;
  font-weight: 600;
  &::placeholder {
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #c7ecee;
  border-radius: 13px;
  color: red;
  font-size: 15px;
  margin-left: 10px;
  border: 0px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  &:hover {
    background-color: #95afc0;
  }
`;

interface IForm {
  category: string;
}
const LOCAL_CATE_KEY = "category";

const CreateCategory = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = (data: IForm) => {
    setCategories([data.category, ...categories]);
    localStorage.setItem(
      LOCAL_CATE_KEY,
      JSON.stringify([data.category, ...categories])
    );
    setValue("category", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("category", { required: "Please write a category" })}
        placeholder="Write a category"
      />
      <Button>
        <FaPlus />
      </Button>
    </Form>
  );
};

export default CreateCategory;
