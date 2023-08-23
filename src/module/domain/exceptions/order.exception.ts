import { DomainExceptionCode } from "../enums/domainExceptions";
import { DomainException } from "./domain.exception";

export class ProductIdRequiredException extends DomainException {
  constructor() {
    super(ProductIdRequiredException.getMessage());

    this.name = DomainExceptionCode.PRODUCT_ID_REQUIRED;
  }

  static getMessage() {
    return " ProductId is required";
  }
}

export class PriceRequiredException extends DomainException {
  constructor() {
    super(PriceRequiredException.getMessage());

    this.name = DomainExceptionCode.PRICE_REQUIRED;
  }

  static getMessage() {
    return "Price is required";
  }
}

export class QuantityRequiredException extends DomainException {
  constructor() {
    super(QuantityRequiredException.getMessage());

    this.name = DomainExceptionCode.QUANTITY_REQUIRED;
  }

  static getMessage() {
    return "Quantity is required";
  }
}

export class PriceInvalidException extends DomainException {
  constructor() {
    super(PriceInvalidException.getMessage());

    this.name = DomainExceptionCode.PRICE_INVALID;
  }

  static getMessage() {
    return "price must be greater than zero";
  }
}

export class QuantityInvalidException extends DomainException {
  constructor() {
    super(QuantityInvalidException.getMessage());

    this.name = DomainExceptionCode.QUANTITY_INVALID;
  }

  static getMessage() {
    return "Quantity must be be greater than zero";
  }
}

export class ProductGuidInvalidException extends DomainException {
  constructor() {
    super(ProductGuidInvalidException.getMessage());

    this.name = DomainExceptionCode.PRODUCT_GUID_INVALID;
  }

  static getMessage() {
    return "Product Guid is invalid";
  }
}
