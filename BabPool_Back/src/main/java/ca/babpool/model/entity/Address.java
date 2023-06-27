package ca.babpool.model.entity;


import ca.babpool.model.dto.AddressDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    private Long addressId;
    private String memberId;
    private String address;
    private Double addressLatitude;
    private Double addressLongitude;

    public static Address toEntity(AddressDto dto) {
        return builder().addressId(dto.getAddressId()).memberId(dto.getMemberId()).address(dto.getAddress()).addressLatitude(dto.getAddressLatitude()).addressLongitude(dto.getAddressLongitude()).build();
    }

}
