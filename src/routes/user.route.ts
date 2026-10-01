import { Router } from "express";
import eventController from "../controllers/event.controller.js";

const router = Router();

router.get("/get-events", eventController.getPublicEvents);
router.get("/get-event/:slug", eventController.getPublicEventBySlug);

export default router;
