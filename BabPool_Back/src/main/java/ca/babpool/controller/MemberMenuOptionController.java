package ca.babpool.controller;

import ca.babpool.model.dto.menuoption.MenuOptionDto;
import ca.babpool.model.response.ApiResponse;
import ca.babpool.model.response.ListResult;
import ca.babpool.service.ImgUploadService;
import ca.babpool.service.MenuOptionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/member/menuOption")
public class MemberMenuOptionController {
    private final ImgUploadService imgUploadService;
    private final MenuOptionService menuOptionService;
    private final ApiResponse apiResponse;

    @Operation(summary = "MenuId로 메뉴 정보 가져오기")
    @GetMapping("/options")
    public ListResult<MenuOptionDto> menuDetails(@RequestParam("menuId") Long menuId) {
        return apiResponse.getListResult(menuOptionService.selectMenuOptionByMenuId(menuId));
    }
}
