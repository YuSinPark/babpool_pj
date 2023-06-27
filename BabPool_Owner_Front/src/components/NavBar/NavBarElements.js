import { useContext, useEffect } from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../AuthStore/Owner-auth-context';

const NavBarElements = () => {

  const authCtx = useContext(AuthContext);
  let isLogin = authCtx.isLoggedIn;
  let navigate = useNavigate();

  useEffect(() => {
    if(isLogin) {
      authCtx.getUser();
    }
  }, [isLogin])
  
  const toggleLogouthandler = () => {
    authCtx.logout();
    navigate('/');
  }
  
  return (
    <Navbar
      className="position-fixed"
      expand="lg"
      bg="white"
      variant="white"
      style={{
        left: 0,
        right: 0,
        padding: '25px',
        paddingLeft: '161px',
        paddingRight: '161px',
        zIndex: 100,
      }}
    >      
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4">
          <img
            src={process.env.PUBLIC_URL + '/images/owner.jpg'}
            alt="로고 이미지"
            width={40}
            height={34}
            className="d-inline-block align-top me-2"
          />
          BabPool 사장님 광장</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/MyStore">내 가게 목록</Nav.Link>
          </Nav>
          <Nav>
            { authCtx.isLoggedIn ? (
              <>
                <Nav.Link href='/OwnerMypage' style={{textDecoration: 'underline', fontWeight: 'bold'}}>{authCtx.userObj.memberNickname}님</Nav.Link>
                <Nav.Link onClick={toggleLogouthandler}>로그아웃</Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link href="/OwnerLogin">로그인</Nav.Link>
              <Nav.Link href="/OwnerSignup">회원가입</Nav.Link>
              </>
            )}
            <Nav.Link eventKey={2} href="/CustomerService">
              고객센터
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarElements;