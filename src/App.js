import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import KakaoLogin from "./pages/KakaoLogin";
import MyPage from "./pages/MyPage";
import AddInventory from "./pages/AddInventory";
import Inventory from "./pages/Inventory";
import EditInventory from "./pages/EditInventory";
import Item from "./pages/Item";
import EditItem from "./pages/EditItem";
import AddItem from "./pages/AddItem";
import "./firebase-messaging-sw.js";

// path로 이동하면 element를 실행
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/auth/kakao/callback/*",
        element: <KakaoLogin />,
      },
    ],
  },
  {
    path: "/mypage/*",
    element: <MyPage />,
  },
  {
    path: "/inventory/add/*",
    element: <AddInventory />,
  },
  {
    path: "/inventory/:id",
    element: <Inventory />,
  },
  {
    path: "/inventory/edit/:id",
    element: <EditInventory />,
  },
  {
    path: "/item/:id",
    element: <Item />,
  },
  {
    path: "/item/add/:id",
    element: <AddItem />,
  },
  {
    path: "/item/edit/:id",
    element: <EditItem />,
  },
]);

function App() {
  const initKakao = () => {
    const jsKey = `${process.env.REACT_APP_KAKAO_SDK_KEY}`;
    const Kakao = window.Kakao;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(jsKey);
      console.log(Kakao.isInitialized());
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
