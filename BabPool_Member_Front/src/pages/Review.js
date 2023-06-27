import '../css/Review.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/jscss";
import Mypage from './Mypage';
import Restaurant from './Restaurant/restaurant';
import { createTokenHeader } from '../AuthStore/Member-auth-action';
import { getUserReviewHandler } from '../AuthStore/Member-auth-action';

export default function ReviewScreen({ navigation }) {
  const [reviews, setReviews] = useState([]);
  const route = useRoute();
  const { item } = route.params;
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (token === null) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/v1/review/myreview?memberId=${item}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setReviews(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [token, item]);

  const handleReviewDelete = async (reviewId) => {
    try {
      axios
        .delete(`${process.env.REACT_APP_API_ROOT}/api/v1/review/myreview/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      setReviews(reviews.filter(review => review.reviewId !== reviewId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='review-body'>
      {reviews.length > 0 ? (
        <div className='review-number'>
          <div>내가 쓴 리뷰 {reviews.length}</div>
        </div>
      ) : (
        <div className='review-number'>
          <div>아직 작성한 리뷰가 없습니다.</div>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            {reviews.reverse().map((review, index) => (
              <td key={index} className='review-item'>
                <div className='review-item-div'>
                  <div className='review-item-text'>
                    <div className='review-top-nav'>
                      <div className='review-top-nav-store'>
                        <div className='review-item-text-store'>{review.restaurantName}</div>
                        <div onClick={() => navigation.navigate('Restaurant', { restaurantId: review.restaurantId })}>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                      </div>

                      <div onClick={(event) => {
                        event.stopPropagation(); // 이벤트 전파 방지
                        handleReviewDelete(review.reviewId);
                      }}>x</div>
                    </div>

                    <div className='review-item-rating-date'>
                      <div className='review-item-rating'>
                        {review.reviewRating === 1 && <FontAwesomeIcon icon={faStar} />}
                        {review.reviewRating === 1.5 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                          </>
                        )}
                        {review.reviewRating === 2 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </>
                        )}
                        {review.reviewRating === 2.5 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                          </>
                        )}
                        {review.reviewRating === 3 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </>
                        )}
                        {review.reviewRating === 3.5 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                          </>
                        )}
                        {review.reviewRating === 4 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </>
                        )}
                        {review.reviewRating === 4.5 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalf} />
                          </>
                        )}
                        {review.reviewRating === 5 && (
                          <>
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </>
                        )}
                      </div>
                      <div className='review-item-date'>{review.reviewCreateDate}</div>
                    </div>
                    <div className='review-item-photo'>
                    {review.reviewPhoto && (
                        <img src={review.reviewPhoto} alt='' style={{ width: "30%", height: "30%" }} />
                      )}
                    </div>

                    <div className='review-item-content'>{review.reviewContent}</div>
                    <div className='review-item-name'>{review.reviewMenu}</div>
                    <div className='review-comment'>
                      <div className='review-comment-owner'>{review.reviewCommentContent ? `사장님 댓글 : ${review.reviewCommentContent}` : ''}</div>
          
                    </div>

                  </div>
                </div>

              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const ReviewStack = createStackNavigator();

function Review() {
  return (
    <ReviewStack.Navigator>

      <ReviewStack.Screen
        name="Review"
        component={ReviewScreen}
        options={{ headerShown: true }}
      />
      <ReviewStack.Screen
        name="Mypage"
        component={Mypage}
        options={{ headerShown: false }}
      />
    </ReviewStack.Navigator>
  );
}
