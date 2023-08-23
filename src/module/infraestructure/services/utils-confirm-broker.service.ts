import amqp from "amqplib";

export default class UtilsConfirmBrokerService {
  static confirmMessage(channel: amqp.Channel, message: amqp.Message) {
    // 1 - Confirmation
    channel.ack(message);
  }
}
