import MapContainer from "../KakaoAPI/MapContainer";
import '../../css/Information.css';

const Informations = ({ restaurantData, reviewCommentCount }) => {
    if (!restaurantData) {
        return null;
    }
    return (
        <>
            <tr>
                <td class="restaurant-item">
                    <div class="restaurant-item-sort">영업정보</div>
                    <br />
                    <div class="restaurant-item-sort2">상호명 : </div>
                    <div class="restaurant-item-info">{restaurantData.restaurantName}</div>
                    <br />
                    <div class="restaurant-item-sort2">운영시간 : </div>
                    <div class="restaurant-item-info">{restaurantData.restaurantCloseDay}　</div>
                    <br />
                    <div class="restaurant-item-sort2">가게 주소 : </div>
                    <div class="restaurant-item-info">{restaurantData.restaurantAddress}</div>
                </td>
            </tr>
            <tr>
                <td class="restaurant-item">
                    <div class="restaurant-item-sort">안내 및 혜택</div>
                    <br />
                    <div class="restaurant-item-info">{restaurantData.restaurantContent}　</div>
                </td>
            </tr>
            <tr>
                <td class="restaurant-item">
                    <div class="restaurant-item-sort">가게 통계</div>
                    <br />
                    <div class="restaurant-item-sort3">최근 주문 수 : </div>
                    <div class="restaurant-item-info2">{restaurantData.orderCount}</div><br />
                    <div class="restaurant-item-sort3">리뷰 :  </div>
                    <div class="restaurant-item-info2">{restaurantData.reviewCount}</div>
                    <div class="restaurant-item-sort3">답글 : </div>
                    <div class="restaurant-item-info2">{reviewCommentCount}</div>
                    <div class="restaurant-item-sort3" style={{ color: "hsla(20, 100%, 60%, 1)", fontWeight: 'bold' }}>찜 ❤ : </div>
                    {restaurantData.restaurantLikeCount != null ? (<div class="restaurant-item-info2">{restaurantData.restaurantLikeCount}</div>)
                        : (<div class="restaurant-item-info2">0</div>)}
                </td>
            </tr>
            <tr>
                <td class="restaurant-item">
                    <div class="restaurant-item-sort">배달팁 안내</div>
                    <br />
                    {restaurantData.rdTip != null ? (<div class="restaurant-item-info">배달
                        <span style={{ color: 'hsla(20, 100%, 65%, 1)', fontWeight: 'bold' }}> Tip </span>
                        {restaurantData.rdTip}원</div>) : (<div class="restaurant-item-info">배달
                            <span style={{ color: 'hsla(20, 100%, 65%, 1)', fontWeight: 'bold' }}> Tip </span>
                            0원</div>)}
                </td>
            </tr>
            <tr>
                <td class="restaurant-item">
                    <div class="restaurant-item-sort">사업자 정보</div>
                    <br />
                    <div class="restaurant-item-sort3">대표자명 : </div>
                    <div class="restaurant-item-info2">{restaurantData.memberName}　</div>
                    <div class="restaurant-item-sort3">상호명 : </div>
                    <div class="restaurant-item-info2">{restaurantData.restaurantName}　</div>
                    <div class="restaurant-item-sort3">사업자주소 : </div>
                    <div class="restaurant-item-info2">{restaurantData.restaurantAddress}　</div>
                    <div class="restaurant-item-sort3">사업자 등록번호 : </div>
                    <div class="restaurant-item-info2">123123-123123　</div>
                </td>
            </tr>
        </>
    );
};

const Information = ({ info, reviewCommentCount }) => {

    return (
        <>
            <MapContainer restaurantAddress={info.restaurantAddress} restaurantName={info.restaurantName} />
            <table id="Information">
                <tbody>
                    <Informations restaurantData={info} reviewCommentCount={reviewCommentCount} />
                </tbody>
            </table>
        </>
    );
}
export default Information;