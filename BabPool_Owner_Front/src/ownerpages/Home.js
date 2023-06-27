import React, { useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import CarouselCard from "../components/Util/CarouselCard";

const HomeArticle = styled.article`
  display: flex;
  min-width: 1160px;
`;

const ArticleContent = styled.div`
  position: relative;
  justify-content: center;
  margin-left: 200px;
  margin-bottom: 100px;
  min-width: 1160px;
`;

const HomePage = () => {
    return (
      <>
        <HomeArticle style={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
          <img
            src={process.env.PUBLIC_URL + '/images/ai.png'}
            alt="이미지 설명"
            style={{
              width: '100%',
              height: '70vh',
              objectFit: 'cover',
              marginBottom: '-100px',
              position: 'absolute',
              top: 96,
              left: 0,
              zIndex: 0,
            }}
            />
          <ArticleContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ position: 'relative', zIndex: 1, color: "white", fontSize: "44px", fontWeight: 'bold' }}>문앞으로 배달되는</h1>
            <h1 style={{ position: 'relative', zIndex: 1, color: "white", fontSize: "44px", fontWeight: 'bold' }}>일상의 <span style={{ color: "#0d6efd" }}>행복</span></h1>
            <br/>
            <br/>
            <p style={{ position: 'relative', zIndex: 1, color: "white", fontSize: "28px" }}>사장님도, 손님도</p>
            <p style={{ position: 'relative', zIndex: 1, color: "white", fontSize: "28px" }}>배달팁 부담은 <span>줄이고</span></p>
            <p style={{ position: 'relative', zIndex: 1, color: "white", fontSize: "28px" }}>오직 음식에만 집중할 수 있도록</p>
            <p style={{ position: 'relative', zIndex: 1, color: "white", fontSize: "28px" }}></p>
            <Button
              style={{ position: 'relative', zIndex: 1, fontSize: "25px", padding: '20px 40px', maxWidth: '300px' }}
            >
              <Link to="/Register" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
                밥풀 입점 신청하기
              </Link>
            </Button>
          </ArticleContent>
        </HomeArticle>
        <CarouselCard></CarouselCard>
      </>
    );
};

export default HomePage;