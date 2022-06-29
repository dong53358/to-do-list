import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categorySelector, IToDo, toDoState } from "../atoms";
import { FaRegWindowClose } from "react-icons/fa";
import styled from "styled-components";

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextDiv = styled.div`
  width: 300px;
  height: 20px;
  margin-right: 50px;
`;

const Text = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const Button = styled.button`
  background-color: white;
  border: 0px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    background-color: #95afc0;
  }
`;

const XButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  border-radius: 3px;
  border: 0px;
  margin-bottom: 5px;
  background-color: #c7ecee;
  color: #487eb0;
  font-size: 15px;
  &:hover {
    background-color: #95afc0;
    color: red;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categorySelector);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onXClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <Li>
      <TextDiv>
        <Text>{text}</Text>
      </TextDiv>
      {categories.map(
        (categoryItem) =>
          category !== categoryItem && (
            <Button key={categoryItem} name={categoryItem} onClick={onClick}>
              {categoryItem}
            </Button>
          )
      )}

      <XButton onClick={onXClick}>X</XButton>
    </Li>
  );
}

export default ToDo;
