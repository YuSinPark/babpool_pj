import React from "react";
import { Carousel } from "react-bootstrap";
import "../../css/CarouselCard.css"


const CarouselCard = () => {
    
  return (
    <Carousel indicators={false} className="text-center" interval={8000}>
      <Carousel.Item>
        <div
          className="card"
          style={{ backgroundColor: "#f1c7e987", padding: "51px", border: 'none' }}
        >
          <h3>❗ 공지사항 ❗</h3>
          <div style={{ fontWeight: 'bold'}}>🙅‍♂️ 크롬 알람설정을 해제하시면 밥풀을 사용할 수 없어요 🙅‍♂️</div>
          <div style={{ fontWeight: 'bold'}}>🙆‍♂️ 왼쪽 상단 느낌표를 눌러 알람을 허용해주세요 🙆‍♂️</div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="card"
          style={{ backgroundColor: "#afd7a945", padding: "51px", border: 'none' }}
        >
          <h3>💝혜택💝</h3>
          <div>사장님이 온라인으로 직접 가입하시면,</div>
          <div style={{ fontWeight: 'bold'}}>최대 100만원 상당의 광고지원금을 지원해드려요! 🎁</div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          className="card"
          style={{ backgroundColor: "#b1c7e987", padding: "51px", border: 'none' }}
        >
          <h3>💝혜택💝</h3>
          <div>100번째 선착순 입점하시는 사장님들께</div>
          <div style={{ fontWeight: 'bold'}}>최대 50만원 상당의 가게지원금을 드려요! 🎁</div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselCard;