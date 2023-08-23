import { err, ok } from "neverthrow";
import { Order } from "../domain/order";
import {
  OrderRepository,
  OrderResult
} from "../domain/repositories/order.repository";
import Model from "./models/order.model";
import { IError } from "../../shared/exceptions/error.exception";

export default class OrderInfraestructure implements OrderRepository {
  async save(order: Order): Promise<OrderResult> {
    try {
      await Model.create(order);
      return ok(order);
    } catch (error) {
      let resultErr;

      if (error instanceof Error) {
        resultErr = new IError(error.message);
      } else {
        resultErr = new IError("Unexpected error");
      }

      resultErr.status = 500;
      return err(resultErr);
    }
  }
}
