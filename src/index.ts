import { headerContentTypes } from "./contracts/requestsContracts";
import Helpers from "./app/Helpers";
import { loadMiddlewares } from "./app/Middleware";
import { env, loadEnv } from "./kernel/env";

Helpers.setBasedir(__dirname);

const express = require('express');
const bodyParser = require('body-parser');
const upload = require('./kernel/fileshandler');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/plain' }))

// for parsing multipart/form-data
app.use(upload.any())

async function start(){
  await loadEnv();
  await loadMiddlewares();
  (await import('./start/routes')).default;
  const NewRequest = (await import('./kernel/newrequesthandler')).default;

  app.all('*', async (req: any, res: any) => {
    const contentTypeArray: [headerContentTypes, string | undefined] = (req.headers['content-type'] || '').split('; ');

    await new NewRequest({
      req, res,
      method: req.method,
      contentType: contentTypeArray[0],
      contentTypeParams: contentTypeArray[1] || '',
      path: req.path,
      body: req.body,
      query: req.body,
      files: req.files,
    }).launch();
  })

  app.listen(env.PORT, () => {
    console.log(`Listening on port ${env.PORT}`)
  })
}
start();
