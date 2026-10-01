import { Router } from "express";
import  adminController from "../controllers/admin.controller.js"
import eventController from "../controllers/event.controller.js";
import { authenticateAdmin } from "../middlewares/auth.middleware.js";
import { loginSchema } from "../zod/admin.zod.js";
import { createEventSchema, updateEventSchema } from "../zod/event.zod.js";
import { zodParser } from "../middlewares/zodParser.js";
import { uploadEventImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/login", zodParser(loginSchema), adminController.login);

router.use(authenticateAdmin);

router.post("/create-events", uploadEventImage("coverImage"), zodParser(createEventSchema), eventController.createEvent);
router.get("/get-events", eventController.getEvents);
router.get("/get-event/:slug", eventController.getPublicEventBySlug);
router.put("/edit-event/:id", uploadEventImage("coverImage"), zodParser(updateEventSchema), eventController.updateEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);

export default router;
