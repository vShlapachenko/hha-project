package ca.sfu.cmpt373.pluto.fall2021.hha.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TodoShouldNotBeSeenException extends RuntimeException {

    public TodoShouldNotBeSeenException(String message) {
        super(message);
    }

    public TodoShouldNotBeSeenException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
