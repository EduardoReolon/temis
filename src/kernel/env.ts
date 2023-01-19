import Helpers from "../app/Helpers";

const fs = require('fs')

const env: {
  [key: string]: string
  PORT: string,
  NODE_ENV: string,
  storage_root: string,
} = {
  PORT: '3000',
  NODE_ENV: 'development',
  storage_root: '',
}

async function loadEnv() {
  try {
    const file = fs.readFileSync(Helpers.appRoot('.env'), 'utf8');
    file.split(/\r\n|\n/).forEach((line: string) => {
      const content = line.replace(/#.*/g, '').trim();

      const pairs = content.split('=');
      if (!pairs[0] || !pairs[1]) return;

      env[pairs[0]] = pairs[1];
    });
  } catch (error) {}

  if (!env.storage_root) env.storage_root = Helpers.appRoot('storage');
}

export {env, loadEnv};
