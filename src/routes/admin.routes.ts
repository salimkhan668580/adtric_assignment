import { Router } from "express";
import  adminController from "../controllers/admin.controller.js"
import eventController from "../controllers/event.controller.js";
import { authenticateAdmin } from "../middlewares/auth.middleware.js";
import { loginSchema } from "../zod/admin.zod.js";
import { createEventSchema, updateEventSchema } from "../zod/event.zod.js";
import { zodParser } from "../middlewares/zodParser.js";
import { uploadEventImage } from "../middlewares/upload.middleware.js";
import enquiryController from "../controllers/enquiry.controller.js";
import { updateEnquiryStatusSchema } from "../zod/enquiry.zod.js";
import dashboardController from "../controllers/dashboard.controller.js";

const router = Router();

router.post("/login", zodParser(loginSchema), adminController.login);

router.use(authenticateAdmin);

router.get("/dashboard-stats", dashboardController.getDashboardStats);

router.post("/create-events", uploadEventImage("coverImage"), zodParser(createEventSchema), eventController.createEvent);
router.get("/get-events", eventController.getEvents);
router.get("/get-event/:slug", eventController.getPublicEventBySlug);
router.put("/edit-event/:id", uploadEventImage("coverImage"), zodParser(updateEventSchema), eventController.updateEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);

router.get("/get-enquiries", enquiryController.getEnquiries);
router.patch("/update-enquiry-status/:id", zodParser(updateEnquiryStatusSchema), enquiryController.updateEnquiryStatus);
router.delete("/delete-enquiry/:id", enquiryController.deleteEnquiry);

export default router;
