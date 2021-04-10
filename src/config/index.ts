import dev from './dev.json';

export enum Env {
  Dev = 'DEV'
}

export default (env: Env) => {
  switch (env) {
    case Env.Dev:
    default:
      return dev;
  }
};
