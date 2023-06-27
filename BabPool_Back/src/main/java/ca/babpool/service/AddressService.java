//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.service;

import ca.babpool.model.dto.AddressDto;

import java.util.List;

public interface AddressService {
    int registerAddress(AddressDto addressDto);

    List<AddressDto> getAllMemberAddress(String memberId);

    List<AddressDto> getMemberAddress(String memberId);

    int updateMemberAddressStatus(AddressDto addressDto);

    int deleteMemberAddress(Long AddressId);
}
