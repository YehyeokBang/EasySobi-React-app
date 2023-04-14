import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 5rem;
`;

const Text = styled.div`
  margin-top: 6rem;
  width: 26rem;
  font-size: 1.2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 15rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  width: 6.5rem;
  height: 2.3rem;
  background-color: #96d2c8;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
  border-radius: 10px;
  margin-top: 1rem;
  cursor: pointer;
  box-shadow: 1px 1px 5px gray;

  &:hover {
    box-shadow: 3px 3px 15px gray;
  }
`;
const AddInventory = () => {
  const [inventoryName, setInventoryName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inventoryName) {
      alert("보관함 이름을 입력해주세요.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/inventory/create`,
        { inventoryName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/mypage");
    } catch (error) {
      console.error(error);
      alert("보관함 추가에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>보관함 추가</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="보관함 이름을 입력하세요."
          value={inventoryName}
          onChange={(event) => setInventoryName(event.target.value)}
        />
        <Button type="submit">추가</Button>
      </Form>
      <Text>
        <h3>사용 Tips</h3>
        식품을 보관하는 곳의 이름을 <br />
        알아볼 수 있게 작성하세요! <br />
        예) 냉장고, 회사 탕비실 등
      </Text>
    </Container>
  );
};

export default AddInventory;
