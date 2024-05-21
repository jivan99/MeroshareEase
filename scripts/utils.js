import { black } from "ansis";
import { resolve } from "node:path";

export const rp = (...args) => resolve(import.meta.dirname, "..", ...args);

export const log = ({ name, message }) => {
  console.log(black.bgGreenBright(` ${name} `), message);
};
