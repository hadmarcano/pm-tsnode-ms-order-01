import amqp from "amqplib";
import { Bootstrap } from "./bootstrap";

// Al tener una método o propiedad estática esta se puede
// apuntar directamente desde la clase sin intanciar la misma:
// BrokerBootstrap.channel
// en vez de:
// broker = new BrokerBootstrap()
// broker.channel
// #NOTA: Las propiedades/métodos estaticos sólo pueden usar dentro
// contextos "static", en este caso se pueden apuntar con "this".
export default class BrokerBootstrap extends Bootstrap {
  static channel: amqp.Channel;

  initialize(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      const host = process.env.RABBITMQ_HOST || "localhost:5672";

      try {
        const connection = await amqp.connect(`amqp://${host}`);
        BrokerBootstrap.channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
