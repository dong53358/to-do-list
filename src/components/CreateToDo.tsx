import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { FaPlus } from "react-icons/fa";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
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

const Add = styled.button`
  background-color: #c7ecee;
  border-radius: 13px;
  color: #487eb0;
  font-size: 15px;
  font-weight: 600px;
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
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
          maxLength: 18,
        })}
        placeholder="Write a to do"
      />
      <Add>
        <FaPlus />
      </Add>
    </Form>
  );
}

export default CreateToDo;
