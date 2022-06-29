import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import SelectCategory from "./SelectCategory";
import ToDo from "./ToDo";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #487eb0;
  width: 100vw;
  height: 100vh;
  button {
    cursor: pointer;
  }
`;

const Header = styled.span`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <Main>
      <Header>To Do List</Header>
      <Section>
        <SelectCategory />
        <CreateCategory />
        <CreateToDo />

        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Section>
    </Main>
  );
}

export default ToDoList;
