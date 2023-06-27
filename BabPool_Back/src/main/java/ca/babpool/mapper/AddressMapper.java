package ca.babpool.mapper;

import ca.babpool.model.dto.AddressDto;
import ca.babpool.model.entity.Address;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AddressMapper {
    int createAddress(Address address);

    List<AddressDto> getAllAddress(String memberId);

    int updateAddress(Address address);

    List<AddressDto> getAddress(String memberId);

    int deleteAddress(Long address);
}
