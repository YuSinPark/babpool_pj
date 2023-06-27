import "../../css/Restaurant.css";
function restaurantOrder({ info, btn }) {
    if (btn === 'D') {
        return (
            <div className="restaurant-item-order-border">
                <div className="restaurant-item-order">최소주문금액</div>
                <div className="restaurant-item-order">{info.restaurantMinPrice}원</div>
                <div className="restaurant-item-order">결제방법</div>
                <div className="restaurant-item-order">바로결제,만나서결제</div>
                <div className="restaurant-item-order">배달시간</div>
                <div className="restaurant-item-order">{info.rdTimeMin}분 ~ {info.rdTimeMax}분</div>
                <div className="restaurant-item-order">배달팁</div>
                <div className="restaurant-item-order">{info.rdTip}원</div>
            </div>

        )
    }
    else {
        return (
            <div className="restaurant-item-order-border">
                <div className="restaurant-item-order">최소주문금액</div>
                <div className="restaurant-item-order">0원</div>
                <div className="restaurant-item-order">결제방법</div>
                <div className="restaurant-item-order">바로결제,만나서결제</div>
                <div className="restaurant-item-order">픽업시간</div>
                <div className="restaurant-item-order">{info.rdPickupTimeMin ?? 0}분 ~ {info.rdPickupTimeMax}분</div>
            </div>
        )
    }
}

export default restaurantOrder;