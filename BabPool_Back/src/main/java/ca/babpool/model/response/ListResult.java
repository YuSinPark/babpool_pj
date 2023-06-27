package ca.babpool.model.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Setter
public class ListResult<T> extends CommonResult {
    private List<T> data;
}
