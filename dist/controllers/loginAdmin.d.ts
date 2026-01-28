import { Request, RequestHandler } from 'express';
import { IAdmin } from '../interface/adminInterface';
export interface AuthRequest extends Request {
    admin?: IAdmin;
}
export declare const loginAdmin: RequestHandler;
//# sourceMappingURL=loginAdmin.d.ts.map