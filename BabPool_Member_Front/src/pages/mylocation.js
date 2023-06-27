import SearchLocation from './SearchLocation';
import Currentlocation from './Currentlocation';
import App from '../App';
import '../css/Location.css'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/Location.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Modal, Text } from 'react-native';

const { kakao } = window;

export default function MylocationScreen({ navigation, route }) {
  const token = localStorage.getItem("token");
  const [searchValue, setSearchValue] = useState('');
  const [addresses, setAddresses] = useState([]);
  const memberId = route.params.memberId;
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  useEffect(() => {
    const mapContainer = document.getElementById("map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(searchValue, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setLatitude(result[0].y);
        setLongitude(result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        map.setCenter(coords);
        map.setLevel(1);
      }
    });
  }, [searchValue]);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigation.navigate('SearchLocation', { memberId: memberId, searchValue }, { headerShown: false }); // SearchLocation으로 searchValue 전달
  };
  useEffect(() => {
    if (route.params?.memberId) {
      const memberId = route.params.memberId;
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/address?memberId=${memberId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setAddresses(response.data.data))
        .catch(error => {
          console.log("등록된 주소가 없습니다.");
          setAddresses([]);
        });
    }
  }, [route.params?.memberId]);

  const openModal = () => {
    setIsModalVisible(true);
  }
  const closeModal = () => {
   
    setIsModalVisible(false);
    setIsModalVisible2(false);
  }
  const openModal2 = () => {
    setIsModalVisible2(true);
  }
  const closeModal2 = () => {
   
    setIsModalVisible2(false);
  }
  const handleAddressClick = (index) => {

    setAddresses(prevAddresses => {
      const newAddresses = [...prevAddresses];
      const memberId = route.params.memberId;
      const addressId = newAddresses[index].addressId;
      const address = newAddresses[index].address;


      navigation.navigate("App", { item: address, headerShown: false });

      axios.patch(`${process.env.REACT_APP_API_ROOT}/api/v1/address/status`, { memberId, addressId, address }, {
        headers: {
          Authorization: `Bearer ${token}` // Add token to the request headers
        }
      })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));

      return newAddresses;
    });
  };

  const handleAddressDelete = async (addressId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/address?addressId=${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add token to the request headers
        }
      });

      setAddresses(addresses.filter(address => address.addressId !== addressId));
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='location-body'>
      <div style={{paddingLeft:10}} onClick={openModal}>  <FontAwesomeIcon icon={faBars} /></div>
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'start', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                  <Text style={{ textAlign: 'start', paddingBottom: 15 }}> <div style={{ fontWeight: 700 }} onClick={openModal} className='location-setting-div'>
            내 주소 : {route.params.memberSetLocation}
          </div>

          <div onClick={openModal2} className='location-setting-div'>
            <FontAwesomeIcon icon={faCrosshairs} /> 주소 목록 보기
          </div></Text>
                  <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                    <div className="order-alert" onClick={closeModal}>^</div>
                  </view>
                </View>
              </View>
        
      </Modal>
     
      <Modal visible={isModalVisible2} animationType="fade" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '90%', maxHeight: '80%' }}>
                <Text style={{ textAlign: 'center', paddingBottom: 15 }}> <div className='address-div'>
          {addresses && addresses.map((address, index) => (
            <div
              key={index}
              className="address-item"
              onClick={() => handleAddressClick(index)}
              style={{ backgroundColor: address.address === route.params.memberSetLocation ? "rgba(59, 159, 192, 0.25)" : "" }}
            >
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {address.address}</p>
              <div onClick={(event) => {
                event.stopPropagation(); // 이벤트 전파 방지
                handleAddressDelete(address.addressId);
              }}>x</div>
            </div>
          ))}

        </div></Text>
                <view style={{ display: 'flex', borderRadius: 5, justifyContent: 'space-around' }}>
                  <div className="order-alert" onClick={closeModal2}>닫기</div>
                </view>
              </View>
            </View>
       
      </Modal>
       
      <div className="location-search-div">
        
        <form className="location-search-form" onSubmit={handleSubmit}>
          <input
            className="location-search-input"
            type="text"
            placeholder="🔍 지번, 도로명, 건물명으로 검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
      <div className="address-body">
      <div id="map"></div>
      <div className="address-div">
        
        <div className="address-div-title">주소 상세 정보</div>
        <div className="address-div-street" ><FontAwesomeIcon icon={faMapMarkerAlt} /> {searchValue}</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const inputValue1 = e.target.input1.value;
            const inputValue2 = e.target.input2.value;
            const inputValue3 = e.target.input3.value;

            const AllInput = `${searchValue} ${inputValue1} ${inputValue2}`;

            const requestBody = {
              memberId: memberId,
              address: AllInput,
              addressLatitude: latitude,
              addressLongitude: longitude
            };

            // Check if token exists in local storage
            const token = localStorage.getItem("token");
            if (!token) {
              console.log("로그인이 필요합니다");
              return;
            }

            fetch(`${process.env.REACT_APP_API_ROOT}/api/v1/address/create`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(requestBody)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error("Failed to create address.");
                }
                // 주소 생성이 성공했을 때 추가 처리 로직을 작성하세요.
                return response.json(); // 필요에 따라 응답 데이터를 반환할 수 있습니다.
              })
              .then(data => {
                // 주소 생성 성공 후 처리할 로직을 작성하세요.
                console.log(data);
                navigation.navigate("App", { item: AllInput, headerShown: false });
              })
              .catch(error => {
                console.error(error);
                // 주소 생성 실패 시 처리할 로직을 작성하세요.
                throw new Error("Failed to create address."); // 실패 시 적절한 예외를 던질 수 있습니다.
              });
           
          }}
          className="address-form">

          <div> <input type="text" placeholder="건물명" name="input1"></input></div>
          <div> <input type="text" placeholder="상세주소 (아파트/동/호)" name="input2"></input></div>
          <div> <input type="text" placeholder="길 안내 (예 : 1층에 올리브영이 있는 오피스텔)" name="input3"></input></div>
          <div className="address-form-submit"> <input type="submit" value="설정하기"></input></div>
        </form>
      </div>
      <div onClick={() => navigation.navigate('Currentlocation', { memberId: memberId })} className='location-setting-div'>
            <FontAwesomeIcon icon={faCrosshairs} /> 현재 위치로 설정
          </div>
    </div>
    
    </div>
  );
}
const MylocationStack = createStackNavigator();

function Mylocation() {

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <NavigationContainer independent={true}>
      <MylocationStack.Navigator

      >
        <MylocationStack.Screen
          name="Mylocation"
          component={MylocationScreen}
          options={{ headerShown: false }}
        />
        <MylocationStack.Screen
          name="Currentlocation"
          component={Currentlocation}
          options={{ headerShown: false }}
        />
        <MylocationStack.Screen
          name="SearchLocation"
          component={SearchLocation}
          options={{ headerShown: false }}
        />
        <MylocationStack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
        />
      </MylocationStack.Navigator>
    </NavigationContainer>
  );
}
