import { useContext, useRef, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthContext from "../AuthStore/Member-auth-context";
import '../../src/css/find.css'
import '../../src/css/Review.css'
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { Text, TouchableOpacity, View, Modal } from 'react-native';


export default function WriteReviewScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

    const route = useRoute();
    const {index} = route.params;
    const authCtx = useContext(AuthContext);
    const [selectedOrderId, setSelectedOrderId] = useState(null);  
    const [responseData, setResponseData] = useState(null);
    const { restaurantId, restaurantName,date, orderId } = route.params;
    const [rating, setRating] = useState(1); // 초기 별점은 0으로 설정
    const [selectedFile, setSelectedFile] = useState();
    const memberIdInputRef = useRef(null);
    const token = localStorage.token;
    const memberId = authCtx.userObj.memberId;
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_ROOT}/api/v1/member/orderlist/detail?memberId=${memberId}&ordersId=${orderId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            const responseData = response.data;
            setResponseData(responseData); 
          })
          .catch(error => {
            console.log(error);
          });
      }, [token, orderId]);
      
    const increaseRating = () => {
      if (rating < 5) {
        setRating(prevRating => prevRating + 0.5); // 현재 별점에서 0.5 증가
      }
    };
  
    const decreaseRating = () => {
      if (rating > 1) {
        setRating(prevRating => prevRating - 0.5); // 현재 별점에서 0.5 감소
      }
    };


  const handleConfirm = () => {
    setIsModalOpen(false);
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
    
      if (!file) {
        setSelectedFile('');
        return;
      }
    
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }
    
      setSelectedFile(file);
    };
    
    const submitHandler = async (event) => {
      event.preventDefault();
    
      const menuName = responseData?.data[0]?.menuName || '';
      if (!memberIdInputRef.current.value) {
        setIsModalOpen(true)
        return;
      }
    
      let requestData = {
        reviewMenu: menuName,
        memberId: authCtx.userObj.memberId,
        reviewRating: rating,
        reviewContent: memberIdInputRef.current.value,
        reviewCreateDate: new Date().toISOString().slice(0, 10),
        restaurantId: restaurantId,
        ordersId: orderId
      };
    
      if (selectedFile) {
        const reviewPhoto = await convertFileToBase64(selectedFile);
        requestData.reviewPhoto = reviewPhoto;
      }
    
      const URL = `${process.env.REACT_APP_API_ROOT}/api/v1/review/myreview/create`;
    
      setIsLoading(true);

      try {
        const response = await axios.post(URL, requestData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
    
        console.log(response.data);
       
      } catch (error) {
        console.error(error);
      }
    
      setIsLoading(false);
      navigation.navigate('OrderList',{refresh: true});
    }
    
    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    
    
    return (
        <section className='write-review-body'>
            <form onSubmit={submitHandler}>
                <div className='write-review-title'>
                    <div>생생한 리뷰를 작성해주세요!</div>
                    <div>리뷰 작성 시 밥풀 포인트가 적립됩니다.</div>
                </div>
                <div className="write-review-name">{restaurantName}</div>
                <div className="write-review-date">{date}</div>
                {responseData && responseData.data && responseData.data.length > 0 && (
                    <div className="write-review-date">{responseData.data[0].menuName} 외 {responseData.data.length-1}</div>
                )}

                <div className="write-review-text">
                <textarea
                    placeholder="예) 밥맛이 최고였습니다!"
                    type="text"
                    id="memberId"
                    required
                    ref={memberIdInputRef}
                    style={{ width: "100%", height: "200px", resize: 'none', opacity:'0.7', fontSize:'calc(8px + 2vmin)'  }}
                />

                <div style={{color:'black', opacity:'0.4', padding:'5%', fontSize:'calc(5px + 2vmin)'}}>(최소 별점 1점)</div>
                <div className="write-review-rating">
                    <div className='review-item-rating'>
                        {rating === 1 && <FontAwesomeIcon icon={faStar} />}
                        {rating === 1.5 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                        </>
                        )}
                        {rating  === 2 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </>
                        )}
                        {rating  === 2.5 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                        </>
                        )}
                        {rating === 3 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </>
                        )}
                        {rating  === 3.5 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                        </>
                        )}
                        {rating  === 4 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </>
                        )}
                        {rating  === 4.5 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                        </>
                        )}
                        {rating  === 5 && (
                        <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </>
                        )}
                    </div>
                    <div className="write-review-rating-btn">
                        <div onClick={decreaseRating}>-</div>
                        <div onClick={increaseRating}>+</div>
                    </div>
                   
                <div>
                    <input type="file" onChange={handleFileChange} />
                </div>
               </div>
                    <div className='write-review-btn'>
                        <button type='submit' onClick={submitHandler}>리뷰 작성하기</button>
                    </div>        
                </div>
            </form>
            <Modal visible={isModalOpen} animationType="fade" transparent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
            <Text style={{ textAlign: 'center', paddingBottom: 15 }}>리뷰를 남겨주세요!</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleCancel}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>확인</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        </section>
    )
}

