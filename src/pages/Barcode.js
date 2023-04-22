import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
} from "@zxing/library";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Barcode = () => {
  const [localStream, setLocalStream] = useState();
  const Camera = useRef(null);
  const hints = new Map();
  const formats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODABAR,
    BarcodeFormat.EAN_13,
  ];
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  const Scan = new BrowserMultiFormatReader(hints, 5000);
  const [text, setText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [food, setFood] = useState(null);

  useEffect(() => {
    if (scanning) {
      Scanning();
    }
    return () => {
      Stop();
    };
  }, [scanning]);

  const Scanning = async () => {
    if (localStream && Camera.current) {
      try {
        await Scan.decodeFromStream(
          localStream,
          Camera.current,
          (data, err) => {
            if (data) {
              setText(data.getText());
              setScanning(false);
            } else {
              setText("");
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const StartScan = () => {
    setScanning(true);
  };

  const Stop = () => {
    if (localStream) {
      const vidTrack = localStream.getVideoTracks();
      vidTrack.forEach((track) => {
        localStream.removeTrack(track);
      });
    }
  };

  const getFoodInfo = async (barcode) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/barcode`,
        {
          params: {
            barcode: barcode,
          },
        }
      );

      console.log(response.data);
      setFood(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user" }, // 전면
        // video: { facingMode: { exact: "environment" } }, // 후면
      })
      .then((stream) => {
        console.log(stream);
        setLocalStream(stream);
      });

    return () => {
      Stop();
    };
  }, []);

  return (
    <>
      <Container>
        <video ref={Camera} id="video" />
        {text && <button onClick={() => getFoodInfo(text)}>식품 정보</button>}
        {!scanning ? (
          <button onClick={StartScan}>스캔 시작</button>
        ) : (
          <button onClick={() => setScanning(false)}>스캔 중지</button>
        )}
        {food && (
          <div>
            <p>제품명: {food.name}</p>
            <p>제품 유형: {food.type}</p>
            <p>기한 정보: {food.expInfo}</p>
            <p>바코드 번호: {food.barcode}</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Barcode;
