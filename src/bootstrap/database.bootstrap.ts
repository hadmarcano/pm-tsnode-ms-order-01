import mongoose from "mongoose";
import { Bootstrap } from "./bootstrap";

export default class DatabaseBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const username = process.env.MONGO_USERNAME || "root";
      const password = process.env.MONGO_PASSWORD || "root";
      const database = process.env.MONGO_DATABASE || "test";
      const host = process.env.MONGO_HOST || "localhost";
      const port = process.env.MONGO_PORT || 27017;
      // authSource => Es la base de datos de verificación de conexión.
      // Es la base de datos que verifica la conexion antes de exponer
      // la base de datos especificada.
      const authSource = process.env.MONGO_AUTH_SOURCE || "admin";

      const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;

      const options = {
        maxPoolSize: 10
      };

      const cb = (err: Error | null) => {
        if (err) {
          console.log("Database failed to start");
          return reject(err);
        }
        console.log("Database Started");
        resolve(true);
      };

      mongoose.connect(url, options, cb);
    });
  }
}
