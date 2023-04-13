import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InventoryTitle = styled.h2`
  margin-top: 1.5rem;
`;

const InventoryContainer = styled.div`
  margin-top: 1rem;
`;

const Text = styled.div`
  text-align: center;
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Item = styled(Link)`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: black;
  text-decoration: none;
  border: 1px solid gray;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 1rem;
  width: 6.5rem;
  height: 2.3rem;
  background-color: #fe2348;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8rem;
  border-radius: 10px;
  margin-top: 1rem;
  cursor: pointer;
  box-shadow: 2px 2px 10px gray;

  &:hover {
    box-shadow: 3px 3px 15px gray;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 0;
  left: 1rem;
  width: 6.5rem;
  height: 2.3rem;
  background-color: #4f4fdc;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8rem;
  border-radius: 10px;
  margin-top: 1rem;
  cursor: pointer;
  box-shadow: 2px 2px 10px gray;

  &:hover {
    box-shadow: 3px 3px 15px gray;
  }
`;

const GoHome = styled.button`
  position: fixed;
  width: 4rem;
  height: 4rem;
  left: 5%;
  bottom: 5%;
  background-color: #eaeaea;
  color: black;
  border: none;
  padding: 0;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 2px 2px 10px gray;
  line-height: 4rem;

  &:hover {
    box-shadow: 3px 3px 15px gray;
  }
`;

const AddButton = styled.button`
  position: fixed;
  width: 4rem;
  height: 4rem;
  right: 5%;
  bottom: 5%;
  background-color: #eaeaea;
  color: black;
  border: none;
  padding: 0;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 2px 2px 10px gray;
  line-height: 4rem;

  &:hover {
    box-shadow: 3px 3px 15px gray;
  }
`;

const Inventory = () => {
  const params = useParams();
  const [inventory, setInventory] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const id = params.id;
    const getInventory = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/inventory/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setInventory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getInventory();
  }, []);

  const handleDelete = async () => {
    const id = params.id;
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/inventory/${id}`,
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

      navigate("/mypage");
      // redirect to inventory list page
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/inventory/edit/${params.id}`);
  };

  const handleAddItem = () => {
    navigate(`/item/add/${params.id}`);
  };

  const handleHome = () => {
    navigate(`/mypage`);
  };

  if (!inventory) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <InventoryTitle>{inventory.inventoryName}</InventoryTitle>
      <InventoryContainer>
        <Text>제품 목록</Text>
        <ItemList>
          {inventory.itemList.map((item) => (
            <Item key={item.id} to={`/item/${item.id}`}>
              {item.name} ({item.count}개) 소비기한: {item.expDate} <br />
            </Item>
          ))}
        </ItemList>
        <DeleteButton onClick={handleDelete}>보관함 삭제</DeleteButton>
        <EditButton onClick={handleEdit}>보관함 수정</EditButton>
        <AddButton onClick={handleAddItem}>+</AddButton>
        <GoHome onClick={handleHome}>🏠︎</GoHome>
      </InventoryContainer>
    </Container>
  );
};

export default Inventory;
