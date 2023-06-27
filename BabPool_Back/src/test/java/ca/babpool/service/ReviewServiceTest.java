//package ca.babpool.sevice;
//
//import ca.babpool.mapper.MenuMapper;
//import org.junit.jupiter.api.BeforeEach;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//class ReviewServiceTest {
//
//    @Mock
//    private ImgUploadService imgUploadService;
//    @Mock
//    private MenuMapper menuMapper;
//    @InjectMocks
//    private MenuServiceImpl menuService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        menuService = new MenuServiceImpl(menuMapper, imgUploadService);
//    }
//
//}