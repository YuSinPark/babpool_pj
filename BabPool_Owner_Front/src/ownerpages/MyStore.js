import React, {useState, useEffect, useContext} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import ParentContainerWrapper from "../components/Main/ParentContainerWrapper";
import AuthContext from "../AuthStore/Owner-auth-context";
import { confirmAlert } from "react-confirm-alert";


const RestaurantSelectContainer = styled.div`
  background-color: #f7f7f4;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 45%;
  justify-content: center;
  border-radius: 20px;

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

const RestaurantListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: -10px;
`;

const MyStore = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const authCtx = useContext(AuthContext);
    const accessToken = authCtx.token;
    const token = localStorage.getItem("token")
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [restaurantIdList, setRestaurantIdList] = useState([]);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      console.log(selectedOption);
    };

    const toggleDropdown = () => {
      setSelectedOption("")
      setIsDropdownVisible(!isDropdownVisible);
    };

  

    useEffect(() => {
      if (token === null) {
        return;
      }
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
          setRestaurants(response.data.data);
          const restaurantIdList = response.data.data.map((restaurant) => restaurant.restaurantId);
          setRestaurantIdList(restaurantIdList);
          })
        .catch((error) => {
          setErrorMessage(error.response.data.msg);
          alert("입점 신청을 먼저 진행해 주세요.")
          window.location.href="/";
        });
    }, [token]); 

    return (
      <div>
        <ParentContainerWrapper>
            <div className='Announce-Bar'>
            <div className='AnnounceBarWrapper' style={{ display: "flex",justifyContent: "space-between"}}>
              <div style={{ fontWeight: 'bold'}}>내 가게 정보</div>
              <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={toggleDropdown}>
                전체 운영관리
                {isDropdownVisible && (
                  <div style={{ position: 'absolute', backgroundColor: '#fff', border: '1px solid #ccc',  width: '220px', height: '120px'  }}>
                    <ul style={{ color: 'black'}}>
                      <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => {
                        toggleDropdown();
                        confirmAlert({
                          title: '가게 상태변경',
                          message: '전체 영업을 시작하시겠습니까?',
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
                        전체 열기 🔓
                      </div>
                      <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => {
                        toggleDropdown();
                        confirmAlert({
                          title: '가게 상태변경',
                          message: '전체 영업종료 하시겠습니까?',
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
                        전체 닫기 🔒
                      </div>
                      <div style={{ marginRight: '2rem', cursor: 'pointer' }} onClick={() => {
                        toggleDropdown();
                        confirmAlert({
                          title: '가게 상태변경',
                          message: '전체 영업중지 하시겠습니까?',
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
                        전체 중지 🥱
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            </div>
              <RestaurantListContainer>
                {Array.isArray(restaurants) && restaurants.map((restaurant) => (
                  <RestaurantSelectContainer key={restaurant.restaurantId}>
                    <Link to={`/MyStore/${restaurant.restaurantId}`} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: '#000000'
                      }}
                    >
                      <div className="restaurant-photo">
                        <img
                          src={restaurant.restaurantPhoto ? restaurant.restaurantPhoto : process.env.PUBLIC_URL + '/images/owner.jpg'}
                          style={{ maxWidth: '80%', height: 'auto', borderRadius: '10px' }}
                        />
                      </div>
                      <br/>
                      <div className="restaurant-introduce">
                        <h2 style={{ fontWeight: 'bold'}}>{restaurant.restaurantName}</h2>
                        <div>운영중 : {restaurant.restaurantStatus === 'Y' ? '⭕' : (restaurant.restaurantStatus === 'N' ? '❌' : '🛑')}</div>
                      </div>
                    </Link>
                  </RestaurantSelectContainer>
                ))}
              </RestaurantListContainer>
        </ParentContainerWrapper>
    </div>
  )
};
export default MyStore;