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

const EditInventory = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [inventoryName, setInventoryName] = useState("");

  const handleInputChange = (e) => {
    setInventoryName(e.target.value);
  };

  const handleEdit = async () => {
    const id = params.id;
    const accessToken = localStorage.getItem("accessToken");

    if (!inventoryName) {
      alert("보관함 이름을 입력해주세요");
      return;
    }

    if (!window.confirm("정말 수정하시겠습니까?")) {
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/inventory/${id}`,
        { inventoryName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate("/mypage");
      // redirect to mypage
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>보관함 수정</h2>
      <label htmlFor="inventoryName">보관함 이름</label>
      <Input
        type="text"
        id="inventoryName"
        value={inventoryName}
        onChange={handleInputChange}
      />
      <Button onClick={handleEdit}>수정하기</Button>
    </Container>
  );
};

export default EditInventory;
