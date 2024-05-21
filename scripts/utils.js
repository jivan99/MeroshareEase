import { resolve } from "node:path";

export const r = (...args) => resolve(__dirname, "..", ...args);
