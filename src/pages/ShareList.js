import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";

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
  font-size: 1.2rem;
`;

const TextPlus = styled.div`
  text-align: center;
  margin-top: 15rem;
  font-size: 1.2rem;
`;

const InventoryList = styled.ul`
  list-style: none;
  padding: 0rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Inven = styled(Link)`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  color: black;
  text-decoration: none;
`;

const InventoryBorder = styled.div`
  width: 320px;
  border: 2px solid gray;
  padding: 1.3rem;
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

const customStyles = {
  content: {
    top: "35vh",
    left: "22vw",
    right: "22vw",
    bottom: "45vh",
    borderRadius: "15px",
  },
};

const TextAccept = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin-top: 1.2rem;
`;

const OkButton = styled.button`
  position: absolute;
  bottom: 0.8rem;
  left: 1rem;
  width: 4.5rem;
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

const NoButton = styled.button`
  position: absolute;
  bottom: 0.8rem;
  right: 1rem;
  width: 4.5rem;
  height: 2.3rem;
  background-color: #888888;
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

const ShareList = () => {
  const [shareInventory, setShareInventory] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getInventory = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/share/list`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setShareInventory(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getInventory();
  }, []);

  const acceptInventory = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (selectedInventory) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/share/${selectedInventory.inventoryId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setModalIsOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleHome = () => {
    navigate(`/mypage`);
  };

  const openModal = (inventory) => {
    setSelectedInventory(inventory);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!shareInventory) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <InventoryTitle>공유 목록</InventoryTitle>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <TextAccept>정말 수락하시겠습니까?</TextAccept>
        <OkButton onClick={acceptInventory}>확인</OkButton>
        <NoButton onClick={closeModal}>취소</NoButton>
      </Modal>
      <InventoryContainer>
        {shareInventory.length === 0 ? (
          <TextPlus>공유받은 보관함이 없습니다.</TextPlus>
        ) : (
          <Text>공유 목록</Text>
        )}
        <InventoryList>
          {shareInventory.map((inventory) => (
            <Inven
              key={inventory.inventoryId}
              onClick={() => openModal(inventory)}
            >
              <InventoryBorder>{inventory.inventoryName}</InventoryBorder>
              <br />
            </Inven>
          ))}
        </InventoryList>
        <GoHome onClick={handleHome}>🏠︎</GoHome>
      </InventoryContainer>
    </Container>
  );
};

export default ShareList;
