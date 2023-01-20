import Helpers from "./app/Helpers";
import startApp from "./kernel/startApp";
const fs = require('fs');

Helpers.setBasedir(__dirname);

async function start() {
  await startApp({
    filesMiddleware: fs
      .readdirSync(`${__dirname}/app/Middleware`)
      .map((file: string) => ({
        name: file.replace(/\.[a-z]{2,3}$/i, ''),
        path: `${__dirname}/app/Middleware/${file}`
      })),
    async startRoutes() {(await import('./start/routes')).default;}
  });
}
start();
