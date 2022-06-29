import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categorySelector, categoryState } from "../atoms";

const Selector = styled.select`
  padding: 5px;
  background-color: red;
  color: white;
  border-radius: 3px;
  border: none;
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
`;

function SelectCategory() {
  const allCategories = useRecoilValue(categorySelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Selector value={category} onInput={onInput}>
      {allCategories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Selector>
  );
}

export default SelectCategory;
