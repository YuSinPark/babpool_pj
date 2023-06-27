import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const SideBarElements = () => {
  const { restaurantId } = useParams();

  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '0', 
      transform: 'translateY(-50%)', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      boxShadow: '1px 0px 5px rgba(0, 0, 0, 0.1)',
      zIndex: 101
    }}>
      <Nav className="fixed-left flex-column" defaultActiveKey="/MyStore" variant="light" style={{ height: 'auto' }}>
        <Nav.Item>
          <Nav.Link className='text-black' as={Link} to={`/MyStore/${restaurantId}`}>
            <span role="img" aria-label="menu">🏠 가게정보</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-black' as={Link} to={`/MyStore/${restaurantId}/MenuManagement`}>
            <span role="img" aria-label="menu">📖</span> 메뉴관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-black' as={Link} to={`/MyStore/${restaurantId}/SoldOutHide`}>
            <span role="img" aria-label="hide">❌</span> 품절 숨김처리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-black' as={Link} to={`/MyStore/${restaurantId}/ReviewManagement`}>
            <span role="img" aria-label="review">📫</span> 리뷰관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-black' as={Link} to={`/MyStore/${restaurantId}/OrderManagement`}>
            <span role="img" aria-label="sales">🛵</span> 주문관리
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='text-black' as={Link} to={`/MyStore/${restaurantId}/SalesManagement`}>
            <span role="img" aria-label="sales">💲</span> 매출관리
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SideBarElements;