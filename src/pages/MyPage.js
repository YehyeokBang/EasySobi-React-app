import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InventoryTitle = styled.h2`
  margin-top: 1.5rem;
`;

const InventoryContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid gray;
  border-radius: 10px;
  text-decoration: none;
  color: black;

  &:hover {
    box-shadow: 2px 2px 10px gray;
  }
`;

const InventoryName = styled.h3`
  margin-top: 0.5rem;
  text-decoration: none;
  font-size: 1.5rem;
`;

const ImminentItemList = styled.ul`
  list-style: none;
  margin-top: 1rem;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0rem;
`;

const ImminentItem = styled.li`
  margin-top: 0.5rem;
  text-align: center;
`;

const LogoutButton = styled.button`
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

const AddInventoryButton = styled(Link)`
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

const MyPage = () => {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/inventory`,
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

    getItems();
  }, []);

  const handleLoogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!window.confirm("정말 로그아웃 하시겠습니까?")) {
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/oauth/logout`,
        { accessToken, refreshToken },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <InventoryTitle>보관함</InventoryTitle>

        <AddInventoryButton to="/inventory/add">+</AddInventoryButton>
        <LogoutButton onClick={handleLoogout}>로그아웃</LogoutButton>
        {inventory.map((inventory) => (
          <InventoryContainer
            key={inventory.inventoryId}
            to={`/inventory/${inventory.inventoryId}`}
          >
            <InventoryName>{inventory.inventoryName}</InventoryName>
            <div>보관 물품: {inventory.itemCount}종류</div>
            <span>소비기한 임박 제품</span>
            <ImminentItemList>
              {inventory.imminentItemList.map((imminentItem) => (
                <ImminentItem key={imminentItem.id}>
                  {imminentItem.name}({imminentItem.count}개){" "}
                  {imminentItem.expDate}
                </ImminentItem>
              ))}
            </ImminentItemList>
          </InventoryContainer>
        ))}
      </Container>
    </>
  );
};

export default MyPage;
