import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const NavbarWrapper = styled.div`
  border-radius: 10px;
  display: flex;
  background-color: rgb(184, 184, 184);
  height: 5rem;
  font-size: 18px;
  align-items: center;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 2.5rem;
  &:hover {
    text-decoration: underline;
  }

  &:first-child {
    margin-left: 3rem;
  }

  &:last-child {
    margin-right: 4rem;
  }
`;

const MenuNavbar = () => {
  const { restaurantId } = useParams();
    return (
        <NavbarWrapper>
          <NavbarLink to={`/MyStore/${restaurantId}/MenuManagement`} style={{ fontWeight: 'bold'}}>메뉴 편집</NavbarLink>
          <NavbarLink to={`/MyStore/${restaurantId}/MenuManagement/MenuOption`} style={{ fontWeight: 'bold'}}>메뉴 옵션 편집</NavbarLink>
          <NavbarLink to={`/MyStore/${restaurantId}/MenuManagement/Represent`} style={{ fontWeight: 'bold'}}>대표 메뉴 설정</NavbarLink>
          <NavbarLink to={`/MyStore/${restaurantId}/MenuManagement/AnnounceAndOrigin`} style={{ fontWeight: 'bold'}}>주문 안내 및 원산지</NavbarLink>
        </NavbarWrapper>
    );
}

export default MenuNavbar;