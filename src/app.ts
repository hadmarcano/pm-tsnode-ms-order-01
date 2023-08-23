import express, { Application } from "express";
import routerHealth from "./helpers/health";
import HandlerErrors from "./helpers/errors";
import routerOrder from "./module/interface/http/router";
class App {
  private readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountMiddlewares();
    this.mountHealtCheck();
    this.mountRoutes();
  }

  mountMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  mountHealtCheck() {
    // Design pattern: Chain of responsability
    this.expressApp.use("/", routerHealth);
  }

  mountRoutes(): void {
    this.expressApp.use("/order", routerOrder);
  }

  mountErrors(): void {
    this.expressApp.use(HandlerErrors.notFound);
  }

  get app() {
    return this.expressApp;
  }
}

export default new App().app;
