import { Router, NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import OrderApplication from "../../application/order.application";
import { OrderRepository } from "../../domain/repositories/order.repository";
import { BrokerRepository } from "../../domain/repositories/broker.repository";
import OrderInfraestructure from "../../infraestructure/order.infraestructure";
import BrokerInfraestructure from "../../infraestructure/broker.infraestructure";
import OrderController from "./order.controller";
import { InsertValidator } from "../validators/insert.validator";
import { BadRequestErrorException } from "../../../shared/exceptions/badRequest.exception";

// Instanciation Definitions
const infraestructure: OrderRepository = new OrderInfraestructure();
const brokerInfraestructure: BrokerRepository = new BrokerInfraestructure();
const application = new OrderApplication(
  infraestructure,
  brokerInfraestructure
);
const controller = new OrderController(application);

class OrderRouter {
  readonly expressRouter: Router;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  validator(instance: InsertValidator) {
    return (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      Object.assign(instance, body);
      validate(instance).then(errors => {
        if (errors.length > 0) {
          res.status(400).json({ error: "Bad request", messages: errors });
        } else {
          next();
        }
      });
    };
  }

  mountRoutes() {
    // Design Pattern: Chain Of Responsability

    // 1-Routing: with Design Pattern: Links Of Method / Method Binding
    this.expressRouter.post(
      "/",
      this.validator(new InsertValidator()),
      controller.insert
    );
  }
}

export default new OrderRouter().expressRouter;
