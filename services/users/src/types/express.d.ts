import { PublicUser } from '../auth/types/user.types';

declare global {
  namespace Express {
    export interface Request {
      user?: PublicUser;
    }
  }
}
