import { env } from "../../kernel/env";

export default class Helpers {
  // both without / at the end
  static appRoot(path: string = '') {
    const end = path ? `/${path.replace(/^\/|\/$/g, '')}` : '';
    return `${env.baseDir}${end}`;
  }
  static storageRoot(path: string = '') {
    const end = path ? `/${path.replace(/^\/|\/$/g, '')}` : '';
    if (env.storage_root) return `${env.storage_root}${end}`;
    return Helpers.appRoot(`storage${end}`);
  }
}
