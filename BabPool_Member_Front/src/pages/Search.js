import '../css/Search.css';
import SearchResult from './SearchResult';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { createTokenHeader } from '../AuthStore/Member-auth-action';
import Restaurant from './Restaurant/restaurant';


export default function SearchScreen({ navigation }) {
  const [recentSearch, setRecentSearch] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const route = useRoute();
  const { latitude, longitude } = route.params;


  const getPopularHandler = () => {
    const URL = `${process.env.REACT_APP_API_ROOT}/api/v1/search/popular`
    return axios.get(URL, { headers: { 'Content-Type': 'application/json' } });

  };
  const postSearchHandler = (searchValue) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/api/v1/search/count`;
    const requestData = { searchValue };
  
    return axios.post(URL, requestData, {
      headers: { 'Content-Type': 'application/json' }
    });
  };
  const createOrUpdateSearch = (searchValue) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/api/v1/search/create`;
    const requestData = {
      searchValue,
      searchUpdate: new Date().toISOString().slice(0, 10) // 현재 날짜를 원하는 형식으로 변환
    };
  
    return axios.post(URL, requestData, {
      headers: { 'Content-Type': 'application/json' }
    })

  };
  
  
  useEffect(() => {
    getPopularHandler()
      .then(response => {
        setRestaurants(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // 최근 검색어를 localStorage에서 불러옵니다.
  useEffect(() => {
    const recentSearchList = JSON.parse(localStorage.getItem("recentSearch"));
    if (recentSearchList) {
      setRecentSearch(recentSearchList);
    }
  }, []);

  // 최근 검색어를 추가합니다.
  const addRecentSearch = (keyword) => {
    const updatedSearchList = [...recentSearch, keyword];
    let uniqueArr = [...new Set(updatedSearchList)];

    setRecentSearch(uniqueArr);
    localStorage.setItem("recentSearch", JSON.stringify(uniqueArr));
  };

  const postSearchCount = async (searchValue) => {
    try {
      const response = await postSearchHandler(searchValue); // await 추가
      console.log(response.data); // 서버로부터 받은 응답 데이터 출력
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="search-body">
      <div className="search-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const searchValue = e.target.search.value;
            createOrUpdateSearch(searchValue);
            addRecentSearch(searchValue);
            postSearchCount(searchValue);
            navigation.navigate("SearchResult", { item: searchValue, latitude, longitude }, { headerShown: false });
          }}
        >
          <input id="menu-search" type="text" placeholder="🔍 한국인은 밥심!" name="search" />
        </form>
      </div>
      <div className="popular-search">
        <div className='popular-search-div'>
          <h3>인기 검색어</h3>
          <h6 className='update-time'>{restaurants[0]?.searchUpdate} 업데이트</h6>
        </div>
        <div className='popular-search-value'>
          <div className="popular-search-left">
            {restaurants.slice(0, 5).map((restaurant, index) => (
              <li className='popular-search-left-div'
                key={index}
                onClick={() => {
                
                  addRecentSearch(restaurant.searchValue);
                  postSearchCount(restaurant.searchValue);
                  navigation.navigate("SearchResult", { item: restaurant.searchValue, latitude, longitude });
                }}
              ><div>{index + 1}</div>
                <div className='popular-search-left-value'>{restaurant.searchValue}</div>

              </li>

            ))}
          </div>
          <div className="popular-search-right">
            {restaurants.slice(5, 10).map((restaurant, index) => (
              <li className='popular-search-right-div'
                key={index}
                onClick={() => {
                  addRecentSearch(restaurant.searchValue);
                  postSearchCount(restaurant.searchValue);
                  navigation.navigate("SearchResult", { item: restaurant.searchValue, latitude, longitude }, { headerShown: false });
                }}
              ><div>{index + 6}</div>
                <div className='popular-search-right-value'>{restaurant.searchValue}</div>

              </li>
            ))}
          </div>
        </div>

      </div>

      <div className="recent-search">
        <div className="recent-search-div">
          <h3>최근 검색어</h3>
          <h5 className='all-delete'
            onClick={() => {
              setRecentSearch([]);
              localStorage.removeItem("recentSearch");
            }}
          >
            전체삭제
          </h5>
        </div>
        <div>
          {recentSearch.map((keyword, index) => (
            <div className='recent-search-item' key={index}>
              <div>
                <FontAwesomeIcon icon={faClock} className="fa-regular" />
              </div>
              <div onClick={() => {

                postSearchCount(keyword);
                navigation.navigate('SearchResult', { item: keyword, latitude, longitude });
              }}>{keyword}</div>
              <div onClick={() => {
                const updatedSearchList = recentSearch.filter((_, i) => i !== index);
                setRecentSearch(updatedSearchList);
                localStorage.setItem('recentSearch', JSON.stringify(updatedSearchList));
              }}>✕</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
const SearchStack = createStackNavigator();

function Search() {
  return (
    <NavigationContainer independent={true}>
      <SearchStack.Navigator>
        <SearchStack.Screen
          options={{ headerShown: false }}
          name="Search"
          component={SearchScreen}
        />
        <SearchStack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{ headerShown: false }}
        />
        <SearchStack.Screen
          name="Restaurant"
          component={Restaurant}
          options={{ headerShown: false }}
        />

      </SearchStack.Navigator>
    </NavigationContainer>
  );
}




