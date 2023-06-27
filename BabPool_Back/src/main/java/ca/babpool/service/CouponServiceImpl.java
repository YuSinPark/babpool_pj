package ca.babpool.service;

import ca.babpool.mapper.CouponMapper;
import ca.babpool.model.dto.CouponDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponMapper mapper;

    @Override
    public List<CouponDto> getAllMemberCoupon(String memberId) {
        return mapper.getAllCoupon(memberId);
    }


    public List<CouponDto> getCanUseCoupon(String memberId, Long restaurantId, Long price) {
            return mapper.getCanUseCoupon(memberId, restaurantId, price);

    }

    @Override
    public int addNewCoupon(CouponDto dto) {
        LocalDate today = LocalDate.now();
        LocalDate couponExpireDate = today.plusDays(Long.parseLong(dto.getCouponExpire()));
        dto.setCouponExpire(String.valueOf(couponExpireDate));
        return mapper.insertCoupon(dto);
    }

}