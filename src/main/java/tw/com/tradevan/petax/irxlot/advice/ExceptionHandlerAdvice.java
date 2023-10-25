package tw.com.tradevan.petax.irxlot.advice;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import tw.com.tradevan.petax.irxlot.constant.enums.ErrorCode;
import tw.com.tradevan.petax.irxlot.constant.exception.IrxLotException;
import tw.com.tradevan.petax.irxlot.vo.response.AllOutResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.MethodNotAllowedException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tw.com.tradevan.petax.irxlot.vo.response.ApiResponse;

@RestControllerAdvice
@Log4j2
public class ExceptionHandlerAdvice extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return methodNotAllowedException(ex , request);
    }

    @ExceptionHandler({MethodNotAllowedException.class})
    private ResponseEntity<Object> methodNotAllowedException(HttpRequestMethodNotSupportedException ex, WebRequest request) {
        String uri = "";
        if (request instanceof ServletWebRequest) {
            uri = ((ServletWebRequest) request).getRequest().getRequestURI();
        }
        AllOutResponse allOutResponse = new AllOutResponse();
        allOutResponse.setResult(ErrorCode.E99.getCode());
        allOutResponse.setMessage("請求方式不正確");
        return ResponseEntity.ok(allOutResponse);
    }


    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return exceptionHandler(ex);
    }


    @ExceptionHandler({AccessDeniedException.class})
    private ResponseEntity exceptionHandler(AccessDeniedException ex){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode("E98");
        apiResponse.setMessage("權限異常");
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(apiResponse);
    }



    @ExceptionHandler({IrxLotException.class})
    private ResponseEntity exceptionHandler(IrxLotException ex){
        log.info("ex:"+ex.getErrCode());
        log.info("ex:"+ex.getMessage());
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ex.getErrCode());
        apiResponse.setMessage(ex.getErrMsg());
        return ResponseEntity.ok(apiResponse);
    }

    @ExceptionHandler({Exception.class})
    private ResponseEntity exceptionHandler(Exception ex){

        log.error("exceptionHandler:",ex);
        if(ex.getClass() == MethodArgumentNotValidException.class){
            ApiResponse apiResponse = new ApiResponse();
            apiResponse.setCode("E97");
            apiResponse.setMessage("錯誤的電文");
            return ResponseEntity.status(HttpStatus.METHOD_FAILURE).body(apiResponse);
        }else{

            ApiResponse apiResponse = new ApiResponse();
            apiResponse.setCode(ErrorCode.E99.getCode());
            apiResponse.setMessage(ex.getMessage());
            return ResponseEntity.ok(apiResponse);

        }

    }

    

    
}



