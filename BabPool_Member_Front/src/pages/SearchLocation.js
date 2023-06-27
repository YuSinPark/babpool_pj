import React, { useEffect, useState } from "react";
import '../css/Location.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Mylocation from "./mylocation";
import App from "../App";


const { kakao } = window;

export default function SearchlocationScreen({ navigation, route }) {
  const { searchValue } = route.params;
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const memberId = route.params.memberId;

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


  return (
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
    </div>
  );
};

const SearchlocationStack = createStackNavigator();

function Searchlocation() {
  return (
    <NavigationContainer>
      <SearchlocationStack.Navigator>

        <SearchlocationStack.Screen
          name="Searchlocation"
          component={SearchlocationScreen}
          options={{ headerShown: true }}
        />
        <SearchlocationStack.Screen
          name="MyLocation"
          component={Mylocation}
          options={{ headerShown: false }}
        />
        <SearchlocationStack.Screen
          name="App"
          component={App}
          options={{ headerShown: false }}
        />
      </SearchlocationStack.Navigator>
    </NavigationContainer>
  );
}