import { NextFunction, Request, Response } from "express";
import OrderApplication from "../../application/order.application";
import { OrderFactory } from "../../domain/order.factory";
import { InternalServerErrorException } from "../../../shared/exceptions/internalServer.exception";

// DTOS

export default class {
  constructor(private readonly application: OrderApplication) {
    // Design Pattern: Links Of Method / Mediator Method
    // With this sentence we create a Injection Context
    this.insert = this.insert.bind(this); // Enable -> 1-Routing
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    const { productId, price, quantity } = req.body;

    const order = OrderFactory.create(productId, price, quantity);
    if (order.isErr()) {
      const errorResponse = new InternalServerErrorException(
        order.error.message
      );
      errorResponse.status = 411;
      return next(errorResponse);
    } else {
      const result = await this.application.save(order.value);
      res.json(result);
    }
  }
}
