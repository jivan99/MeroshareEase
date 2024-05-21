import { resolve } from "node:path";

export const r = (...args) => resolve(import.meta.dirname, "..", ...args);
