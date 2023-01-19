import { middlewareContract } from "../../contracts/requestsContracts";

const fs = require('fs');

const namedMiddlewares: {[name: string]: middlewareContract} = {};

async function loadMiddlewares() {
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (file.match(/^index\.[a-z]{2}$/)) continue;
    namedMiddlewares[file.replace(/\.[a-z]{2,3}$/i, '')] = new (await import(`./${file}`)).default();
  }
}

export {
  namedMiddlewares,
  loadMiddlewares
};
