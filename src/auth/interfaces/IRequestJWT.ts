import { IJWTPayload } from './IJWTPayload';

export interface IRequestJWT extends Request, IJWTPayload {}
