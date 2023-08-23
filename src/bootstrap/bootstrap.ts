export abstract class Bootstrap {
  // Design pattern Fachade
  abstract initialize(): Promise<boolean | Error>;
}
