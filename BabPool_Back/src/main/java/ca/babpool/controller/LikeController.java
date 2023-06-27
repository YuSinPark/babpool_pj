package ca.babpool.controller;

import ca.babpool.model.dto.LikeDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.model.response.SingleResult;
import ca.babpool.service.LikeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/like")
public class LikeController {

    private final LikeService likeService;
    private final ApiResponse apiResponse;


    @Operation(summary = "사용자별 찜 목록 가져오기, memberId로")
    @GetMapping("/{memberId}")
    public ListResult<LikeDto> likeByMember(@PathVariable("memberId") String memberId) {
        return apiResponse.getListResult(likeService.selectLikeForMember(memberId));
    }

    @Operation(summary = "가게 찜")
    @PostMapping("/member/create")
    public SingleResult<Long> createLike(@RequestParam("memberId") String memberId,@RequestParam("restaurantId") Long restaurantId) {
        return apiResponse.getSingleResult(likeService.createLikeForMember(memberId,restaurantId));
    }
    @Operation(summary = "가게 찜 취소")
    @PostMapping("/member/delete")
    public SingleResult<Integer> deleteLike(@RequestBody LikeDto likes) {
        return apiResponse.getSingleResult(likeService.deleteLikeForMember(likes));
    }
}
