package ca.babpool.filter;


import ca.babpool.utils.ReadableRequestBodyWrapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

public class CopyBodyFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            ReadableRequestBodyWrapper wrapper = new ReadableRequestBodyWrapper((HttpServletRequest) request);
            wrapper.setAttribute("requestBody", wrapper.getRequestBody());
            chain.doFilter(wrapper, response);
        } catch (Exception e) {
            chain.doFilter(request, response);
        }
    }
}
