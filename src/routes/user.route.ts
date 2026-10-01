import { Router } from "express";
import eventController from "../controllers/event.controller.js";
import enquiryController from "../controllers/enquiry.controller.js";
import { zodParser } from "../middlewares/zodParser.js";
import { createEnquirySchema } from "../zod/enquiry.zod.js";
import { enquiryRateLimiter } from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.get("/get-events", eventController.getPublicEvents);
router.get("/get-event/:slug", eventController.getPublicEventBySlug);
router.post("/create-enquiry", enquiryRateLimiter, zodParser(createEnquirySchema), enquiryController.createEnquiry);

export default router;
