import { InternalServerErrorException } from "../../shared/exceptions/internalServer.exception";
import { Order } from "../domain/order";
import { BrokerRepository } from "../domain/repositories/broker.repository";
import { OrderRepository } from "../domain/repositories/order.repository";

// Design Pattern: Dependency Injection
export default class OrderApplication {
  // For only use in the class context
  private orderRepository: OrderRepository;
  private repositoryBroker: BrokerRepository;

  constructor(repository: OrderRepository, repositoryBroker: BrokerRepository) {
    this.orderRepository = repository;
    this.repositoryBroker = repositoryBroker;
  }

  async save(order: Order): Promise<Order> {
    const orderResult = await this.orderRepository.save(order);

    if (orderResult.isErr()) {
      throw new InternalServerErrorException(orderResult.error.message);
    }

    this.repositoryBroker.sent(orderResult.value);

    return orderResult.value;
  }

  async receive() {
    await this.repositoryBroker.receive();
  }
}
