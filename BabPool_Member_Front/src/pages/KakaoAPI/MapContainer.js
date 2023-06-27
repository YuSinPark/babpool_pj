import React, { useEffect } from 'react';
const { kakao } = window;

export default function MapContainer(restaurantAddress, restaurantName) {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&libraries=services,clusterer,drawing&autoload=false&`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            kakao.maps.load(() => {
                const mapContainer = document.getElementById("myMap");
                const mapOption = {
                    center: new kakao.maps.LatLng(37.556476, 126.945339),
                    lever: 30
                };
                const map = new kakao.maps.Map(mapContainer, mapOption);
                const geocoder = new kakao.maps.services.Geocoder();
                const Address = JSON.stringify(restaurantAddress.restaurantAddress);
                geocoder.addressSearch(Address, function (result, status) {
                    // if (navigator.geolocation) {
                    //     navigator.geolocation.getCurrentPosition(function (position) {
                    //         const lat = position.coords.latitude;
                    //         const lon = position.coords.longitude;
                    //         const locPosition = new kakao.maps.LatLng(lat, lon),
                    //             message = `<div style ="padding:5px;">${restaurantName}</div>`;

                    //         displayMarker(locPosition, message);
                    //     });
                    // }
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        const name = JSON.stringify(restaurantAddress.restaurantName);
                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        const restaurantname = name.substring(1, name.length - 1);
                        var infowindow = new kakao.maps.InfoWindow({
                            content: `<div style="width:150px;text-align:center;padding:2px 0;">${restaurantname}</div>`
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                        map.setLevel(1);
                    }
                    else {
                        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                            message = '위치를 못찾겠습니다'

                        displayMarker(locPosition, message);
                    }



                    function displayMarker(locPosition, message) {
                        const marker = new kakao.maps.Marker({
                            map: map,
                            position: locPosition
                        });
                        const iwContent = message,
                            iwRemoveable = true;

                        const infowindow = new kakao.maps.InfoWindow({
                            content: iwContent,
                            removable: iwRemoveable
                        });
                        infowindow.open(map, marker);
                        marker.setMap(map);

                    }
                })
            })


        });
    }, [restaurantAddress, restaurantName])

    return (
        <>
            <div id='myMap' style={{
                width: '97vw',
                height: '40vh',
                margin: '0 auto',
                color: 'black'
            }}></div>
        </>
    );
}