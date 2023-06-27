import axios from "axios";
import { useEffect, useState } from "react";
import "../../css/Review.css";
import { Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";


export default function ReviewList ({ restaurantId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchreviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ROOT}/api/v1/member/review/all?restaurantId=${restaurantId}`);
        setReviews(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchreviews();
  }, [restaurantId]);

  return (
    <Text>
      <table>
        <tbody>
          <tr>
            {reviews.map((review, index) => (
              <td key={index} className='review-item'>
                <div className='review-item-div'>
                  <div className='review-item-text'>
                    <div className='review-top-nav'>
                      <div className='review-top-nav-store'>
                        <div className='review-item-text-store'>{review.restaurantName}</div>
                      </div>
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
                    <div className='review-item-member'>{review.memberId}</div>
                    {review.reviewPhoto != null ? (<div className='review-item-photo'>
                      <img src={review.reviewPhoto} alt="" width="100" height="100" />
                    </div>) : ("")}

                    <div className='review-item-content'>{review.reviewContent}</div>
                    <div className='review-item-name'>{review.reviewMenu}</div>
                    <div className='review-comment'>
                      {review.reviewCommentContent != null && <div className='review-comment-owner'>사장님댓글</div>}
                      {review.reviewCommentContent != null && <div className='review-comment-content'>{review.reviewCommentContent}</div>}
                    </div>

                  </div>
                </div>

              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Text>
  );
};
