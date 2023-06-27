//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.service;

import ca.babpool.mapper.AddressMapper;
import ca.babpool.model.dto.AddressDto;
import ca.babpool.model.entity.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor

public class AddressServiceImpl implements AddressService {
    private final AddressMapper mapper;

    public int registerAddress(AddressDto addressDto) {
        Address address = Address.toEntity(addressDto);
        return mapper.createAddress(address);
    }

    public List<AddressDto> getAllMemberAddress(String memberId) {
        return mapper.getAllAddress(memberId);
    }

    public List<AddressDto> getMemberAddress(String memberId) {
        return mapper.getAddress(memberId);
    }

    public int updateMemberAddressStatus(AddressDto addressDto) {
        return mapper.updateAddress(Address.toEntity(addressDto));
    }

    public int deleteMemberAddress(Long addressId) {
        return mapper.deleteAddress(addressId);
    }

}
