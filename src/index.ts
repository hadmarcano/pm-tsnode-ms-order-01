import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import BrokerController from "./module/interface/broker/broker.controller";
import OrderApplication from "./module/application/order.application";
import BrokerInfraestructure from "./module/infraestructure/broker.infraestructure";
import { OrderRepository } from "./module/domain/repositories/order.repository";
import { BrokerRepository } from "./module/domain/repositories/broker.repository";
import OrderInfraestructure from "./module/infraestructure/order.infraestructure";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

const orderInfraestructure: OrderRepository = new OrderInfraestructure();
const brokerInfraestructure: BrokerRepository = new BrokerInfraestructure();
const orderApplication: OrderApplication = new OrderApplication(
  orderInfraestructure,
  brokerInfraestructure
);

const brokerController = new BrokerController(orderApplication);

// Alternativa 1 de ejecución
(async () => {
  try {
    // await server.initialize();
    // await database.initialize();
    // await broker.initialize();
    const listPromises = [
      server.initialize(),
      database.initialize(),
      broker.initialize()
    ];
    await Promise.all(listPromises);
    await brokerController.listen();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();

// alternativa 2 de ejecución
// const start = async () => {
//   try {
//     await server.initialize();
//   } catch (error) {
//     console.log(error);
//     process.exit(1); // Proceso de salida: Envía una señal de finalización del servidor por un error.
//   }
// };

// start();
