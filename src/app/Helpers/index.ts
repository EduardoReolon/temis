import { env } from "../../kernel/env";

let basedir: string;

export default class Helpers {
  static setBasedir(dir: string) {
    basedir = dir.replace(/(\/|\\)(build|src)$/, '');
  }

  // both without / at the end
  static appRoot(path: string = '') {
    const end = path ? `/${path.replace(/^\/|\/$/g, '')}` : '';
    return `${basedir}${end}`;
  }
  static storageRoot(path: string = '') {
    const end = path ? `/${path.replace(/^\/|\/$/g, '')}` : '';
    if (env.storage_root) return `${env.storage_root}${end}`;
    return Helpers.appRoot(`storage${end}`);
  }
}
