import { Request, Response, NextFunction } from "express";
import { IAdmin } from "../interface/adminInterface";
export interface AuthRequest extends Request {
    admin?: IAdmin;
}
export declare const auth: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map