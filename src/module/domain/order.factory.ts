import { v4 as uuidv4 } from "uuid";
import { err, ok } from "neverthrow";
import { Order } from "./order";
import {
  ProductIdRequiredException,
  PriceRequiredException,
  QuantityRequiredException,
  PriceInvalidException,
  QuantityInvalidException
} from "./exceptions/order.exception";

// Design Pattern: Abstract Factory
export class OrderFactory {
  static create(productId: string, price: number, quantity: number) {
    if (!productId || productId.trim() === "") {
      return err(new ProductIdRequiredException());
    }
    if (!price) {
      return err(new PriceRequiredException());
    }
    if (!quantity) {
      return err(new QuantityRequiredException());
    }

    if (price <= 0) {
      return err(new PriceInvalidException());
      // throw new Error("price must be greater than zero");
    }

    if (quantity <= 0) {
      return err(new QuantityInvalidException());
      // throw new Error("Quantity must be be greater than zero");
    }

    const transactionId = uuidv4();

    const order = new Order(transactionId, productId, price, quantity);
    // return new Order(transactionId, productId, price, quantity);
    return ok(order);
  }
}
