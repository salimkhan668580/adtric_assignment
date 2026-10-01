import { rateLimit } from "express-rate-limit";

export const enquiryRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many enquiries from this IP, please try again after a minute." },
});
