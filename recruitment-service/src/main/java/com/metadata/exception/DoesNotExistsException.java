package com.metadata.exception;

import org.springframework.http.HttpStatus;

@org.springframework.web.bind.annotation.ResponseStatus(value=HttpStatus.NOT_FOUND, reason="Not Found")
public class DoesNotExistsException extends Exception
{
	private static final long serialVersionUID = 1L;

public DoesNotExistsException(String message)
  {
    super("Does not exists: " + message);
  }
}
