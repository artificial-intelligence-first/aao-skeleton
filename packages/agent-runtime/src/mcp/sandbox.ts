export type SandboxPolicy = Record<string, unknown>;

export const createSandboxRunner = (_policy: SandboxPolicy) => {
  // TODO: Implement sandboxed TS runner.
  return async () => undefined;
};
