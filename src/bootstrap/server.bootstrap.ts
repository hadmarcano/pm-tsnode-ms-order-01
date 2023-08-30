import http from "http";
import app from "../app";
import { Bootstrap } from "./bootstrap";

// Principio SOLID: Liskov Sustitution -> Si se hereda de una clase padre, los metodos de esta deben ser implementados en la clase hija.
export default class ServerBootstrap extends Bootstrap {
  // Principio SOLID: Single Responsability
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const port = process.env.PORT || 4000;
      const server = http.createServer(app);

      server
        .listen(port)
        .on("listening", () => {
          resolve(true);
          console.log(`Server started in port ${port}`);
        })
        .on("error", err => {
          reject(err);
          console.log("Server failed to start");
        });
    });
  }
}
