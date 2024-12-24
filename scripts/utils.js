import { black } from "ansis";
import { resolve } from "node:path";
import process from "node:process";

export const rp = (...args) => resolve(import.meta.dirname, "..", ...args);

export const log = ({ name, message }) => {
  console.log(black.bgGreenBright(` ${name} `), message);
};

export const port = Number(process.env.PORT || "") || 3303;
export const isDev = process.env.NODE_ENV !== "production";
export const isFirefox = process.env.EXTENSION === "firefox";
