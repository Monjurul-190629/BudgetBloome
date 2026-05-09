import express from "express";
import { protect } from "../../middlewares/auth.middleware";
import { TicketController } from "./ticket.controller";

const router = express.Router();

router.post("/", protect, TicketController.createTicket);

router.get("/", protect, TicketController.getTickets);

export default router;