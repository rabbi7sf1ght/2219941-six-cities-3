import {TokenPayLoad} from './src/shared/modules/auth';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayLoad;
  }
}
