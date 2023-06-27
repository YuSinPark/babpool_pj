import '../css/Store.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import styles from "../css/jscss";
import { Text, TouchableOpacity, View } from 'react-native';
import AWS from 'aws-sdk';

function RestaurantList({ navigation }) {

  const [restaurants, setRestaurants] = useState([]);
  const route = useRoute();
  const { item, latitude, longitude } = route.params;

  const token = localStorage.token;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/category?restaurantCategory=${item}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setRestaurants(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [item]);
  
  return (
    <div className='store-body'>
      <div className='sort'>
        <div onClick={() => {
          if (latitude && longitude) {
            axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/search/distance?searchValue=${item}&memberLatitude=${latitude}&memberLongitude=${longitude}`)
              .then(response => {
                const newRestaurants = response.data.data;
                setRestaurants(newRestaurants);
              })
              .catch(error => {
                console.log(error);
              });

          } else {
            // 사용자의 현재 위치를 가져오는 로직을 추가하고, 현재 위치의 위도와 경도를 latitude와 longitude에 할당합니다.
            navigator.geolocation.getCurrentPosition(position => {
              const currentLatitude = position.coords.latitude;
              const currentLongitude = position.coords.longitude;

              axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/search/distance?searchValue=${item}&memberLatitude=${currentLatitude}&memberLongitude=${currentLongitude}`)
                .then(response => {
                  const newRestaurants = response.data.data;
                  setRestaurants(newRestaurants);
                })
                .catch(error => {
                  console.log(error);
                });
            }, error => {
              console.log(error);
            });
          }

        }}>거리순</div>
        <div onClick={() => {
          axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/search/rating?searchValue=${item}`)
            .then(response => {
              const newRestaurants = response.data.data;
              setRestaurants(newRestaurants);
            })
            .catch(error => {
              console.log(error);
            });
        }}>별점순</div>
        <div onClick={() => {
          axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/search/reply?searchValue=${item}`)
            .then(response => {
              const newRestaurants = response.data.data;
              setRestaurants(newRestaurants);
            })
            .catch(error => {
              console.log(error);
            });
        }}>리뷰순</div>
        <div onClick={() => {
          axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/search/minPrice?searchValue=${item}`)
            .then(response => {
              const newRestaurants = response.data.data;
              setRestaurants(newRestaurants);
            })
            .catch(error => {
              console.log(error);
            });
        }}>최소 주문 금액순</div>
        <div onClick={() => {
          axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/search/deliveryTime?searchValue=${item}`)
            .then(response => {
              const newRestaurants = response.data.data;
              setRestaurants(newRestaurants);
            })
            .catch(error => {
              console.log(error);
            });
        }}>배달 빠른 순</div>
      </div>
      <table>
        <tbody>
          <tr>
            {restaurants.map((restaurant, index) => (
              <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Restaurant', { restaurantId: restaurant.restaurantId })}>
                <Text>
                  <td key={index} className='store-item' >
                    <div className='store-item-div'>
                      <img src={restaurant.restaurantPhoto} alt="" width="60" height="60" />
                      <div className='store-item-text'>
                        <div className='store-item-text2'>
                          <div className='store-item-text-name'>{restaurant.restaurantName}</div>
                          <div className='store-item-text-time'>({restaurant.rdTimeMin}~{restaurant.rdTimeMax}분)</div>
                        </div>
                        <div className='store-item-text2'>
                          <div>별점 {restaurant.restaurantRating}</div>
                          <div>|</div>
                          <div>리뷰 {restaurant.reviewCount}</div>
                          <div>{restaurant.rdAddress}</div>
                        </div>
                        <div className='store-item-text2'>최소 주문 금액 {restaurant.restaurantMinPrice}</div>
                      </div>
                    </div>
                  </td>
                </Text>
              </TouchableOpacity>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
