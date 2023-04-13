import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Select = styled.select`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #2196f3;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }
`;

const EditItem = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [categoryNum, setCategoryNum] = useState(1);
  const [count, setCount] = useState(0);
  const [mfgDate, setMfgDate] = useState("2023-04-13T12:34:56.789");

  const categories = [
    { categoryNum: 1, categoryName: "가공유" },
    { categoryNum: 2, categoryName: "간편조리세트" },
    { categoryNum: 3, categoryName: "과자" },
    { categoryNum: 4, categoryName: "과채음료" },
    { categoryNum: 5, categoryName: "과채주스" },
    { categoryNum: 6, categoryName: "농후발효유" },
    { categoryNum: 7, categoryName: "두부" },
    { categoryNum: 8, categoryName: "묵류" },
    { categoryNum: 9, categoryName: "발효유" },
    { categoryNum: 10, categoryName: "베이컨류" },
    { categoryNum: 11, categoryName: "빵류" },
    { categoryNum: 12, categoryName: "생면" },
    { categoryNum: 13, categoryName: "소시지" },
    { categoryNum: 14, categoryName: "신선편의식품" },
    { categoryNum: 15, categoryName: "어묵" },
    { categoryNum: 16, categoryName: "이유식" },
    { categoryNum: 17, categoryName: "유산균음료" },
    { categoryNum: 18, categoryName: "전란액" },
    { categoryNum: 19, categoryName: "즉석섭취식품(비살균)" },
    { categoryNum: 20, categoryName: "즉석섭취식품(살균)" },
    { categoryNum: 21, categoryName: "즉석조리식품" },
    { categoryNum: 22, categoryName: "크림발효유" },
    { categoryNum: 23, categoryName: "프레스햄" },
    { categoryNum: 24, categoryName: "햄" },
  ];

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryNum(parseInt(e.target.value));
  };

  const handleCountChange = (e) => {
    setCount(parseInt(e.target.value));
  };

  const handleMfgDateChange = (e) => {
    setMfgDate(e.target.value);
  };

  const handleEdit = async () => {
    const id = params.id;
    const accessToken = localStorage.getItem("accessToken");

    if (!itemName) {
      alert("아이템 이름을 입력해주세요.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/item/create`,
        {
          name: itemName,
          categoryNum,
          count,
          mfgDate,
          inventoryId: Number(id),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate(`/inventory/${id}`);
      // redirect to mypage
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>아이템 추가</h2>
      <label htmlFor="name">아이템 이름</label>
      <Input
        type="text"
        id="name"
        value={itemName}
        onChange={handleNameChange}
      />
      <label htmlFor="categoryNum">카테고리</label>
      <Select
        id="categoryNum"
        value={categoryNum}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <option key={category.categoryNum} value={category.categoryNum}>
            {category.categoryName}
          </option>
        ))}
      </Select>
      <label htmlFor="count">수량</label>
      <Input
        type="number"
        id="count"
        value={count}
        onChange={handleCountChange}
      />
      <label htmlFor="mfgDate">제조일자</label>
      <Input
        type="datetime-local"
        id="mfgDate"
        value={mfgDate}
        onChange={handleMfgDateChange}
      />
      <Button onClick={handleEdit}>추가하기</Button>
    </Container>
  );
};

export default EditItem;
