import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams, Link } from "react-router-dom";
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
`;

const ItemBorder = styled.div`
  border: 2px solid gray;
  padding: 1.3rem;
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
  background-color: #96d2c8;
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

const ShareButton = styled.button`
  position: fixed;
  width: 4rem;
  height: 4rem;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5%;
  background-color: #aeaeae;
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

const customStyles = {
  content: {
    top: "35vh",
    left: "22vw",
    right: "22vw",
    bottom: "45vh",
    borderRadius: "15px",
  },
};

const customStyles2 = {
  content: {
    top: "31vh",
    left: "22vw",
    right: "22vw",
    bottom: "43vh",
    borderRadius: "15px",
  },
};

const StyledInput = styled.input`
  height: 1.6rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
`;

const TextDelete = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin-top: 1.2rem;
`;

const TextShare = styled.div`
  text-align: center;
  font-size: 1.1rem;
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

const Inventory = () => {
  const params = useParams();
  const [inventory, setInventory] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");

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
        setItemList(response.data.itemList);
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

      navigate("/mypage");
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

  const handleShareInventory = async () => {
    const id = params.id;
    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/share`,
        {
          email: email,
          inventoryId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setShareModalIsOpen(false);
    } catch (error) {
      console.error(error);
    }
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
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        style={customStyles}
      >
        <TextDelete>정말 삭제하시겠습니까?</TextDelete>
        <OkButton onClick={handleDelete}>확인</OkButton>
        <NoButton onClick={() => setDeleteModalIsOpen(false)}>취소</NoButton>
      </Modal>
      <Modal
        isOpen={shareModalIsOpen}
        onRequestClose={() => setShareModalIsOpen(false)}
        style={customStyles2}
      >
        <div>
          <TextShare>
            공유하기
            <br />
            <br />
            이메일을 작성해주세요
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </TextShare>
        </div>
        <OkButton onClick={handleShareInventory}>확인</OkButton>
        <NoButton onClick={() => setShareModalIsOpen(false)}>취소</NoButton>
      </Modal>
      <InventoryContainer>
        {itemList.length === 0 ? (
          <TextPlus>아래의 + 버튼을 사용하여 식품을 추가하세요</TextPlus>
        ) : (
          <Text>제품 목록</Text>
        )}
        <ItemList>
          {inventory.itemList.map((item) => (
            <Item key={item.id} to={`/item/${item.id}`}>
              <ItemBorder>
                {item.name} ({item.count}개) 소비기한: {item.expDate}
              </ItemBorder>{" "}
              <br />
            </Item>
          ))}
        </ItemList>
        <DeleteButton onClick={() => setDeleteModalIsOpen(true)}>
          보관함 삭제
        </DeleteButton>
        <EditButton onClick={handleEdit}>보관함 수정</EditButton>
        <AddButton onClick={handleAddItem}>+</AddButton>
        <ShareButton onClick={() => setShareModalIsOpen(true)}>
          &gt;
        </ShareButton>
        <GoHome onClick={handleHome}>🏠︎</GoHome>
      </InventoryContainer>
    </Container>
  );
};

export default Inventory;
