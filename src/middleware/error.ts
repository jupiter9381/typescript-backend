import winston from "winston";
import { Request, Response } from "express";

export default function error (err: Error, req: Request, res: Response) {
    winston.error(err.message, err);

    res.status(500).send("something failed.");
}