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
  width: 7.5rem;
  margin-top: 2rem;
  padding: 0.5rem;
`;

const AddInventory = () => {
  const [inventoryName, setInventoryName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      alert("보관함이 추가되었습니다.");
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
    </Container>
  );
};

export default AddInventory;
