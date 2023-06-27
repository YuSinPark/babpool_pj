package ca.babpool.service;

import ca.babpool.handler.BusinessExceptionHandler;
import ca.babpool.handler.ErrorCode;
import ca.babpool.mapper.*;
import ca.babpool.model.dto.MemberResponseDto;
import ca.babpool.model.dto.naversms.MessageDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsDto;
import ca.babpool.model.dto.orderdetails.OrderDetailsResponseDto;
import ca.babpool.model.dto.orders.OrderMenuResponseDto;
import ca.babpool.model.dto.orders.OrderMenuSubDto;
import ca.babpool.model.dto.orders.OrderStatusDto;
import ca.babpool.model.dto.restaurant.*;
import ca.babpool.model.dto.restaurantdelivery.RestaurantDeliveryRegisterDto;
import ca.babpool.model.entity.Restaurant;
import ca.babpool.utils.GeocodeUtil;
import ca.babpool.utils.RestaurantDeliveryUtil;
import ca.babpool.utils.SecurityUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantMapper mapper;
    private final OrderDetailsMapper orderDetailsMapper;
    private final OrderMenuMapper orderMenuMapper;
    private final OrderMenuSubMapper orderMenuSubMapper;
    private final GeocodeUtil geocodeUtil;
    private final ImgUploadService imgUploadService;
    private final SmsService smsService;
    private final MemberMapper memberMapper;

    private final RestaurantDeliveryMapper restaurantDeliveryMapper;

    @Override
    @Transactional
    public int registerRestaurant(RestaurantRegisterRequestDto restaurantDto) throws IOException {
        restaurantDto.setMemberId(SecurityUtil.getCurrentMemberId());
        Double longitude;
        Double latitude;
        String restaurantRdTip = restaurantDto.getRestaurantRdTip();
        RestaurantDeliveryUtil util = new RestaurantDeliveryUtil();

        String address = restaurantDto.getRestaurantAddress();
        Map<String, Double> coordinate = geocodeUtil.getCoordinate(address);

        longitude = coordinate.get("longitude");
        latitude = coordinate.get("latitude");

        restaurantDto.setRestaurantLongitude(longitude);
        restaurantDto.setRestaurantLatitude(latitude);

        restaurantDto.setRestaurantPhoto(imgUploadService.uploadBase64ImageToS3(restaurantDto.getRestaurantPhoto()));

        Restaurant restaurant = Restaurant.toEntity(restaurantDto);
        mapper.createRestaurant(restaurant);
        RestaurantDeliveryRegisterDto restaurantDeliveryRegisterDto = util.createRestaurantDeliveryDto(restaurant.getRestaurantId(), restaurantRdTip);

        return restaurantDeliveryMapper.insertRestaurantDelivery(restaurantDeliveryRegisterDto);

    }

    public RestaurantDto findByRestaurantId(Long restaurantId) {
        return RestaurantDto.toDTO(mapper.selectRestaurantDetail(restaurantId));
    }

    @Override
    public int updateOwnerRestaurant(RestaurantDto restaurantDto) {
        return mapper.updateRestaurant(Restaurant.toEntity(restaurantDto));
    }

    @Override
    public int deleteOwnerRestaurant(Long restaurantId) {
        return mapper.deleteRestaurant(restaurantId);
    }

    @Override
    public List<RestaurantDto> getAllOwnerRestaurant(String memberId) {
        if (mapper.getAllRestaurant(memberId).size() == 0) {
            throw new NullPointerException();
        }
        return mapper.getAllRestaurant(memberId);
    }

    public RestaurantResponseDto InformationsFindByRestaurantId(Long restaurantId,String  memberId) {
        return mapper.selectRestaurantInformationsDetail(restaurantId,memberId);
    }

    public List<RestaurantDto> findByRestaurantCategory(String restaurantCategory) {
        if (mapper.selectRestaurantCategory(restaurantCategory).size() == 0) {
            throw new NullPointerException("일치하는 가게가 없습니다.");
        }
        return mapper.selectRestaurantCategory(restaurantCategory);
    }

    @Override
    public int updateRestaurantStatusByIdList(RestaurantStatusRequestDto dto) {
        return mapper.updateRestaurantStatusByIdList(dto);
    }

    @Override
    @Transactional
    public List<RestaurantNewOrderResponseDto> getOrderDetailsByCurDateAndNew(Long restaurantId, String status) {
        List<RestaurantNewOrderResponseDto> restaurantNewOrderResponseDtoList = new ArrayList<>();

        List<OrderDetailsResponseDto> orderDetailsResponseDtoList = orderDetailsMapper.getOrderDetailsByCurDateAndNew(restaurantId, status);

        for (OrderDetailsResponseDto orderDetailsResponseDto : orderDetailsResponseDtoList) {
            List<OrderMenuResponseDto> orderMenuDtoList = orderMenuMapper.findOrderMenuByOrdersId(orderDetailsResponseDto.getOrdersId());

            for (OrderMenuResponseDto dto : orderMenuDtoList) {
                List<OrderMenuSubDto> orderMenuSubDtoList = orderMenuSubMapper.findOrderMenuSubByOrderMenuId(dto.getOrderMenuId());
                dto.setOrderMenuSubDtoList(orderMenuSubDtoList);
            }

            RestaurantNewOrderResponseDto restaurantNewOrderResponseDto = new RestaurantNewOrderResponseDto();
            restaurantNewOrderResponseDto.setOrderDetailsResponseDto(orderDetailsResponseDto);
            restaurantNewOrderResponseDto.setOrderMenuResponseDtoList(orderMenuDtoList);
            restaurantNewOrderResponseDtoList.add(restaurantNewOrderResponseDto);
        }
        return restaurantNewOrderResponseDtoList;
    }

    @Override
    @Transactional
    public int updateOrderStatusToCooking(OrderStatusDto orderStatusDto) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        MemberResponseDto memberResponseDto;
        String phone;
        RestaurantDto restaurantDto;
        String restaurantName;
        orderDetailsMapper.updateOrderStatusToCooking(orderStatusDto);

        if (orderStatusDto.getOrderDetailsStatus().equals("cooking")) {
            OrderDetailsDto orderDetailsDto = orderDetailsMapper.findByIdForAll(orderStatusDto.getOrdersId());
            MemberResponseDto memberPointId = memberMapper.findMemberIdByOrdersId(orderDetailsDto.getOrdersId());
            Long memberPoint = memberPointId.getMemberPoint();
            Long usePoint = Long.parseLong(orderDetailsDto.getOrderDetailsPoint());

            long restPoint = memberPoint - usePoint;

            memberMapper.updatePoint(memberPointId.getMemberId(), restPoint);

            memberResponseDto = memberMapper.findMemberPhoneByOrdersId(orderStatusDto.getOrdersId());
            phone = memberResponseDto.getMemberPhone();
            restaurantDto = orderDetailsMapper.findRestaurantNameByOrdersId(orderStatusDto.getOrdersId());
            restaurantName = restaurantDto.getRestaurantName();

            MessageDto messageDto = MessageDto.builder()
                    .to(phone)
                    .content(" " + restaurantName + " 에서 주문을 수락했습니다. \n" +
                            "예상 소요시간은 " + orderStatusDto.getOrderDetailsPT() + "분 입니다")
                    .build();
//            smsService.sendSms(messageDto);
        } else if (orderStatusDto.getOrderDetailsStatus().equals("cancel")) {
            memberResponseDto = memberMapper.findMemberPhoneByOrdersId(orderStatusDto.getOrdersId());
            phone = memberResponseDto.getMemberPhone();
            restaurantDto = orderDetailsMapper.findRestaurantNameByOrdersId(orderStatusDto.getOrdersId());
            restaurantName = restaurantDto.getRestaurantName();

            MessageDto messageDto = MessageDto.builder()
                    .to(phone)
                    .content(restaurantName + " 에서 주문을 취소했습니다.")
                    .build();
//            smsService.sendSms(messageDto);
        }
        return 1;
    }
    @Override
    public int updateRefund(Long ordersId){
        return mapper.updataRefund(ordersId);
    }
}
