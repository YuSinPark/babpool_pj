import React from "react";
import { Link, useLocation } from "react-router-dom";
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

  &.active {
    color: #4040FF;
  }
`;

const OrderNavbar = () => {
  const { restaurantId } = useParams();

  const location = useLocation();
  
  const isActiveTab = (pathname) => {
    return location.pathname === pathname ? "active" : "";
  };
    return (
        <NavbarWrapper>
          <NavbarLink 
          to={`/MyStore/${restaurantId}/OrderManagement`}
          className={isActiveTab(`/MyStore/${restaurantId}/OrderManagement`)}
          style={{ fontWeight: 'bold'}}
          >
            주문 대기
          </NavbarLink>
          <NavbarLink
           to={`/MyStore/${restaurantId}/OrderManagement/Cooking`}
           style={{ fontWeight: 'bold'}}
           className={isActiveTab(`/MyStore/${restaurantId}/OrderManagement/Cooking`)} >조리 중</NavbarLink>
          <NavbarLink
           to={`/MyStore/${restaurantId}/OrderManagement/Cooked`}
           style={{ fontWeight: 'bold'}}
           className={isActiveTab(`/MyStore/${restaurantId}/OrderManagement/Cooked`)}>조리 완료</NavbarLink>
          {/* <NavbarLink 
          to={`/MyStore/${restaurantId}/OrderManagement/PickUp`} 
          style={{ fontWeight: 'bold'}}
          className={isActiveTab(`/MyStore/${restaurantId}/OrderManagement/PickUp`)}>픽업 완료</NavbarLink> */}
          <NavbarLink
           to={`/MyStore/${restaurantId}/OrderManagement/OrderSearch`}
           style={{ fontWeight: 'bold'}}
           className={isActiveTab(`/MyStore/${restaurantId}/OrderManagement/OrderSearch`)}>주문 조회</NavbarLink>
        </NavbarWrapper>
    );
}

export default OrderNavbar;