import "../../css/Restaurant.css";
import Styles from "../../css/jscss";
import MenuList from "../RestaurantInformation/menu_list.js";
import ReviewList from "../RestaurantInformation/review_list.js";
import Information from "../RestaurantInformation/informations.js";
import RestaurantOrder from "../Restaurant/restaurantOrder.js";
import { View, Text, TouchableOpacity, Linking, Modal } from 'react-native';
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import Context from '../../AuthStore/Member-auth-context';
import bucket from '../../img/bucket.png';
import empty from "../../img/Empty.png";

export default function RestaurantScreen({ route, navigation }) {
    const { restaurantId } = route.params;
    const [tab, setTab] = useState('menu');
    const [informations, setInformations] = useState([]);
    const [commentCount, setCommentCount] = useState([]);
    const [tab2, setTab2] = useState('D');
    const [buttonClicked, setButtonClicked] = useState(false);
    const ctx = useContext(Context);
    const memberId = ctx.userObj.memberId;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem("token");

    const handleConfirm = () => {
        setIsModalOpen(false);
        navigation.navigate('Login');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleMenuClick = () => {
        setTab('menu');
    }
    const handleReviewClick = () => {
        setTab('review');
    }
    const handleInformationClick = () => {
        setTab('information');
    }
    const handleDClick = () => {
        setTab2('D');
        setIsDClicked(true);
        setIsPClicked(false);
    };

    const handlePClick = () => {
        setTab2('P');
        setIsDClicked(false);
        setIsPClicked(true);
    };

    let content;
    let content2;

    const [isDClicked, setIsDClicked] = useState(true);
    const [isPClicked, setIsPClicked] = useState(false);


    switch (tab) {

        case 'menu':
            content = <MenuList restaurantId={restaurantId} navigation={navigation} informations={informations} />;

            break;
        case 'review':
            content = <ReviewList restaurantId={restaurantId} />;
            break;
        case 'information':
            content = <Information info={informations} reviewCommentCount={commentCount} />;
            break;
        default:
            content = null;
    }
    switch (tab2) {

        case 'D':
            content2 = <RestaurantOrder info={informations} btn={tab2} />;
            break;
        case 'P':
            content2 = <RestaurantOrder info={informations} btn={tab2} />;
            break;
        default:
            content2 = null;
    }
    const handleButtonClick1 = () => {
        Linking.openURL(`tel:${informations.restaurantPhone}`);
    };
    const handleButtonClick2 = () => {

        if (token == null) {
            setIsModalOpen(true);
        }
        else {
            if (!informations.likesId) {
                axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/like/member/create?memberId=${memberId}&restaurantId=${restaurantId}`, {
                    memberId: memberId,
                    restaurantId: restaurantId
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                })
                    .then(response3 => {
                        setButtonClicked(!buttonClicked);
                    })
                    .catch(error => {
                        console.error('찜 추가 실패:', error);
                    });
            }
            else {
                axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/like/member/delete`, {
                    memberId: memberId,
                    restaurantId: restaurantId,
                    likesId: informations.likesId
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    body: {
                        memberId: memberId,
                        restaurantId: restaurantId,
                        likesId: informations.likesId
                    }
                })
                    .then(response3 => {
                        setButtonClicked(!buttonClicked);
                    })
                    .catch(error => {
                        console.error('찜 취소 실패:', error);
                    });
            }
        }
    };
    useEffect(() => {
        const fetchinfor = async () => {
            try {
                if (restaurantId === 0) {
                    const row = document.getElementById('Information');
                    return row.style.display = 'none';
                }
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ROOT}/api/v1/member/restaurant/information?restaurantId=${restaurantId}&&memberId=${memberId}`);
                const response2 = await axios.get(
                    `${process.env.REACT_APP_API_ROOT}/api/v1/member/review/comment?restaurantId=${restaurantId}`);
                setInformations(response.data.data);
                setCommentCount(response2.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchinfor();
    }, [buttonClicked, memberId, restaurantId]);
    const handleBucketClick = () => {
        navigation.navigate('Bucket', { memberId: memberId });
    };
    return (
        <>

            <div style={Styles.container}>
                <div className="restaurant-item-photo">
                    {informations.restaurantPhoto != null ? (<img src={informations.restaurantPhoto} alt="" height="250" width="100%" />) : (<img src={empty} alt="" height="250" width="100%" />)}
                </div>
                <div className="restaurant-item-restaurantinfo">
                    <div id="restaurant-item-restaurantname">{informations.restaurantName}</div>
                    <div id="restaurant-item-restaurantrating">
                        {informations.restaurantRating === 1 && <FontAwesomeIcon icon={faStar} />}
                        {informations.restaurantRating === 1.5 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarHalf} />
                            </>
                        )}
                        {informations.restaurantRating === 2 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </>
                        )}
                        {informations.restaurantRating === 2.5 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarHalf} />
                            </>
                        )}
                        {informations.restaurantRating === 3 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </>
                        )}
                        {informations.restaurantRating === 3.5 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarHalf} />
                            </>
                        )}
                        {informations.restaurantRating === 4 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </>
                        )}
                        {informations.restaurantRating === 4.5 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarHalf} />
                            </>
                        )}
                        {informations.restaurantRating === 5 && (
                            <>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </>
                        )}
                    </div>
                    <div id="restaurant-item-restaurantreview">최근리뷰 {informations.reviewCount} | 최근사장님댓글 {commentCount}</div>
                    <button className="restaurant-item-btn" onClick={handleButtonClick1}>전화주문</button>
                    <button className="restaurant-item-btn" onClick={handleButtonClick2} style={{ fontWeight: 'bold' }}>{informations.likesId ? '찜 ♥' : '찜 ♡'}</button>
                </div>
                <div className="order-border">
                    <button
                        onClick={handleDClick}
                        className={`order-btn ${isDClicked ? 'active' : ''}`}
                    >
                        배달 주문
                    </button>
                    <button
                        onClick={handlePClick}
                        className={`order-btn ${isPClicked ? 'active' : ''}`}
                    >
                        포장/방문주문
                    </button>
                    {content2}
                </div>
                <View style={Styles.tabContainer}>
                    <TouchableOpacity onPress={handleMenuClick} >
                        <Text style={[Styles.tab, tab === 'menu' && Styles.activeTab]}>메뉴</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleInformationClick}>
                        <Text style={[Styles.tab, tab === 'information' && Styles.activeTab]}>정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReviewClick}>
                        <Text style={[Styles.tab, tab === 'review' && Styles.activeTab]}>리뷰</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {content}

                </View>
                <button onClick={handleBucketClick} className="shopping-cart-body">
                    <img src={bucket} width={60} />
                </button>

            </div >
            <Modal visible={isModalOpen} animationType="fade" transparent>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                        <Text style={{ textAlign: 'center', paddingBottom: 15 }}>로그인이 필요한 서비스입니다.</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleConfirm}>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>로그인</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#8DC6DA', borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20 }} onPress={handleCancel}>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
