import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import normalImg from "./assets/images/normal.png";
import handupImg from "./assets/images/handup.png";
import hungryImg from "./assets/images/hungry.png";
import backImg from "./assets/images/back.png";

function Main() {
  const [value, setValue] = useState(1);
  const [image, setImage] = useState(normalImg); // 현재 이미지 상태
  const [isBack, setIsBack] = useState(false);

  // 밥 버튼 함수
  const handleButtonClick = () => {
    setValue((prevValue) => prevValue + 1); // 값 증가
    console.log(value);

    // 이미지를 handupImg로 변경하고 1초 후에 다시 원래 이미지로 변경
    setImage(handupImg);
    setTimeout(() => {
      updateImage(value + 1); // 버튼 클릭 후 변경된 value를 사용하여 이미지 업데이트
    }, 100); // 100ms 후에 이미지 변경
  };

  // 이미지 업데이트 함수
  const updateImage = (currentValue) => {
    if (currentValue > 5) {
      setImage(normalImg); // 값이 5 초과일 경우 normal 이미지 사용
    } else {
      setImage(hungryImg); // 값이 5 이하일 경우 hungry 이미지 사용
    }
  };

  const handleImgClick = () => {
    if (isBack) {
      updateImage(value);
      setIsBack(false);
    } else {
      setImage(backImg);
      setIsBack(true);
    }
  };

  // 게이지 바가 줄어드는 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        const newValue = prevValue > 0 ? prevValue - 1 : 0; // 값이 0보다 크면 1씩 감소

        updateImage(newValue); // 새로운 value에 따라 이미지 업데이트

        return newValue;
      });
    }, 500); // 0.5초마다 감소

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 정리
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}># 국밥</div>

        <div className={styles.gauge}>
          <div
            className={styles.fill}
            style={{ width: `${value * 10}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.body}>
        <img src={image} alt="normal" />
      </div>
      <div className={styles.footer}>
        <button onClick={handleButtonClick}></button>
      </div>
    </div>
  );
}

export default Main;
