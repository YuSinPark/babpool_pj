import React, { useState } from "react";
import axios from 'axios';
import ParentContainerWrapper from "../components/Main/ParentContainerWrapper";
import PopupPostCode from "../components/Util/PopupPostCode";
import { Button } from "react-bootstrap";
import "../css/OwnerLogin.css";

const RegisterRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    memberId: '',
    restaurantCategory: '',
    restaurantName: '',
    restaurantAddress: '',
    restaurantPhone: '',
    restaurantMinPrice: '',
    restaurantPhoto: '',
    restaurantDetailAddress: '',
    restaurantLicenseNumber: '',
    restaurantRdTip: ''
  });
  const [popup, setPopup] = useState(false);
  const token = localStorage.getItem("token")
  const [file, setFile] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (token === null) {
      return;
    }
    axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/restaurant/register`, restaurant, {
      headers: { Authorization: `Bearer ${token}` }
    })    
      .then(response => {
        console.log(response.data);
        alert("등록완료")
        window.location.href ="/";
      })
      .catch(error => alert(error.response.data.msg));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRestaurant(prevState => ({ ...prevState, [name]: value }));
  };

  const setAddress = (address) => {
    setRestaurant({
      ...restaurant,
      restaurantAddress: address,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const imgIncode = reader.result
      const img = imgIncode.split(',')[1]
      setRestaurant({ ...restaurant, restaurantPhoto: img})
    }
    console.log(selectedFile);
    if (!selectedFile) {
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    setFile(selectedFile);
  }; 

  return (
    <ParentContainerWrapper>
      <section className='signup-form'>
        <form onSubmit={handleSubmit} action=''>
            <h1>입점 신청</h1>
            <div className='sign-area'>
                <input type='text' name='restaurantName' value={restaurant.restaurantName} onChange={handleInputChange} required/>
                <label htmlFor='restaurantName'>가게명</label>
            </div>
            <div className='sign-area'>
                <input type="text" name="restaurantAddress" value={restaurant.restaurantAddress} onChange={handleInputChange} className="form-control" readOnly required />
                {!restaurant.restaurantAddress && <label htmlFor='restaurantAddress' className="hidden-label">가게 주소지</label>}
            </div>
            <div className="d-flex justify-content-end">
              <br/>
              <Button onClick={() => {
                setPopup(!popup)
              }}
              > 🔍 주소 검색 </Button>
              {popup &&
                <PopupPostCode setAddress={setAddress} setPopup={setPopup} ></PopupPostCode>
              }
            </div>
            <div className='sign-area'>
                <input type="text" name="restaurantDetailAddress" value={restaurant.restaurantDetailAddress} onChange={handleInputChange} className="form-control" required/>
                <label htmlFor='restaurantDetailAddress'>가게 상세주소</label>
            </div>
            <div className='sign-area'>
                <input type="text" name="restaurantPhone" value={restaurant.restaurantPhone} onChange={handleInputChange} className="form-control" required/>
                <label htmlFor='restaurantPhone'>가게 전화번호</label>
            </div>
            <div className='sign-area'>
                <input type="text" name="restaurantMinPrice" value={restaurant.restaurantMinPrice} onChange={handleInputChange} className="form-control" required/>
                <label htmlFor='restaurantMinPrice'>가게 최소금액</label>
            </div>
            <div className='sign-area'>
                <input type="text" name="restaurantRdTip" value={restaurant.restaurantRdTip} onChange={handleInputChange} className="form-control" required/>
                <label htmlFor='restaurantMinPrice'>가게 배달팁</label>
            </div>
            <div className='sign-area'>
                <input type="text" name="restaurantLicenseNumber" value={restaurant.restaurantLicenseNumber} onChange={handleInputChange} className="form-control" required/>
                <label htmlFor='restaurantLicenseNumber'>가게 등록번호</label>
            </div>
            <div >
                <label htmlFor='restaurantCategory'>가게 카테고리</label>
                <select type="text" name="restaurantCategory" value={restaurant.restaurantCategory} onChange={handleInputChange} className="form-control" readOnly required >
                  <option value="">선택하세요</option>
                  <option value="1인분">1인분</option>
                  <option value="찜탕찌개">찜/탕/찌개</option>
                  <option value="족발보쌈">족발/보쌈</option>
                  <option value="돈까스일식">돈까스/일식</option>
                  <option value="피자">피자</option>
                  <option value="야식">야식</option>
                  <option value="양식">양식</option>
                  <option value="고기구이">고기/구이</option>
                  <option value="치킨">치킨</option>
                  <option value="중식">중식</option>
                  <option value="도시락">도시락</option>
                  <option value="백반죽국수">백반/죽/국수</option>
                  <option value="분식">분식</option>
                  <option value="아시안">아시안</option>
                  <option value="패스트푸드">패스트푸드</option>
                  <option value="반찬">반찬</option>
                  <option value="채식샐러드">채식/샐러드</option>
                  <option value="편의점">편의점</option>
                  <option value="맛집랭킹">맛집랭킹</option>
                </select>
            </div>
            <div >
                <label htmlFor='restaurantPhoto'>가게 대표사진</label>
                <input type="file" name="restaurantPhoto" onChange={handleImageChange} className="form-control" required />
            </div>
            <div className='btn-area'>
                <button type='submit'>등록하기</button>
            </div>
        </form>
      </section>
    </ParentContainerWrapper>
  )
}

export default RegisterRestaurant;