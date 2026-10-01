import { unlink } from "fs/promises";
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const zodParser = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body ?? {});

    if (!result.success) {
      if (req.file) unlink(req.file.path).catch(() => {});
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;
    next();
  };
};
