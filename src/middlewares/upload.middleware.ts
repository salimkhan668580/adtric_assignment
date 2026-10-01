import fs from "fs";
import path from "path";
import multer from "multer";
import type { NextFunction, Request, Response } from "express";

export const EVENT_UPLOAD_DIR = path.join(process.cwd(), "upload", "events");
export const EVENT_UPLOAD_URL = "/upload/events";

fs.mkdirSync(EVENT_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, EVENT_UPLOAD_DIR),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
});

const eventImageUpload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
        }
        cb(null, true);
    },
});

export const uploadEventImage = (field: string) => {
    const handler = eventImageUpload.single(field);
    return (req: Request, res: Response, next: NextFunction) => {
        handler(req, res, (err: unknown) => {
            if (err instanceof multer.MulterError) {
                const message = err.code === "LIMIT_FILE_SIZE"
                    ? "Image must be 5MB or smaller"
                    : `Only JPEG, PNG, WEBP or GIF images are allowed in "${field}"`;
                return res.status(400).json({ message });
            }
            if (err) return next(err);
            next();
        });
    };
};

export const removeEventImage = async (imagePath?: string) => {
    if (!imagePath?.startsWith(EVENT_UPLOAD_URL)) return;
    const filePath = path.join(EVENT_UPLOAD_DIR, path.basename(imagePath));
    await fs.promises.unlink(filePath).catch(() => {});
};
