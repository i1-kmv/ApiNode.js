import { Request, Response, NextFunction, Router } from "express";


export interface IControllerRoute {
    path: string;
    func:(req: Request, res: Response, next: NextFunction) => void;
    method2: keyof Pick<Router, "get" | "post" | "put" | "delete" | "patch">;
    method: "get" | "post" | "put" | "delete" | "patch";
}
