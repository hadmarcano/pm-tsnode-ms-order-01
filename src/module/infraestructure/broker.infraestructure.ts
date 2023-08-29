import { BrokerRepository } from "../domain/repositories/broker.repository";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import ReceiveMessageService from "./services/receive-message.service";
// import { Message } from "amqplib";

export default class BrokerInfraestructure implements BrokerRepository {
  async sent(message: unknown): Promise<unknown> {
    const channel = BrokerBootstrap.channel;
    const queueName = process.env.QUEUE_NAME || "order";
    channel.assertQueue(queueName, { durable: true });

    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async receive(): Promise<unknown> {
    const channel = BrokerBootstrap.channel;
    const exchangeName = process.env.EXCHANGE_NAME || "exchange-orders";
    const exchangeType = process.env.EXCHANGE_TYPE || "fanout";
    const routingKey = process.env.ROUTING_KEY || ""; // If type "fanout" don't have "routingKey".

    return await ReceiveMessageService.orderConfirmedOrRejected(
      channel,
      this.consumerOrderConfirmed.bind(this),
      exchangeName,
      exchangeType,
      routingKey
    );
  }

  consumerOrderConfirmed(message: any) {
    const messageParse = JSON.parse(message.content.toString());
    console.log(messageParse);

    BrokerBootstrap.channel.ack(message); // The massages are confirmed or rejected from the channel.
  }

  //consumerOrderRejected(){}
}
