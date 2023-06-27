import axios from "axios";
import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import SideBarElements from "../components/Sidebar/SideBarElements";
import "../css/MenuDetails.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuNavbar from "../components/NavBar/MenuNavBarElements";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import ParentContainerWrapper from "../components/Main/ParentContainerWrapper";
import AuthContext from "../AuthStore/Owner-auth-context";


const StyledTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px #ddd;
  resize: vertical;
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContentModifyButton = styled(Button)`
    margin-left: auto;
    font-size: large;
`;

const OriginModifyButton = styled(Button)`
    margin-left: auto;
    font-size: large;
`;

const ContentBody = styled.div`
    margin-top: 5rem;
    font-size: x-large;
`

const Container = styled.div`
  margin-top: 4rem;
  background-color: #f7f7f7;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const AnnounceAndOrigin = () => {
    const { restaurantId } = useParams();
    const [content, setContent] = useState("");
    const [newContent, setNewContent] = useState("");
    const [origin, setOrigin] = useState("");
    const [newOrigin, setNewOrigin] = useState("");
    const [contentEditable, setContentEditable] = useState(false);
    const [originEditable, setOriginEditable] = useState(false);

    const authCtx = useContext(AuthContext);
    const accessToken = authCtx.token;
    const token = localStorage.getItem("token")


    useEffect(() => {
        if (token === null) {
            return;
          }
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            setContent(response.data.data.restaurantContent)
            setOrigin(response.data.data.restaurantOrigin)
        })
        .catch((error) => {
            alert(error.response.data.msg);
        })
    }, [token])

    const handleContentEdit = () => {
        setContentEditable(true)   
    }

    const handleContentEditClose = () => {
        setContentEditable(false)   
    }
    const handleOriginEdit = () => {
        setOriginEditable(true)   
    }

    const handleOriginEditClose = () => {
        setOriginEditable(false)   
    }



    const handleContentSubmit = (event) => {
        event.preventDefault();
        if (token === null) {
            return;
        }
        axios.patch(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}`, {
            restaurantId: restaurantId,
            restaurantContent: newContent
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(() => {
            setContentEditable(false);
            alert("수정됐습니다.")
            window.location.reload();
        })
        .catch((error) => {
            alert(error.response.data.msg)
        })
    }

    const handleOriginSubmit = (event) => {
        event.preventDefault();
        if (token === null) {
            return;
        }
        axios.patch(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}`, {
            restaurantId: restaurantId,
            restaurantOrigin: newOrigin
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(() => {
            setOriginEditable(false);
            alert("수정됐습니다.")
            window.location.reload();
        })
        .catch((error) => {
            alert(error.response.data.msg)
        })
    }

    return (
        <div>
            <div className="side-bar">
                <SideBarElements />
            </div>
            <ParentContainerWrapper>
                <div className="menu-details-nav-bar">
                    <MenuNavbar/>
                </div>
                <Container>
                    <ContentHeader>
                        <h1>주문 안내</h1>
                        <ContentModifyButton onClick={handleContentEdit}>수정하기</ContentModifyButton> 
                    </ContentHeader>
                    <ContentBody>
                        {contentEditable ? (
                            <>
                                <StyledTextArea defaultValue={content} onChange={(event) => setNewContent(event.target.value)} />
                                <Button style={{marginLeft:"auto"}} onClick={handleContentEditClose}>취소</Button>
                                <Button style={{marginLeft:"auto"}} onClick={handleContentSubmit}>저장</Button>
                            </>
                            ) : (
                                <div className="content" style={{whiteSpace: "pre-wrap"}}>
                                    <p>{content}</p>
                                </div>
                            )}
                    </ContentBody>
                </Container>
                <Container>
                    <ContentHeader>
                        <h1>원산지 표기</h1>
                        <OriginModifyButton onClick={handleOriginEdit}>수정하기</OriginModifyButton>
                    </ContentHeader>
                    <ContentBody>
                    {originEditable ? (
                        <>
                            <StyledTextArea defaultValue={origin} onChange={(event) => setNewOrigin(event.target.value)} />
                            <Button style={{marginLeft:"auto"}} onClick={handleOriginEditClose}>취소</Button>
                            <Button style={{marginLeft:"auto"}} onClick={handleOriginSubmit}>저장</Button>
                        </>
                        ) : (
                            <div className="origin" style={{whiteSpace: "pre-wrap"}}>
                                <p>{origin}</p>
                            </div>
                        )}
                    </ContentBody>
                </Container>
            </ParentContainerWrapper>
        </div>
    );
}
export default AnnounceAndOrigin;