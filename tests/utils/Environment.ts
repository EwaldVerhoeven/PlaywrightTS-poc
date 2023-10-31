class Environment {
  readonly isLocalEnvironment = () =>
    process.env.BASE_URL !== null &&
    process.env.BASE_URL?.includes("localhost") === true;
}

export default new Environment();
