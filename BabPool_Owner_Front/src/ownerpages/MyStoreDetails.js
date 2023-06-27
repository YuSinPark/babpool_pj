import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SideBarElements from "../components/Sidebar/SideBarElements";
import ParentContainerWrapper from "../components/Main/ParentContainerWrapper";
import styled from "styled-components";
import AuthContext from "../AuthStore/Owner-auth-context";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { confirmAlert } from "react-confirm-alert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const today = (new Date().getDay() + 6) % 7;
function getDayName(day) {
  const dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  return dayNames[day];
}

const ContentContainerRow = styled.div`
  background-color: #ffffff;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 45%;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */

`;


const ChartContainerRow = styled.div`
  background-color: #ffffff;
  margin: 10px;
  width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  border-radius: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */

  .chart-container {
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }

`;

const MyStoreContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const MyStoreChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  flex-basis: 0;
  box-sizing: border-box;
`;



const MyStoreDetails = () => {
  const [restaurant, setRestaurant] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { restaurantId } = useParams();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const token = localStorage.getItem("token")
  const [restaurantIdList, setRestaurantIdList] = useState([restaurantId]);
  const [ thisWeekRestaurantStatistics, setThisWeekRestaurantStatistics ] = useState([]);
  const [ lastWeekRestaurantStatistics, setLastWeekRestaurantStatistics ] = useState([]);
  const [ orderDetailsCount, setOrderDetailsCount ] = useState("");


  
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  
  useEffect(() => {
    if (token === null) {
      return;
    }
    axios.get(
      `${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
    .then((response) => {
      setRestaurant(response.data.data);
    })
    .catch((error) => {
      setErrorMessage(error.response.data.msg);
      alert(error.response.data.msg)
      window.location.href="/";
    });
  }, [token]);

  useEffect(() => {
    if (token === null) {
      return;
    }
    axios.get(
      `${process.env.REACT_APP_API_ROOT}/api/v1/statistics/${restaurantId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
    .then((response) => {
      setThisWeekRestaurantStatistics(response.data.data[0]);
      setLastWeekRestaurantStatistics(response.data.data[1]);
    })
    .catch((error) => {
      setErrorMessage(error.response.data.msg);
      window.location.href="/";
    });
  }, [token]);

  useEffect(() => {
    if (token === null) {
      return;
    }
    axios.get(
      `${process.env.REACT_APP_API_ROOT}/api/v1/orderDetails/${restaurantId}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
    .then((response) => {
      setOrderDetailsCount(response.data.data);
    })
    .catch((error) => {
      setErrorMessage(error.response.data.msg);
      window.location.href="/";
    });
  }, [token]);

  const thisWeek = thisWeekRestaurantStatistics.map(item => {
    const thisWeekCount = item.dayName === getDayName(today) ? orderDetailsCount.completeCount : item.dailyCount;
    const thisWeekMoney = item.dayName === getDayName(today) ? orderDetailsCount.completeMoney : item.dailyMoney;
  
    return {
      name: item.dayName,
      thisWeekCount: isNaN(thisWeekCount) ? 0 : thisWeekCount,
      thisWeekMoney: isNaN(thisWeekMoney) ? 0 : thisWeekMoney,
    };
  });
  
  
  const lastWeek = lastWeekRestaurantStatistics.map(item => ({
    name: item.dayName,
    lastWeekCount: item.dailyCount,
    lastWeekMoney: item.dailyMoney,
  }));

  const data = thisWeek.map((item, index) => ({
    name: item.name,
    thisWeekMoney: item.thisWeekMoney,
    lastWeekMoney: lastWeek[index].lastWeekMoney,
  }));
  
  const totalWeeklyCount = thisWeekRestaurantStatistics.reduce((acc, item) => {
    const dailyCount = Number.isFinite(item.dailyCount) ? item.dailyCount : 0;
  
    return acc + dailyCount;
  }, 0);
  const starIcons = [];
  const rating = restaurant.restaurantRating;
  
  const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
  
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<FontAwesomeIcon key={i} icon={faStar} />);
    }
  
    if (hasHalfStar) {
      starIcons.push(<FontAwesomeIcon key={fullStars} icon={faStarHalf} />);
    }
  
  
  return (
    <div>
      <div className="side-bar">
        <SideBarElements />
      </div>
        <ParentContainerWrapper>
            <div className='Announce-Bar'>
                <div className='AnnounceBarWrapper' style={{ display: "flex",justifyContent: "space-between"}}>
                  <div style={{ fontWeight: 'bold'}}>내 가게 정보</div>
                  <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={toggleDropdown}>
                    <div style={{marginRight: '2rem'}}>운영중 : {restaurant.restaurantStatus === 'Y' ? '⭕' : (restaurant.restaurantStatus === 'N' ? '❌' : '🛑')}</div>
                    {isDropdownVisible && (
                      <div style={{ position: 'absolute', backgroundColor: '#fff', border: '1px solid #ccc',  width: '250px', height: '120px'  }}>
                        <ul style={{ color: 'black'}}>
                          <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => {
                            toggleDropdown();
                            confirmAlert({
                              title: '가게 상태변경',
                              message: '영업을 시작하시겠습니까?',
                              buttons: [
                                {
                                  label: '예',
                                  onClick: () => {
                                    fetch(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantIdList[0]}/status`, {
                                      method: 'PATCH',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                      },
                                      body: JSON.stringify({
                                        restaurantIdList: restaurantIdList,
                                        restaurantStatus: "Y",
                                      }),
                                    })
                                    .then(response => {
                                      window.location.reload();
                                    })
                                    .catch(error => {
                                      alert(error.response.data.msg)
                                    })
                                  }
                                },
                                {
                                  label: '아니오',
                                }
                              ]
                            });
                          }}>
                            영업개시 🤑
                          </div>
                          <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => {
                            toggleDropdown();
                            confirmAlert({
                              title: '가게 상태변경',
                              message: '영업종료 하시겠습니까?',
                              buttons: [
                                {
                                  label: '예',
                                  onClick: () => {
                                    fetch(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantIdList[0]}/status`, {
                                      method: 'PATCH',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                      },
                                      body: JSON.stringify({
                                        restaurantIdList: restaurantIdList,
                                        restaurantStatus: "N",
                                      }),
                                    })
                                    .then(response => {
                                      window.location.reload();
                                    })
                                    .catch(error => {
                                      alert(error.response.data.msg)
                                    })
                                  }
                                },
                                {
                                  label: '아니오',
                                }
                              ]
                            });
                          }}>
                            퇴근 🖐️
                          </div>
                          <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => {
                            toggleDropdown();
                            confirmAlert({
                              title: '가게 상태변경',
                              message: '영업중지 하시겠습니까?',
                              buttons: [
                                {
                                  label: '예',
                                  onClick: () => {
                                    fetch(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/${restaurantIdList[0]}/status`, {
                                      method: 'PATCH',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                      },
                                      body: JSON.stringify({
                                        restaurantIdList: restaurantIdList,
                                        restaurantStatus: "S",
                                      }),
                                    })
                                    .then(response => {
                                      window.location.reload();
                                    })
                                    .catch(error => {
                                      alert(error.response.data.msg)
                                    })
                                  }
                                },
                                {
                                  label: '아니오',
                                }
                              ]
                            });
                          }}>
                            <p>잠깐 쉴게요 🥱</p>
                          </div>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
            </div>
            <div style={{ display : "flex", marginBottom: '40px'}}>
              <h3 style={{}}>{restaurant.restaurantName} 가게의 <span style={{ fontWeight: 'bold'}}>주간 요약 정보</span>입니다</h3>
            </div>
            <MyStoreChartContainer>
              <ChartContainerRow>
                <div className="content-header" style={{ fontWeight: 'bold'}}>주간 매출액</div>
                <div className="content">
                  <ResponsiveContainer width="100%" height="100%" aspect={2}>
                    <LineChart
                      data={data}
                      margin={{
                        top: 0,
                        right: 50,
                        left: 50,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{ value: '일자', position: 'insideBottomRight', offset: -20 }}
                        tick={{ fontSize: 17 }}
                      />
                      <YAxis label={{ value: '매출 (원)', angle: -90, position: 'insideLeft', offset: -30 }} tick={{ fontSize: 17 }} />
                      <Tooltip />
                      <Legend payload={[
                        { value: '이번 주', type: 'line', color: '#8884d8' },
                        { value: '저번 주', type: 'line', color: '#82ca9d' },
                      ]} />
                      <Line type="monotone" dataKey="thisWeekMoney" name="이번 주 매출" stroke="#8884d8" />
                      <Line type="monotone" dataKey="lastWeekMoney" name="저번 주 매출" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartContainerRow>
            </MyStoreChartContainer>
            <MyStoreContentContainer>
            <ContentContainerRow>
              <div className="content-header">매장 평점</div>

              <div className="order-count" style={{ marginTop: '10px' }}>
                <div>
                {starIcons}
                </div>
              </div>

            </ContentContainerRow>
              <ContentContainerRow>
                <div className="content-header">주간 주문 수</div>
                <div className="reply-count" style={{ marginTop: '10px'}}>
                <div><span style={{ fontWeight: 'bold' }}>{String(totalWeeklyCount)}</span> 건</div>
                </div>
              </ContentContainerRow>
              <ContentContainerRow>
                <div className="content-header">매장 좋아요 수</div>
                <div className="like-count" style={{ marginTop: '10px'}}>
                <div><span style={{ fontWeight: 'bold' }}>{restaurant.restaurantLikeCount || 0}</span> 개</div>
                </div>
              </ContentContainerRow>
              <ContentContainerRow>
                <div className="content-header">매장 리뷰 수</div>
                <div className="reply-count" style={{ marginTop: '10px'}}>
                <div><span style={{ fontWeight: 'bold' }}>{restaurant.restaurantReply || 0}</span> 건</div>
                </div>
              </ContentContainerRow>
              <ContentContainerRow style={{ width: '90%' }}>
                <div className="content-header">요청 처리 현황</div>
                <div className="request-current" style={{ display: 'flex' }}>
                  <div style={{ marginRight: '100px' }}>배달완료: <span style={{ fontWeight: 'bold' }}>{orderDetailsCount.completeCount}</span></div>
                  <div style={{ marginRight: '100px' }}>조리중: <span style={{ fontWeight: 'bold' }}>{orderDetailsCount.cookingCount}</span></div>
                  <div style={{ marginRight: '100px' }}>배달중: <span style={{ fontWeight: 'bold' }}>{orderDetailsCount.inDeliveryCount}</span></div>
                  <div>취소: <span style={{ fontWeight: 'bold' }}>{orderDetailsCount.cancelCount}</span></div>
                </div>
              </ContentContainerRow>
            </MyStoreContentContainer>
        </ParentContainerWrapper>
    </div>
  );
};

export default MyStoreDetails;