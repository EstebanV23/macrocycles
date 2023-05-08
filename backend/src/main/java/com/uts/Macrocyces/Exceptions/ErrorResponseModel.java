package com.uts.Macrocyces.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

public class ErrorResponseModel {
    private String type;
    private HttpStatus status;
    private String message;
    private int statusCode;

    public ErrorResponseModel(String type, HttpStatus status, String message, int statusCode) {
        this.type = type;
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }public ErrorResponseModel(HttpStatus status, int statusCode, String message) {
        this.status = status;
        this.statusCode = statusCode;
        switch (status) {
            case OK:
                this.type = "success";
                this.message = message != null ? message : "Operation completed successfully";
                break;
            default:
                this.type = "info";
                this.message = message != null ? message : "Operation completed successfully, but there is nothing to return";
                break;
        }
    }
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseModel> handleResourceNotFoundException(ResourceNotFoundException ex) {
        ErrorResponseModel errorResponseModel = new ErrorResponseModel("error", HttpStatus.NOT_FOUND, ex.getMessage(), HttpStatus.NOT_FOUND.value());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponseModel);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseModel> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        ErrorResponseModel errorResponseModel = new ErrorResponseModel("warning", HttpStatus.BAD_REQUEST, ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseModel);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseModel> handleException(Exception ex) {
        ErrorResponseModel errorResponseModel = new ErrorResponseModel("error", HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponseModel);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}
