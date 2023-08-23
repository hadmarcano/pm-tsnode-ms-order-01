import { Result } from "neverthrow";
import { Order } from "../order";
import { IError } from "../../../shared/exceptions/error.exception";

export type OrderResult = Result<Order, IError>;
// Design Pattern: Fachade
// SOLID principle: Dependency Inversion
// Allow persist the consistation of architecture hexagonal principles
export interface OrderRepository {
  save(order: Order): Promise<OrderResult>;
}
