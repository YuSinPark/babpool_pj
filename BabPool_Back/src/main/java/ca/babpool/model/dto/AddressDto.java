package ca.babpool.model.dto;

import ca.babpool.model.entity.Address;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
@AllArgsConstructor
public class AddressDto {
    private Long addressId;
    private String memberId;
    private String address;
    private Double addressLatitude;
    private Double addressLongitude;

    public static AddressDto toDTO(Address entity) {

        return builder().addressId(entity.getAddressId()).memberId(entity.getMemberId()).address(entity.getAddress()).addressLatitude(entity.getAddressLatitude()).addressLongitude(entity.getAddressLongitude()).build();
    }

}