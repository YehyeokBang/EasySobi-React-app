import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemContainer = styled.div`
  margin-top: 1rem;
`;

const ItemName = styled.h4`
  margin-top: 0.5rem;
`;

const DeleteButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const EditButton = styled.button`
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

const GoHome = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #fcbe77;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #dc9e47;
  }
`;

const Item = () => {
  const params = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

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

  const handleHome = () => {
    navigate(`/mypage`);
  };

  useEffect(() => {
    const id = params.id;
    const getItem = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `http://easysobi.duckdns.org/api/item/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getItem();
  }, []);

  const handleDelete = async () => {
    const id = params.id;
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/item/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!window.confirm("정말 삭제하시겠습니까?")) {
        return;
      }

      navigate(`/mypage`);
      // redirect to inventory list page
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/item/edit/${params.id}`);
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ItemName>{item.name}</ItemName>
      <ItemContainer>
        <div>카테고리: {categories[item.categoryNum].categoryName}</div>
        <div>개수: {item.count}</div>
        <div>제조일자: {item.mfgDate}</div>
        <div>소비기한: {item.expDate}</div>
        <DeleteButton onClick={handleDelete}>아이템 삭제</DeleteButton>
        <EditButton onClick={handleEdit}>아이템 수정</EditButton>
        <GoHome onClick={handleHome}>홈으로</GoHome>
      </ItemContainer>
    </Container>
  );
};

export default Item;
