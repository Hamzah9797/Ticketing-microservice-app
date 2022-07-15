import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  /*
    errors: ValidationError[]
    constructor(errors:ValidationError[]){
        this.errors = errors;
    }
    */
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("invalid request parameters");
    // onl;y because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}

//throw new RequestValidationError(errors);
