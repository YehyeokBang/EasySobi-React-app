import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyPage from "./MyPage";

const Container = styled.div`
  text-align: center;
  margin-top: 14rem;
`;

const Text = styled.p`
  margin-top: 4rem;
  color: #cacaca;
`;

const KakaoLoginBtn = styled.a`
  border: 0px;
  background-color: white;
  cursor: pointer;
`;

const Img = styled.img`
  width: 20em;
`;

const key = `${process.env.REACT_APP_CLIENT_ID}`;
const url = `${process.env.REACT_APP_REDIRECT_URL}`;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${key}&redirect_uri=${url}&response_type=code`;

const KAKAO_LOGIN_API_URL = "https://kauth.kakao.com/oauth/token";

const EASYSOBI_LOGIN_API_URL = `${process.env.REACT_APP_BASE_URL}/oauth/login`;

const Home = () => {
  const [showComponent, setShowComponent] = useState(true);
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleKakaoCallback = async () => {
    const code = new URLSearchParams(window.location.search).get("code");

    try {
      // Get Kakao access_token using the code received
      setShowComponent(false);
      const response = await axios.post(KAKAO_LOGIN_API_URL, null, {
        params: {
          grant_type: "authorization_code",
          client_id: `${process.env.REACT_APP_CLIENT_ID}`,
          redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
          code: code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      const accessToken = response.data.access_token;

      // Send access_token to the EasySobi server
      const easysobiResponse = await axios.post(
        EASYSOBI_LOGIN_API_URL,
        {
          kakaoToken: accessToken,
          fcmToken: "12341234",
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      localStorage.setItem("accessToken", easysobiResponse.data.accessToken);
      localStorage.setItem("refreshToken", easysobiResponse.data.refreshToken);
      navigate("/mypage");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/auth/kakao/callback") {
      handleKakaoCallback();
    }
  }, []);

  return (
    <>
      {showComponent ? (
        <Container>
          <h1>EasySobi</h1>
          <h3>쉬운 소비기한!</h3>
          <h3>이지소비</h3>
          <Text>카카오로 시작하기</Text>
          <KakaoLoginBtn onClick={handleKakaoLogin}>
            <Img
              src="./assets/kakaoLoginBtn.png"
              alt="kakao Login Button Img"
            />
          </KakaoLoginBtn>
        </Container>
      ) : (
        <MyPage />
      )}
    </>
  );
};

export default Home;
