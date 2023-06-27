import React, { useEffect } from "react";
import { useState } from 'react';
import '../css/Location.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { createStackNavigator } from '@react-navigation/stack';
import Mylocation from "./mylocation";
import App from "../App";
import { NavigationContainer } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { Text, TouchableOpacity, View, Modal } from 'react-native';

const { kakao } = window;



export default function CurrentlocationScreen({ navigation, route }) {

  const [markerPosition, setMarkerPosition] = useState(null);
  const [message, setMessage] = useState('');
  const [address, setAddress] = useState("현재 위치를 파악할 수 없습니다.");
  const [isModal, setIsModal] = useState(false);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const memberId = route.params.memberId;

  const handleConfirm = () => {
    setIsModal(false);
    navigation.navigate('Mylocation', { memberId: memberId})

  };

  const handleCancel = () => {
    setIsModal(false);
  };
  useEffect(() => {
    // 사용자의 현재 위치 정보를 가져와 마커를 그려줍니다
    if (navigator.geolocation) {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Latitude: ' + latitude);
          console.log('Longitude: ' + longitude);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.error("사용자가 위치 정보 공유를 거부했습니다.");
            // 사용자에게 위치 정보 요청을 허용해달라는 메시지를 표시하거나 대안 기능을 제공할 수 있습니다.
          } else {
            console.error("위치 정보를 가져오는데 실패했습니다:", error.message);
          }
        }
      );
    } else {
      console.error("Geolocation이 지원되지 않는 브라우저입니다.");
    }
  }, []);

  function searchAddress(latitude, longitude) {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(longitude, latitude, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    });
  }

  // 클릭 이벤트 처리 함수
  function handleClickMap(mouseEvent) {
    const lat = mouseEvent.latLng.getLat();
    const lng = mouseEvent.latLng.getLng();
    setLat(lat);
    setLng(lng);
    setMarkerPosition(mouseEvent.latLng);
    const newMessage = `클릭한 위치의 위도는 ${lat}이고, 경도는 ${lng}입니다`;
    setMessage(newMessage);
    searchAddress(lat, lng);
  }
  const mapOption = {
    center: markerPosition || new kakao.maps.LatLng(33.450701, 126.570667), // 기본 위치 설정
    level: 1
  };
  const mapRef = React.useRef(null);

  
  React.useEffect(() => {
    // markerPosition이 업데이트될 때마다 지도와 마커를 업데이트합니다
    if (!markerPosition) {
      return;
    }
    mapRef.current = new kakao.maps.Map(document.getElementById('map'), mapOption);
    const marker = new kakao.maps.Marker({ position: markerPosition });
    marker.setMap(mapRef.current);
    kakao.maps.event.addListener(mapRef.current, 'click', handleClickMap);

    return () => {
      kakao.maps.event.removeListener(mapRef.current, 'click', handleClickMap);
    };
  }, [markerPosition]);

  return (
    <div className="address-body">
      <div id="map" />
      <div className="address-div">
        <div className="address-div-title">주소 상세 정보</div>
        <div className="address-div-street" id="clickLatlng"> <FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</div>
        {/* <div className="addressLatlng">{lat} {lng}</div> */}
        <form onSubmit={(e) => {
          e.preventDefault();

          const inputValue1 = e.target.input1.value;
          const inputValue2 = e.target.input2.value;
          const inputValue3 = e.target.input3.value;

          const AllInput = `${address} ${inputValue1} ${inputValue2}`;
          if(address !== '현재 위치를 파악할 수 없습니다.'){
            const requestBody = {
              memberId: memberId,
              address: AllInput,
              addressLatitude: lat,
              addressLongitude: lng
  
            };
  
            const token = localStorage.getItem("token");
            if (!token) {
              console.log("로그인이 필요합니다");
              return;
            }
  
            fetch(`${process.env.REACT_APP_API_ROOT}/api/v1/address/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Add token to the request headers
              },
              body: JSON.stringify(requestBody)
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error("Failed to create address.");
                }
                // HTTP response code가 2xx일 경우, "Address created successfully" 등의 메시지를 출력하거나 다음 동작을 수행합니다.
              })
              .catch(error => {
                console.error(error);
              });
  
  
            navigation.navigate("App", { item: AllInput, headerShown: false });
  
            console.log(AllInput);

          }else{
            setIsModal(true)
          }
          
        }} className=" address-form">
          <div> <input type="text" placeholder="건물명" name="input1"></input></div>
          <div> <input type="text" placeholder="상세주소 (아파트/동/호)" name="input2"></input></div>
          <div> <input type="text" placeholder="길 안내 (예 : 1층에 올리브영이 있는 오피스텔)" name="input3"></input></div>
          <div className="address-form-submit"> <input type="submit" value="설정하기"></input></div>
        </form>
      </div>
      <Modal visible={isModal} animationType="fade" transparent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
            <Text style={{ textAlign: 'center', paddingBottom: 15 }}>현재 사용할 수 없는 서비스 환경입니다<br></br>주소 검색 서비스를 이용해주세요.</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleConfirm}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>뒤로가기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </div>
  );
}


const CurrentlocationStack = createStackNavigator();

function Currentlocation() {
  return (
    <NavigationContainer>
      <CurrentlocationStack.Navigator>

        <CurrentlocationStack.Screen
          name="Currentlocation"
          component={CurrentlocationScreen}
          options={{ headerShown: true }}
        />
        <CurrentlocationStack.Screen
          name="MyLocation"
          component={Mylocation}
          options={{ headerShown: false }}
        />
        <CurrentlocationStack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
        />
      </CurrentlocationStack.Navigator>
    </NavigationContainer>
  );
}