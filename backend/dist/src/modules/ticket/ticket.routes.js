"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const ticket_controller_1 = require("./ticket.controller");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.protect, ticket_controller_1.TicketController.createTicket);
router.get("/", auth_middleware_1.protect, ticket_controller_1.TicketController.getTickets);
exports.default = router;
