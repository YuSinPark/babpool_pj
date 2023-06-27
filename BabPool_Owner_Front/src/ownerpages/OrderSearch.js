import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBarElements from "../components/Sidebar/SideBarElements";
import ParentContainerWrapper from "../components/Main/ParentContainerWrapper";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { Button, Pagination } from "react-bootstrap";
import OrderNavbar from "../components/NavBar/OrderNavBarElements";

const Container = styled.div`
  margin-top: 3rem;
  background-color: #f7f7f7;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContentBody = styled.div`
    margin-top: 5rem;
    font-size: x-large;
`

const searchContainer = styled.div`
  background-color: white;
  margin-top: 4rem;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: xx-small;
  }
`;

const DatePickerWrapper = styled(DatePicker)`
  width: 90%;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #ffffff; /* Set background color to white */
  border-radius: 50px; /* Use a large value for border-radius to create an oval shape */
  color: black;
  border: none;
  text-align: center;
`;

const OrderSearch = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { restaurantId } = useParams();
  const token = localStorage.getItem("token")
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const searchData = {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    restaurantId: restaurantId
  }

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleSearch = () => {
    const offset = (currentPage - 1) * pageSize;

    axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/orderDetails?offset=${offset}&limit=${pageSize}`, searchData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setOrderList(response.data.data);
      })
      .catch((error) => {
        alert(error.response.data.msg)
      });
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 0);
  };
  const handleRefund = (ordersId) => {
    axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}/refund?ordersId=${ordersId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert("환불처리 되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.msg)
      });
  };
  return (
    <div>
      <div className="side-bar">
        <SideBarElements />
      </div>
      <ParentContainerWrapper>
        <OrderNavbar />
        <Container>
          <ContentHeader>
            <h1>주문 검색</h1>
          </ContentHeader>
          <ContentBody>
            {/* <div style={{ marginBottom: '1rem'}}>
              검색하고자 하는 날짜를 선택해주세요
            </div> */}
            <div className="DateSearchBar" style={{ display: 'flex', justifyContent: 'center' }}>
              <div>
                <div style={{ fontSize: '16px', paddingTop: '10px' }}>시작날짜</div>
                <DatePickerWrapper
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={(update) => {
                    setStartDate(update);
                  }}
                  showYearDropdown
                />
              </div>
              <div style={{ width: '50px' }}></div>
              <div>
                <div style={{ fontSize: '16px', paddingTop: '10px' }}>종료날짜</div>
                <DatePickerWrapper
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  selected={endDate}
                  onChange={(update) => {
                    setEndDate(update);
                  }}
                  showYearDropdown
                />
              </div>
            </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={() => {
                  setCurrentPage(1);
                  handleSearch();
                }}
                style={{ marginTop: '1rem', width: '80%' }}
              >
                검색
              </Button>
            </div>
          </ContentBody>
        </Container>
        <div>
          {orderList && orderList.length > 0 ? (
            orderList.map((order, index) => (
              <Container key={index}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h1>주문번호 {order.ordersId}</h1>
                  <div>{order.orderDetailsDate}</div>
                </div>
                <div>주문 ID: {order.memberId}</div>
                <div>주문 금액: {order.orderDetailsPrice}원</div>
                <div>배달지 : {order.orderDetailsAddress}</div>
                <div>요청사항: {order.orderDetailsComment}</div>
                <div>배달 요청사항: {order.orderDetailsRiderComment}</div>
                <div>배달 팁: {order.orderDetailsTip}원</div>
                <div>주문 상황: {order.orderDetailsStatus}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={() => handleRefund(order.ordersId)} className="btn btn-danger">환불하기</Button>
                </div>
              </Container>
            ))
          ) : (
            <div>
              {orderList === null ? (
                <div>주문 목록을 불러올 수 없습니다.</div>
              ) : (
                <>
                  <h2 style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center' }}>마지막 페이지입니다.</h2>
                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      style={{
                        marginLeft: '32px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '32px'
                      }}
                    >
                      ⬅️
                    </Button>
                    <Button
                      onClick={handleNextPage}
                      disabled={orderList.length === 0}
                      style={{
                        marginRight: '32px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '32px'
                      }}
                    >
                      ➡️
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {orderList && orderList.length > 0 && (
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  marginLeft: '32px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '32px'
                }}
              >
                ⬅️
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={orderList.length === 0}
                style={{
                  marginRight: '32px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '32px'
                }}
              >
                ➡️
              </Button>
            </div>
          )}
        </div>
      </ParentContainerWrapper>
    </div>
  )
};

export default OrderSearch;