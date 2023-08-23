import amqp from "amqplib";

// Reception message service for getting infraestucture logic
export default class ReceiveMessageService {
  static async orderConfirmedOrRejected(
    channel: amqp.Channel, // channel
    cb: (message: unknown) => void, // Callback for message process
    exchangeName: string, // exchange name
    exchangeType: string, // exchange type
    routingKey: string // Knowledge key for comunication between the exchange and queue
  ) {
    await channel.assertExchange(exchangeName, exchangeType, { durable: true });

    const assertQueue = await channel.assertQueue("", { exclusive: true });

    channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

    channel.consume(assertQueue.queue, message => cb(message), {
      noAck: false
      // noAck: true => notify by default that process is OK!
      // noAck: false => notify that process is OK when resolve it!
    });
  }
}
