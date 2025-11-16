import policy from './policy.json';
import { createSandboxRunner } from '../../../../../packages/agent-runtime/src/mcp/sandbox';

export const runTs = createSandboxRunner(policy);

