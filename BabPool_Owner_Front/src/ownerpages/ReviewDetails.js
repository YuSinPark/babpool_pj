import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import SideBarElements from "../components/Sidebar/SideBarElements";
import "../css/AnnounceBarWrapper.css";
import styled from "styled-components";
import ParentContainerWrapper from "../components/Main/ParentContainerWrapper";
import AuthContext from "../AuthStore/Owner-auth-context";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CouponModal from "../components/Modal/CouponModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const ControlReviewContainer = styled.div`
  background-color: white;
  margin-top: 4rem;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .content {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: xx-small;
  }
`;

const ControlTextArea = styled.textarea`
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  resize: vertical;
  margin-bottom: 10px;
`;

const ControlReviewCommentContainer = styled.div`
  position: relative;
  background-color: #f7f7f4;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  margin-left: 3rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;

  .content {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }

  &::before {
    position: absolute;
    top: 10px;
    left: -40px;
    content: '';
    width: 0px;
    height: 0px;
    border-top: 15px solid transparent;
    border-right: 40px solid #f7f7f4;
    border-bottom: 15px solid transparent;
    
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: xx-small;
  }
`;



const ReplyDetails = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { restaurantId } = useParams();
  const [ reviewList, setReivewList ] = useState([]);
  const [commentState, setCommentState] = useState({});
  const [ selectedReview, setSelectedReview ] = useState("");
  const authCtx = useContext(AuthContext);
  const accessToken = authCtx.token;
  const token = localStorage.getItem("token")
  const [showModal, setShowModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [ restaurantName, setRestaurantName ] = useState("");


  useEffect(() => {
    if (token === null) {
      return;
    }
    axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/review/owner/${restaurantId}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      setReivewList(response.data.data)
    })
    .catch((error) => {
      alert(error.response.data.msg)
    })
  }, [token]);

  const handleChange = (event, reviewId) => {
    setCommentState({
      ...commentState,
      [reviewId]: event.target.value
    });
  };

  const handleCommentSubmit = (reviewId, memberId) => {


    confirmAlert({
      title: '리뷰 답글',
      message: '리뷰 답글을 남기시겠습니까?',
      buttons: [
        {
          label: '예',
          onClick: () => {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/review/owner/${restaurantId}`, {
              reviewId: reviewId,
              reviewcommentContent: commentState[reviewId],
              memberId: memberId
            }, {
              headers: {Authorization: `Bearer ${token}`}
            })
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => {
            })
          }
        },
        {
          label: '아니오',
        }
      ]
    });
  }

  const handleCommentDelete = (reviewCommentId) => {
    
    confirmAlert({
      title: '답글 삭제',
      message: '답글을 삭제하시겠습니까?',
      buttons: [
        {
          label: '예',
          onClick: () => {
            axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/review/owner/${restaurantId}/${reviewCommentId}`, {
              headers: {Authorization: `Bearer ${token}`}
            })
            .then(response => {
              window.location.reload();
            })
            .catch(error => {
            })
          }
        },
        {
          label: '아니오',
        }
      ]
    });
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
      <div>
        <div className="side-bar">
            <SideBarElements />
        </div>
        <ParentContainerWrapper>
            <div className='Announce-Bar'>
                <div className="AnnounceBarWrapper" style={{ fontWeight: 'bold'}}>리뷰 관리</div>
            </div>
            <div>
              {Array.isArray(reviewList) && reviewList
                .map((review) => (
                  <div key={review.reviewId}>
                  <ControlReviewContainer key={review.reviewId}>
                    <div>
                      <div style={{ fontSize: '30px', display: 'flex'}}>
                        {review.memberNickname}
                        <div style={{ fontSize: '15px', padding: '15px', color: 'lightgray'}}>
                          {review.reviewCreateDate} 작성
                        </div>
                        <div style={{ marginLeft: 'auto'}}>
                        <Button onClick={() => handleOpenModal(review.memberId, review.restaurantName)}>단골 쿠폰</Button>
                        <CouponModal
                          showModal={showModal}
                          handleCloseModal={handleCloseModal}
                          selectedMemberId={review.memberId}
                          restaurantId = {restaurantId}
                          restaurantName = {review.restaurantName}
                        />
                        </div>
                      </div>
                      <div>
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
                      <div style={{ 
                        background: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '15px',
                        display: 'inline-block',
                        padding: '10px',
                        marginTop: '1rem'
                      }}>
                        {review.reviewMenu}
                      </div>
                    </div>
                    <br/>
                    <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      {review.reviewPhoto && (
                        <img src={review.reviewPhoto} alt='' style={{ maxWidth: "800px", maxHeight: "600px", width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                    </div>
                    <div>
                      <p>{review.reviewContent}</p>
                    </div>
                  </ControlReviewContainer>
                    <div className="review-comment" style={{ display: 'flex', padding: '20px'}}>
                      <div style={{ marginTop: '1rem'}}>
                        <img src={process.env.PUBLIC_URL + '/images/owner.jpg'} alt='My Image' style={{maxWidth: '60px'}} />
                      </div>
                      <ControlReviewCommentContainer>
                        <div style={{ justifyContent: 'space-between'}}>
                          {review.reviewCommentContent === null ? (
                            <div>
                              <ControlTextArea
                                type="text"
                                placeholder="사장님 댓글"
                                value={commentState[review.reviewId] || ''}
                                onChange={(event) => handleChange(event, review.reviewId, review.memberId)}
                              />
                              <br/>
                              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Button variant="primary" style={{marginLeft: 'auto'}} onClick={(event) => handleCommentSubmit(review.reviewId, review.memberId)}>등록하기</Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p>{review.reviewCommentContent}</p>
                              <br/>
                              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Button variant="danger" style={{marginLeft: 'auto'}} onClick={() => handleCommentDelete(review.reviewCommentId)}>삭제하기</Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </ControlReviewCommentContainer>
                    </div>
                </div>
                ))
              }
            </div>
        </ParentContainerWrapper>
    </div>
  )
};

export default ReplyDetails;