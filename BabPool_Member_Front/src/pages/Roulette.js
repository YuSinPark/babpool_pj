
import '../css/Roulette.css';
import SearchResult from './SearchResult';
import Restaurant from './Restaurant/restaurant';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import SearchResultScreen from './SearchResult';

export default function RouletteScreen({ navigation }) {

  const [restaurants, setRestaurants] = useState([]);
  const [active, setActive] = useState(true);
  const [selected, setSelected] = useState('');
  const [selected2, setSelected2] = useState('');

  const items = [
    ["찜탕찌개", "찜/탕/찌개"],
    ["족발보쌈", "족발/보쌈"],
    ["돈까스일식", "돈까스/일식"],
    ["피자", "피자"],
    ["야식", "야식"],
    ["양식", "양식"],
    ["고기구이", "고기/구이"],
    ["치킨", "치킨"],
    ["중식", "중식"],
    ["도시락", "도시락"],
    ["백반죽국수", "백반/죽/국수"],
    ["분식", "분식"],
    ["카페디저트", "카페/디저트"],
    ["아시안", "아시안"],
    ["패스트푸드", "패스트푸드"],
    ["채식샐러드", "채식/샐러드"],
  ];

  const menuAnimation = useSpring({
    to: { rotate: active ? '0deg' : '360deg' },
    from: { rotate: '0deg' },
    config: { tension: 120, friction: 14 },
  });

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setSelected(items[randomIndex][0]);
    setSelected2(items[randomIndex][1]);
    setActive(false);
    setTimeout(() => setActive(true), 500);
  };

  useEffect(() => {
    if (selected) {
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/category?restaurantCategory=${selected}`)
        .then((response) => {
          setRestaurants(response.data.data);
        })
        .catch((error) => {
          // console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            const moreStore = document.querySelector(".more-store");
            if (moreStore) {
              moreStore.style.display = "block";
            }
          }, 1000);
        });
    } else {
      console.log("빈 데이터");
      setRestaurants([]);
    }
  }, [selected]);

  return (
    <div className='random-body'>
      <div className='random-top-div'>
        <div className='click'>'오늘' Click !</div>
        <div className="today-random-menu" onClick={handleClick}>
          오늘
        </div>
        <animated.div className="today-random-menu-result" style={menuAnimation}>
          <span> {selected2} </span>
        </animated.div>
        <div className="today-random-menu" onClick={handleClick}>
          어때요?
        </div>
      </div>
      <table>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr  onClick={() => navigation.navigate('SearchResult', { item: restaurant.restaurantName, 'latitude': 1231.23, 'longitude': 123.123 })} key={index}>
              <td className="store-item">
                <div className="store-item-div">
                  <img src={restaurant.restaurantPhoto} alt="" width="60" height="60" />
                  <div className="store-item-text">
                    <div className="store-item-text2">
                      <div className="store-item-text-name">{restaurant.restaurantName}</div>
                      <div className="store-item-text-time">({restaurant.rdTimeMin}~{restaurant.rdTimeMax}분)</div>
                    </div>
                    <div className="store-item-text2">
                      <div>별점 {restaurant.restaurantRating}</div>
                      <div>|</div>
                      <div>리뷰 {restaurant.reviewCount}</div>
                    </div>
                    <div className="store-item-text2">{restaurant.restaurantMinPrice} 이상 배달</div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
          <div onClick={() => navigation.navigate('SearchResult', { item: selected, 'latitude': 1231.23, 'longitude': 123.123 })} className='more-store'>더 많은 '{selected2}' 음식점 보러가기 ‣</div>
        </tbody>
      </table>
    </div>
  );
}
