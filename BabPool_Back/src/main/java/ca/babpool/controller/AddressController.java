//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package ca.babpool.controller;

import ca.babpool.model.dto.AddressDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping({"api/v1/address"})
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final ApiResponse apiResponse;



    @Operation(
            summary = "멤버 주소 등록"
    )
    @PostMapping({"/create"})
    public SingleResult<Integer> registerAddress(@RequestBody AddressDto addressDto) {
        return apiResponse.getSingleResult(addressService.registerAddress(addressDto));
    }

    @Operation(
            summary = "MemberId로 해당 멤버 주소 목록 전체 불러오기"
    )
    @GetMapping({""})
    public ListResult<AddressDto> viewAllAddress(@RequestParam("memberId") String memberId) throws IllegalArgumentException {
        return apiResponse.getListResult(addressService.getAllMemberAddress(memberId));
    }

    @Operation(
            summary = "MemberId로 해당 멤버 선택 주소 불러오기"
    )
    @PostMapping({"/choose"})
    public ListResult<AddressDto> viewAddress(@RequestBody Map<String, String> memberId) throws IllegalArgumentException {
        return apiResponse.getListResult(addressService.getMemberAddress((String)memberId.get("memberId")));
    }

    @Operation(
            summary = "배달 받을 주소 설정"
    )
    @PatchMapping({"/status"})
    public SingleResult<Integer> modifyAddress(@RequestBody AddressDto addressDto) {
        return apiResponse.getSingleResult(addressService.updateMemberAddressStatus(addressDto));
    }

    @Operation(
            summary = "멤버 선택 주소 삭제"
    )
    @DeleteMapping({""})
    public SingleResult<Integer> deleteAddress(@RequestParam("addressId") Long addressId) {
        return apiResponse.getSingleResult(addressService.deleteMemberAddress(addressId));
    }

}
