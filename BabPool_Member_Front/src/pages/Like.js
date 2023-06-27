import '../css/Store.css';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "../css/jscss";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mypage from './Mypage';
import { createTokenHeader } from '../AuthStore/Member-auth-action';

export default function LikeScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);
  const route = useRoute();
  const { item } = route.params;
  const token = localStorage.token;



  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/v1/like/${item}`, {
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
      {restaurants.length > 0 ? (
        <div className='coupon-number'>
          <div>내가 찜한 가게 {restaurants.length}</div>
        </div>
      ) : (
        <div className='coupon-number'>
          <div>내가 찜한 가게가 없습니다.</div>
        </div>
      )}
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

const LikeStack = createStackNavigator();

function Like() {
  return (
    <LikeStack.Navigator>

      <LikeStack.Screen
        name="Like"
        component={LikeScreen}
        options={{ headerShown: true }}
      />
      <LikeStack.Screen
        name="Mypage"
        component={Mypage}
        options={{ headerShown: false }}
      />
    </LikeStack.Navigator>
  );
}
